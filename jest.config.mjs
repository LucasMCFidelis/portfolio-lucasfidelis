import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // e2e/ é o pacote do Playwright (*.spec.ts), que roda separado.
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "<rootDir>/e2e/"],
  modulePathIgnorePatterns: ["<rootDir>/e2e/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/components/ui/**",
    "!src/db/schema.ts",
    "!src/**/*DTO.ts",
    "!src/test/**",
  ],
};

export default createJestConfig(config);
