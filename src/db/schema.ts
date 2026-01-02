import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  integer, pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export const typeProject = pgEnum("type_project", [
  "frontend",
  "backend",
  "qa",
  "fullstack",
  "outros",
]);

export const typeSkill = pgEnum("type_skill", ["hard", "soft"]);

export const globalContentTable = pgTable("global_content", {
  id: uuid().primaryKey().defaultRandom(),
  aboutCurtDescription: text("about_curt_description"),
  aboutLargeDescription: text("about_large_description"),
  fileResumeId: text("file_resume_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const socialMediasTable = pgTable("social_medias", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  url: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const imagesTable = pgTable("images", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  mobileScreen: boolean("mobile_screen").notNull().default(false),
  url: text().notNull(),
  projectId: uuid("project_id")
    .references(() => projectsTable.id, { onDelete: "cascade" })
    .notNull(),
  indexDisplay: integer("index_display"),
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
  documentationUrl: text("documentation_url"),
  visible: boolean().notNull().default(true),
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

export const skillsTable = pgTable("skills", {
  id: uuid().primaryKey().defaultRandom(),
  titleSkill: text("title_skill").notNull(),
  levelSkill: doublePrecision("level_skill").notNull(),
  descriptionSkill: text("description_skill"),
  typeSkill: typeSkill("type_skill").notNull().default("hard"),
});
