/**
 * Extracts base64 images from smartclean.md and uploads them to Cloudinary.
 * Outputs a JSON map of { imageN: cloudinaryUrl } to prisma/smartclean-images.json
 *
 * Run: npx tsx prisma/extract-smartclean-images.ts
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config();

import * as fs from "fs";
import * as path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadBase64(
  base64Data: string,
  mimeType: string,
  publicId: string
): Promise<string | null> {
  const dataUri = `data:${mimeType};base64,${base64Data}`;
  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: publicId,
      folder: "smartclean/screenshots",
      overwrite: false,
    });
    return result.secure_url;
  } catch (err: unknown) {
    const e = err as { http_code?: number; message?: string };
    // Already exists – return existing URL
    if (e?.http_code === 409 || (e?.message ?? "").includes("already exists")) {
      return cloudinary.url(`smartclean/screenshots/${publicId}`, {
        secure: true,
      });
    }
    console.error(`  ✗ Failed to upload ${publicId}:`, e?.message ?? err);
    return null;
  }
}

async function main() {
  const mdPath = resolve(process.cwd(), "smartclean.md");
  const outPath = resolve(process.cwd(), "prisma/smartclean-images.json");

  console.log("📖 Reading smartclean.md...");
  const content = fs.readFileSync(mdPath, "utf8");

  // Match lines like: [imageN]: <data:image/png;base64,XXXXXX>
  const regex =
    /\[(image\d+)\]: <data:(image\/(?:png|jpeg|jpg|gif|webp));base64,([A-Za-z0-9+/=\s]+)>/g;

  const entries: Record<string, string> = {};

  // Load existing map if any so we can resume
  if (fs.existsSync(outPath)) {
    const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
    Object.assign(entries, existing);
    console.log(`  ↩  Loaded ${Object.keys(existing).length} existing entries`);
  }

  const matches: { id: string; mime: string; data: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    matches.push({ id: m[1], mime: m[2], data: m[3].replace(/\s/g, "") });
  }

  console.log(`🖼  Found ${matches.length} images in smartclean.md`);

  let uploaded = 0;
  let skipped = 0;

  for (const { id, mime, data } of matches) {
    if (entries[id]) {
      skipped++;
      continue;
    }
    process.stdout.write(`  ↑ Uploading ${id}... `);
    const url = await uploadBase64(data, mime, id);
    if (url) {
      entries[id] = url;
      uploaded++;
      console.log("✓");
    } else {
      console.log("✗ (skipped)");
    }

    // Save progress every 10 uploads
    if (uploaded % 10 === 0) {
      fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));

  console.log(`\n✅ Done! Uploaded: ${uploaded}, Skipped (cached): ${skipped}`);
  console.log(`📄 Image map saved to: ${outPath}`);
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
