import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(fileBuffer: Buffer, folder: string): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(new Error("Cloudinary upload failed"));
        if (!result) return reject(new Error("Cloudinary upload returned no result"));
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export function getOptimizedUrl(public_id: string) {
  return cloudinary.url(public_id, {
    fetch_format: 'auto',
    quality: 'auto'
  });
}

export function getAutoCropUrl(public_id: string) {
  return cloudinary.url(public_id, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });
}
