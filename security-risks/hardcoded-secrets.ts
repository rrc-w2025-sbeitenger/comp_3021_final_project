export const firebaseConfig = {
  apiKey: "AIzaSyDUMMY-INSECURE-TEST-KEY",
  authDomain: "insecure-demo.firebaseapp.com",
  projectId: "scanner-demo-project",
};

export const jwtSecret = "super-secret-jwt-signing-key";
export const databasePassword = "P@ssw0rd123!";

export function buildConnectionString(): string {
  return `postgres://scanner:${databasePassword}@localhost:5432/demo`;
}
