import { Hono } from 'hono';
import { requireAuth, AppEnv } from '../auth';
import { Storage } from '../storage';
import { connectToDatabase } from '../config/db';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary';

export const mediaRoutes = new Hono<AppEnv>();

// GET all media items (Admin & Public)
mediaRoutes.get('/', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const mediaItems = await Storage.getMedia();

  const formatted = mediaItems.map((m: any) => ({
    id: (m._id || m.id).toString(),
    _id: (m._id || m.id).toString(),
    fileName: m.fileName,
    url: m.url,
    publicId: m.publicId,
    altText: m.altText || m.fileName,
    width: m.width,
    height: m.height,
    format: m.format,
    fileSize: m.fileSize,
    createdAt: m.createdAt,
  }));

  return c.json({ media: formatted });
});

// POST Upload Media to Cloudinary & store metadata in MongoDB (Protected)
mediaRoutes.post('/upload', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const contentType = c.req.header('content-type') || '';

  let fileName = '';
  let dataUrl = '';
  let altText = '';

  if (contentType.includes('application/json')) {
    const body = await c.req.json();
    fileName = body.fileName || `photo_${Date.now()}.jpg`;
    dataUrl = body.url || body.dataUrl || '';
    altText = body.altText || fileName;
  } else if (contentType.includes('multipart/form-data')) {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    altText = (formData.get('altText') as string) || '';

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: 'File size exceeds maximum allowed limit of 10MB' }, 400);
    }

    // Validate format
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Unsupported file format. Please upload JPEG, PNG, WebP, or SVG' }, 400);
    }

    fileName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    dataUrl = `data:${file.type};base64,${base64}`;
  }

  if (!dataUrl) {
    return c.json({ error: 'Failed to process media payload' }, 400);
  }

  try {
    // 1. Upload to Cloudinary
    const cloudinaryRes = await uploadToCloudinary(dataUrl, 'new_pashupati_suppliers');

    // 2. Store metadata in MongoDB / Storage
    const mediaDoc = await Storage.createMedia({
      fileName,
      url: cloudinaryRes.url,
      publicId: cloudinaryRes.publicId,
      altText: altText || fileName,
      width: cloudinaryRes.width,
      height: cloudinaryRes.height,
      format: cloudinaryRes.format,
      fileSize: cloudinaryRes.bytes,
    });

    return c.json(
      {
        media: {
          id: (mediaDoc._id || mediaDoc.id).toString(),
          _id: (mediaDoc._id || mediaDoc.id).toString(),
          fileName: mediaDoc.fileName,
          url: mediaDoc.url,
          publicId: mediaDoc.publicId,
          altText: mediaDoc.altText,
          width: mediaDoc.width,
          height: mediaDoc.height,
          format: mediaDoc.format,
          fileSize: mediaDoc.fileSize,
        },
        message: 'Image uploaded to Cloudinary and metadata saved to MongoDB successfully',
      },
      201
    );
  } catch (err: any) {
    console.error('Upload handler error:', err);
    return c.json({ error: err.message || 'Failed to upload image' }, 500);
  }
});

// DELETE Media from Cloudinary and MongoDB (Protected)
mediaRoutes.delete('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing media ID' }, 400);

  const mediaDoc = await Storage.findMediaById(id);
  if (!mediaDoc) {
    return c.json({ error: 'Media item not found' }, 404);
  }

  // 1. Delete from Cloudinary
  if (mediaDoc.publicId) {
    await deleteFromCloudinary(mediaDoc.publicId);
  }

  // 2. Delete from MongoDB / Storage
  await Storage.deleteMedia(id);

  return c.json({ message: 'Media item deleted from Cloudinary and database successfully' });
});
