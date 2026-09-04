import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary with environment variables
export function getCloudinaryClient() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    return cloudinary;
  }

  return null;
}

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export async function uploadToCloudinary(
  fileDataUrlOrBuffer: string,
  folder = 'new_pashupati_suppliers'
): Promise<UploadResult> {
  const client = getCloudinaryClient();

  if (!client) {
    console.warn('⚠️ Cloudinary credentials not configured. Returning local/data URL simulation.');
    // Simulated upload result for development
    return {
      url: fileDataUrlOrBuffer.startsWith('data:')
        ? fileDataUrlOrBuffer
        : fileDataUrlOrBuffer,
      publicId: 'local_' + Date.now().toString(36),
      format: 'jpeg',
      bytes: Math.round((fileDataUrlOrBuffer.length * 3) / 4),
    };
  }

  try {
    const result: UploadApiResponse = await client.uploader.upload(fileDataUrlOrBuffer, {
      folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (err: any) {
    console.error('❌ Cloudinary Upload Error:', err);
    throw new Error(err.message || 'Failed to upload image to Cloudinary');
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (publicId.startsWith('local_')) {
    return true;
  }

  const client = getCloudinaryClient();
  if (!client) {
    return true;
  }

  try {
    const res = await client.uploader.destroy(publicId);
    return res.result === 'ok';
  } catch (err) {
    console.error('❌ Cloudinary Delete Error:', err);
    return false;
  }
}
