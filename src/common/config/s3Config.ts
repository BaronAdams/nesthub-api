import { S3Client } from '@aws-sdk/client-s3';

let isProd = process.env.NODE_ENV === "production"

let configParams = isProd ? {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true
} : {
    region: 'afr-cmr-dla3', // Exemple: 'us-east-1'
    endpoint:"http://localhost:9000",
    credentials: {
      accessKeyId: 'P6wyfZEFt7rlV8kwalsC',
      secretAccessKey: '3fiu8xoKwsygWyjFrwilgs9wdWFbGA0AD6advy8m',
    },
    forcePathStyle: true
  }

export const s3Client = new S3Client(configParams);