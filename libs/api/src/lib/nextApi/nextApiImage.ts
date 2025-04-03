import { NextRequest, NextResponse } from 'next/server';
import { deleteImageFromS3, getImageFromS3, uploadImageToS3 } from './../services/awsClientS3';
import { S3Client } from '@aws-sdk/client-s3';
import { Image, ImageToStore, ImageToStoreFile } from '@digital-wolf/types';
import { createImageDoc, get404ImageFromPublic } from './nextApiImageUtils';
import { deserialize, uuidV4 } from '@digital-wolf/fns';
import { ApiServerResponse } from './../services';
import sharp from 'sharp';

export async function nextApiImageGET({
  req,
  s3Client,
  bucketName,
}: {
  req: NextRequest;
  s3Client: S3Client;
  bucketName?: string;
}) {
  try {
    if (!bucketName) throw new Error('BucketName is required');
    const image = req.nextUrl.searchParams.get('image') || '';
    if (!image) {
      return NextResponse.json({ message: 'Image key required', success: false }, { status: 400 });
    }

    const response = await getImageFromS3({ bucketName, s3Client, key: image });

    if (!response.Body) {
      const image404 = get404ImageFromPublic('404.webp');
      return new NextResponse(image404, {
        status: 500,
        headers: {
          'Content-Type': 'image/webp', // Set the MIME type for .webp
          'Content-Length': image404.length.toString(),
        },
      });
    }

    // Create a ReadableStream from the S3 response body
    const stream = response.Body.transformToWebStream();

    // Return the image as a streaming response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': response.ContentType || 'application/octet-stream',
        'Content-Length': response.ContentLength?.toString() || '0',
      },
    });
  } catch (e) {
    const image404 = get404ImageFromPublic('404.webp');
    return new NextResponse(image404, {
      status: 500,
      headers: {
        'Content-Type': 'image/webp', // Set the MIME type for .webp
        'Content-Length': image404.length.toString(),
      },
    });
  }
}

export async function nextApiImagePOST({
  req,
  s3Client,
  bucketName,
}: {
  req: NextRequest;
  s3Client: S3Client;
  bucketName?: string;
}): ApiServerResponse<{ image: Image }> {
  try {
    if (!bucketName) throw new Error('BucketName is required');
    const formData = await req.formData();
    const image = deserialize<{ image: ImageToStore }>(formData).image as ImageToStore;

    if (!image) {
      return NextResponse.json({ message: 'Image file required', success: false }, { status: 400 });
    }
    const imageDoc = await createImageDoc(image, async (img: ImageToStoreFile) => {
      const buffer = Buffer.from(await img.value.arrayBuffer());
      const webpBuffer = await sharp(buffer).webp() .toBuffer();
      const fileName = `image_${uuidV4()}`;
      return uploadImageToS3({ image: img.value, s3Client, bucketName, folder: 'images', buffer: webpBuffer, fileName });
    });

    return NextResponse.json({ success: true, data: { image: imageDoc } });
  } catch (error) {
    return NextResponse.json({ message: 'Error', success: false }, { status: 400 });
  }
}

export async function nextApiImageDELETE({
  req,
  s3Client,
  bucketName,
}: {
  req: NextRequest;
  s3Client: S3Client;
  bucketName?: string;
}) {
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
