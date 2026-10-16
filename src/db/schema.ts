import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const typeProject = pgEnum("type_project", [
  "frontend",
  "backend",
  "qa",
  "fullstack",
  "outros",
]);

export const experienceCategoryEnum = pgEnum("experience_category", [
  "academic",
  "professional",
]);

export const experienceTypeEnum = pgEnum("experience_type", [
  // academic
  "degree",
  "bootcamp",

  // professional
  "full-time",
  "part-time",
  "volunteer",
  "contract",
  "freelance",
  "internship",
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
  projectSkills: many(projectSkillsTable),
}));

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [imagesTable.projectId],
    references: [projectsTable.id],
  }),
}));

export const skillsTable = pgTable("skills", {
  id: uuid().primaryKey().defaultRandom(),
  titleSkill: text("title_skill").notNull().unique(),
  typeSkill: typeSkill("type_skill").notNull().default("hard"),
});

export const experiencesTable = pgTable("experiences", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),

  description: text("description").array().notNull(),

  startDate: date("start_date").notNull(),
  endDate: date("end_date"),

  // enums
  category: experienceCategoryEnum("category").notNull(),
  type: experienceTypeEnum("type").notNull(),

  experienceInEvidence: boolean("experience_in_evidence")
    .notNull()
    .default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const experienceSkillsTable = pgTable(
  "experience_skills",
  {
    experienceId: uuid("experience_id")
      .references(() => experiencesTable.id, { onDelete: "cascade" })
      .notNull(),
    skillId: uuid("skill_id")
      .references(() => skillsTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.experienceId, t.skillId] })],
);

export const projectSkillsTable = pgTable(
  "project_skills",
  {
    projectId: uuid("project_id")
      .references(() => projectsTable.id, { onDelete: "cascade" })
      .notNull(),
    skillId: uuid("skill_id")
      .references(() => skillsTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.skillId] })],
);

export const projectSkillsRelations = relations(
  projectSkillsTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [projectSkillsTable.projectId],
      references: [projectsTable.id],
    }),
    skill: one(skillsTable, {
      fields: [projectSkillsTable.skillId],
      references: [skillsTable.id],
    }),
  }),
);

export const experiencesRelations = relations(experiencesTable, ({ many }) => ({
  experienceSkills: many(experienceSkillsTable),
}));

export const skillsRelations = relations(skillsTable, ({ many }) => ({
  experienceSkills: many(experienceSkillsTable),
  projectSkills: many(projectSkillsTable),
}));

export const experienceSkillsRelations = relations(
  experienceSkillsTable,
  ({ one }) => ({
    experience: one(experiencesTable, {
      fields: [experienceSkillsTable.experienceId],
      references: [experiencesTable.id],
    }),
    skill: one(skillsTable, {
      fields: [experienceSkillsTable.skillId],
      references: [skillsTable.id],
    }),
  }),
);
