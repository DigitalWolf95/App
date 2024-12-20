import { NextRequest, NextResponse } from 'next/server';
import { deleteImageFromS3, uploadImageToS3 } from './../services/awsClientS3';
import { S3Client } from '@aws-sdk/client-s3';
import { Image, ImageToStore, ImageToStoreFile } from '@digital-wolf/types';
import { createImageDoc } from './nextApiImageUtils';
import { deserialize } from '@digital-wolf/fns';
import { ApiServerResponse } from './../services';

export async function nextApiImagePOST({
  req,
  s3Client,
  bucketName,
}: {
  req: NextRequest;
  s3Client: S3Client;
  bucketName: string;
}): ApiServerResponse<{ image: Image }> {
  try {
    const formData = await req.formData();
    const image = deserialize<{ image: ImageToStore }>(formData).image as ImageToStore;

    if (!image) {
      return NextResponse.json({ message: 'Image file required', success: false }, { status: 400 });
    }

    const imageDoc = await createImageDoc(image, (img: ImageToStoreFile) => {
      return uploadImageToS3({ image: img.value, s3Client, bucketName, folder: 'images' });
    });

    return NextResponse.json({ success: true, data: { image: imageDoc } });
  } catch (error) {
    return NextResponse.json({ message: 'Error', success: false }, { status: 400 });
  }
}

export async function nextApiImageDELETE({ req, s3Client, bucketName }: { req: NextRequest; s3Client: S3Client; bucketName?: string }) {
  try {
    if (!bucketName) throw new Error('BucketName is required');
    const formData = await req.formData();
    const image: Image | undefined = deserialize<{ image: Image }>(formData)?.image;

    if (!image) {
      return NextResponse.json({ errorMessage: 'Image URL is required', success: false }, { status: 400 });
    }

    if (image.type === 'externalImage') return NextResponse.json({ success: true });

    await deleteImageFromS3({ bucketName, s3Client, url: image.url });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
