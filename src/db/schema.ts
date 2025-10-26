import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const typeProject = pgEnum("type_project", [
  "frontend",
  "backend",
  "qa",
  "outros",
]);

export const socialMediasTable = pgTable("social_medias", {
  id: uuid().primaryKey().defaultRandom(),
  title: text(),
  url: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const imagesTable = pgTable("images", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text(),
  url: text().notNull(),
  projectId: uuid("project_id")
    .references(() => projectsTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectsTable = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text(),
  yearDevelopment: integer("year_development")
    .notNull()
    .default(new Date().getFullYear()),
  typeProject: typeProject("type_project").notNull().default("outros"),
  repositoryUrl: text("repository_url").notNull(),
  deploymentUrl: text("deployment_url"),
  projectInEvidence: boolean().notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectsRelations = relations(projectsTable, ({ many }) => ({
  images: many(imagesTable),
}));

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [imagesTable.projectId],
    references: [projectsTable.id],
  }),
}));
