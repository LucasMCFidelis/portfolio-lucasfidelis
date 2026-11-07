import "dotenv/config";

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "../schema";
import {
  experiencesSeed,
  globalContentSeed,
  projectsSeed,
  skillsSeed,
  socialMediasSeed,
} from "./seedData";

// Uso: `npm run db:seed` (depois de `npm run db:push`).
// Apaga TODO o conteúdo das tabelas e insere os dados de `seedData.ts`.
// Por segurança só roda em banco local; para outro host, defina SEED_ALLOW_REMOTE=true.

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL não está definida nas variáveis de ambiente.");
  }

  const { hostname } = new URL(databaseUrl);
  if (!LOCAL_HOSTS.has(hostname) && process.env.SEED_ALLOW_REMOTE !== "true") {
    throw new Error(
      `O seed apaga os dados do banco e o host "${hostname}" não é local. ` +
        "Defina SEED_ALLOW_REMOTE=true se for intencional.",
    );
  }

  return databaseUrl;
}

function idsByTitle<T extends { id: string }>(
  rows: Array<T>,
  getTitle: (row: T) => string,
): Map<string, string> {
  return new Map(rows.map((row) => [getTitle(row), row.id]));
}

function requireId(ids: Map<string, string>, title: string, kind: string) {
  const id = ids.get(title);
  if (!id) throw new Error(`Seed: ${kind} "${title}" não existe em seedData.ts.`);
  return id;
}

async function seed() {
  const pool = new Pool({ connectionString: getDatabaseUrl() });
  const db = drizzle({ client: pool, schema });

  try {
    await db.transaction(async (tx) => {
      await tx.execute(
        sql`truncate table ${schema.experienceSkillsTable}, ${schema.projectSkillsTable}, ${schema.imagesTable}, ${schema.projectRepositoriesTable}, ${schema.experiencesTable}, ${schema.projectsTable}, ${schema.skillsTable}, ${schema.socialMediasTable}, ${schema.globalContentTable} cascade`,
      );

      await tx.insert(schema.globalContentTable).values(globalContentSeed);
      await tx.insert(schema.socialMediasTable).values(socialMediasSeed);

      const skills = await tx
        .insert(schema.skillsTable)
        .values(skillsSeed)
        .returning({ id: schema.skillsTable.id, title: schema.skillsTable.titleSkill });
      const skillIds = idsByTitle(skills, (skill) => skill.title);

      for (const { skills: skillTitles, images, repositories, ...project } of projectsSeed) {
        const [{ id: projectId }] = await tx
          .insert(schema.projectsTable)
          .values(project)
          .returning({ id: schema.projectsTable.id });

        if (images.length > 0) {
          await tx.insert(schema.imagesTable).values(
            images.map((image, index) => ({ ...image, projectId, indexDisplay: index })),
          );
        }
        if (repositories.length > 0) {
          await tx.insert(schema.projectRepositoriesTable).values(
            repositories.map((repository, index) => ({
              ...repository,
              projectId,
              indexDisplay: index,
            })),
          );
        }
        if (skillTitles.length > 0) {
          await tx.insert(schema.projectSkillsTable).values(
            skillTitles.map((title) => ({
              projectId,
              skillId: requireId(skillIds, title, "skill"),
            })),
          );
        }
      }

      for (const { skills: skillTitles, ...experience } of experiencesSeed) {
        const [{ id: experienceId }] = await tx
          .insert(schema.experiencesTable)
          .values(experience)
          .returning({ id: schema.experiencesTable.id });

        if (skillTitles.length > 0) {
          await tx.insert(schema.experienceSkillsTable).values(
            skillTitles.map((title) => ({
              experienceId,
              skillId: requireId(skillIds, title, "skill"),
            })),
          );
        }
      }
    });

    console.log(
      `[seed] OK: ${skillsSeed.length} skills, ${projectsSeed.length} projetos, ` +
        `${experiencesSeed.length} experiências, ${socialMediasSeed.length} redes sociais.`,
    );
  } finally {
    await pool.end();
  }
}

seed().catch((error) => {
  console.error("[seed] Falhou:", error instanceof Error ? error.message : error);
  process.exit(1);
});
