import "server-only";

export function getRequiredServerEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getOptionalServerEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}
