import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não está definida nas variáveis de ambiente.");
}

export const db = drizzle({
  connection: {
    connectionString: databaseUrl,
    // Sem esses limites, um banco inacessível segura a renderização até o
    // timeout de TCP do sistema. Falhando rápido, a UI cai na versão padrão.
    connectionTimeoutMillis: 5_000,
    query_timeout: 10_000,
  },
  schema,
});
