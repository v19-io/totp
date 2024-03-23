import { decode, encode } from "@v19/base32";
import { hotp, generateKey } from "@v19/hotp";

export async function totp(
  secret: string,
  digits: number = 6
): Promise<string> {
  const time = Math.floor(Date.now() / 1000 / 30);
  const key = await crypto.subtle.importKey(
    "raw",
    decode(secret).buffer,
    {
      name: "HMAC",
      hash: "SHA-1",
    },
    true,
    ["sign"]
  );

  return await hotp(key, time, digits);
}

export async function generateSecret(bits: number = 128): Promise<string> {
  return encode(
    new Uint8Array(
      await crypto.subtle.exportKey("raw", await generateKey(bits))
    )
  );
}

export function generateUri(
  secret: string,
  account: string,
  issuer: string = ""
): string {
  return encodeURI(
    `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}`
  );
}
