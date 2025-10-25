// lib/fileUpload.ts
import { apiClient } from "@/lib/apiClient";

export interface FileUploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'logo'); // or 'profile_image', etc.

    // Upload file to your backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/file`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type, let browser set it with boundary for FormData
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      url: result.url || result.file_url,
      filename: result.filename || file.name,
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

// Alternative: Upload to a cloud service like Cloudinary, AWS S3, etc.
export async function uploadToCloudinary(file: File): Promise<FileUploadResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_preset');
    formData.append('folder', 'brand-logos');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      url: result.secure_url,
      filename: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Cloudinary upload failed',
    };
  }
}