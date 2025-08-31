import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/s3Config';


export const processAndUploadPropertiesImages = async (files: Express.Multer.File[]) => {
  const imageUrls: string[] = [];
  const isProd = process.env.NODE_ENV === "production"

  for (const file of files) {
    try {
      // Redimensionner et recadrer l'image avec Sharp
      const processedImage = await sharp(file.buffer)
        .resize(800, 600, { fit: 'cover' }) // Redimensionner à 800x600
        .jpeg({ quality: 80 }) // Convertir en JPEG avec une qualité de 80%
        .toBuffer();

      // Générer un nom de fichier unique basé sur le nom d'origine de l'image
      const originalName = path.parse(file.originalname).name; // Nom de base sans extension
      const uniqueSuffix = uuidv4().substring(0, 8); // Suffixe unique court
      const fileName = `${originalName}-${uniqueSuffix}.jpg`;
      const BucketName = isProd ? process.env.AWS_S3_PROPERTIES_IMAGES_BUCKET_NAME : 'properties-images'

      // Envoyer l'image vers S3
      const uploadResult = await s3Client.send(
        new PutObjectCommand({
          Bucket: BucketName,
          Key: fileName,
          Body: processedImage,
          ContentType: 'image/jpeg',
        })
      );
      // Construire l'URL de l'image
      const imageUrl = isProd ? `https://${BucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}` : `http://127.0.0.1:9001/api/v1/buckets/${BucketName}/objects/download?preview=true&prefix=${fileName}&version_id=null`;

      // Ajouter l'URL de l'image au tableau
      imageUrls.push(imageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process and upload images');
    }
  }

  return imageUrls;
};