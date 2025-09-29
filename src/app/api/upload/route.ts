import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 },
      );
    }

    const uploadPreset = process.env.NEXT_PUBLIC_PRESET_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      return NextResponse.json(
        { message: 'Cloudinary config missing (upload preset or cloud name)' },
        { status: 500 },
      );
    }

    const cloudinaryForm = new FormData();
    cloudinaryForm.append('file', file);
    cloudinaryForm.append('upload_preset', uploadPreset);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryForm,
      },
    );

    if (!cloudinaryRes.ok) {
      const errData = await cloudinaryRes.json();
      return NextResponse.json(
        { message: 'Cloudinary upload failed', error: errData },
        { status: cloudinaryRes.status },
      );
    }

    const data = await cloudinaryRes.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { message: 'Internal Server Error', error: String(err) },
      { status: 500 },
    );
  }
}
