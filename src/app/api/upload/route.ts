import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: "auto",
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// Delete image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "No public ID provided" },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
