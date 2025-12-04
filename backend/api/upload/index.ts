import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/backend/lib/auth/jwt';
import { uploadFile, getOptimizedUrl, getAutoCropUrl } from '@/backend/lib/utils/cloudinary';

/**
 * Upload file handler
 */
export async function uploadHandler(request: NextRequest) {
  try {
    // 1. Authentication Check
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    try {
      verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // 3. Validate File Type and Determine Folder
    const mimeType = file.type;
    const fileName = file.name.toLowerCase();
    let folder = '';

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const allowedDocTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    ];

    // Check by mime type or extension as fallback
    const isImage = allowedImageTypes.includes(mimeType) || /\.(jpg|jpeg|png|webp)$/.test(fileName);
    const isDoc = allowedDocTypes.includes(mimeType) || /\.(pdf|doc|docx)$/.test(fileName);

    if (isImage) {
      folder = 'gallery';
    } else if (isDoc) {
      folder = 'documents';
    } else {
      return NextResponse.json(
        { success: false, error: 'Unsupported file type. Allowed: jpg, png, webp, pdf, doc, docx' },
        { status: 400 }
      );
    }

    // 4. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload to Cloudinary
    const { url, public_id } = await uploadFile(buffer, folder);

    // Generate optimized versions
    const optimizedUrl = getOptimizedUrl(public_id);
    const autoCropUrl = getAutoCropUrl(public_id);

    return NextResponse.json(
      { 
        success: true, 
        url,
        public_id,
        optimizedUrl,
        autoCropUrl
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
