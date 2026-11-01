/**
 * Erro "limpo" propagado pelas actions quando o banco falha. Não carrega o erro
 * original do driver: ele traz SQL, host/porta e um `AggregateError` como causa
 * (ex.: ECONNREFUSED em IPv4 + IPv6), que não deve vazar para o cliente e que
 * quebra o logger do `next dev` ao ser serializado pela server action.
 */
export class DatabaseQueryError extends Error {
  constructor(label: string) {
    super(`Não foi possível consultar o banco de dados (${label}).`);
    this.name = "DatabaseQueryError";
  }
}

function describeDriverError(error: unknown): string {
  const cause = error instanceof Error ? (error.cause ?? error) : error;

  if (cause instanceof Error) {
    const code = (cause as Error & { code?: string }).code;
    const message =
      cause.message ||
      (cause instanceof AggregateError
        ? cause.errors.map((inner) => String(inner?.message ?? inner)).join("; ")
        : "");
    return [code, message].filter(Boolean).join(" - ") || cause.name;
  }

  return String(cause);
}

/**
 * Contorna um bug do React em dev: ele grava a promise rejeitada pelo driver
 * como informação de debug do render e, ao remontá-la, chama
 * `AggregateError(null)` quando a lista `errors` foi cortada pelo limite de
 * profundidade — o que vira um `uncaughtException` no `next dev`. Como o erro
 * original já foi registrado e será descartado, ele é convertido em `Error`
 * comum antes de o React serializá-lo (isso acontece depois deste catch).
 */
function defuseAggregateErrors(error: unknown, depth = 0) {
  if (!(error instanceof Error) || depth > 5) return;

  if (error instanceof AggregateError) {
    Object.setPrototypeOf(error, Error.prototype);
  }
  defuseAggregateErrors(error.cause, depth + 1);
}

/**
 * Executa uma consulta e, se ela falhar, registra um resumo curto no servidor e
 * lança `DatabaseQueryError`. O erro continua sendo propagado (o React Query
 * trata e a UI cai na versão padrão/aviso), só que sem os detalhes internos.
 */
export async function queryDb<T>(label: string, query: () => Promise<T>) {
  try {
    return await query();
  } catch (error) {
    console.error(`[db] Falha em ${label}: ${describeDriverError(error)}`);
    if (process.env.NODE_ENV !== "production") defuseAggregateErrors(error);
    throw new DatabaseQueryError(label);
  }
}
