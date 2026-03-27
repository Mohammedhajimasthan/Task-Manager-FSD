import crypto from "crypto";

const algorithm = "aes-256-gcm";
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, "base64");

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipherGCM(algorithm, secretKey);
  cipher.setAAD(Buffer.from("task-app"));

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    content: encrypted,
    tag: authTag.toString("hex")
  };
}

export function decrypt(encryptedData) {
  const decipher = crypto.createDecipherGCM(algorithm, secretKey);
  decipher.setAAD(Buffer.from("task-app"));
  decipher.setAuthTag(Buffer.from(encryptedData.tag, "hex"));

  let decrypted = decipher.update(encryptedData.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}