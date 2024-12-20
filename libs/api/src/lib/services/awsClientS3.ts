import { S3Client, PutObjectCommand, DeleteObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import url from 'url';

export function createS3Client({ region, accessKeyId, secretAccessKey }: CreateS3ClientParams) {
  if (!region || !accessKeyId || !secretAccessKey) throw new Error('AWS Parameters are missing');
  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function uploadImageToS3({ image, fileName, bucketName, folder, s3Client }: UploadImageToS3Params) {
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileNameKey = fileName ? fileName.replaceAll(' ', '_') : image.name.replaceAll(' ', '_');
  const folderAndName = folder ? `${folder}/${fileNameKey}` : `${fileNameKey}`;
  const command: PutObjectCommandInput = { Bucket: bucketName, Key: folderAndName, Body: buffer, ContentType: 'image' };
  const putCommand = new PutObjectCommand(command);
  await s3Client.send(putCommand);
  return getUploadedAssetS3Url(command);
}

export async function deleteImageFromS3({ url, bucketName, s3Client }: { url?: string; bucketName: string; s3Client: S3Client }) {
  if (!url) return;
  const deleteCommand = new DeleteObjectCommand({ Key: getKeyFromS3Url(url), Bucket: bucketName });
  await s3Client.send(deleteCommand);
}

function getKeyFromS3Url(fileUrl: string) {
  const decodedUri = decodeURIComponent(fileUrl);
  const parsedUrl = url.parse(decodedUri);
  return parsedUrl?.pathname?.substring(1);
}

function getUploadedAssetS3Url(command: PutObjectCommandInput) {
  return `https://${command.Bucket}.s3.eu-north-1.amazonaws.com/${command.Key}`;
}

interface UploadImageToS3Params {
  image: File;
  fileName?: string;
  bucketName: string;
  s3Client: S3Client;
  folder?: string;
}

interface CreateS3ClientParams {
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}
