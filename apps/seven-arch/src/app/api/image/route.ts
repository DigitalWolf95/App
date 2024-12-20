import { NextRequest } from 'next/server';
import { createS3Client } from '@digital-wolf/api/services';
import { nextApiImageDELETE, nextApiImagePOST } from '@digital-wolf/api/nextApi';

const s3Client = createS3Client({region: process.env.AWS_S3_REGION, secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY, accessKeyId: process.env.AWS_S3_ACCESS_KEY})
const bucketName = process.env.AWS_S3_BUCKET_NAME;

export async function POST(req: NextRequest) {
  return await nextApiImagePOST({req, s3Client, bucketName});
}

export async function DELETE(req: NextRequest) {
  return await nextApiImageDELETE({req, s3Client, bucketName});
}
