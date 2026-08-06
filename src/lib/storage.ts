const MAX_IMAGE_BYTES = 1 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// Shared upload for every admin-managed image (logo, points-of-interest
// photos, campaign banners). Server-only: uses the service-role key.
export async function uploadImage(
  bucket: string,
  prefix: string,
  file: File,
): Promise<string> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Image must be a JPEG, PNG, WEBP, or GIF file.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      "Image must be 1MB or smaller — tourists open this on mobile data, so a large file just means they never see it in time.",
    );
  }

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");

  const extension = file.type.split("/")[1] ?? "jpg";
  const path = `${prefix}-${Date.now()}.${extension}`;

  const res = await fetch(`${base}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": file.type,
    },
    body: await file.arrayBuffer(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload image: ${res.status} ${text}`);
  }

  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}
