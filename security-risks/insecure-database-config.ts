export const productionDatabaseUrl =
  "postgres://admin:AdminPassword123!@database.example.com:5432/ticketing";

export const mongoConnectionString =
  "mongodb://root:RootPassword123!@mongo.example.com:27017/tickets";

export function getDatabaseUrl(): string {
  return productionDatabaseUrl;
}
