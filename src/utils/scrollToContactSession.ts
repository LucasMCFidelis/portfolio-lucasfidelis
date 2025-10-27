import { appSections } from "./lists/appSections";

export function scrollToContactSession() {
  document
    .getElementById(appSections.contact.id)
    ?.scrollIntoView({ behavior: "smooth" });
}
