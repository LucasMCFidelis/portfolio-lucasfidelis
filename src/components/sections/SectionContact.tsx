import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import { appSections } from "@/utils/lists/appSections";

import { FormContact } from "../FormContact";
import SectionWrapper from "../SectionWrapper";
import { SocialMediasButtons } from "../SocialMediasButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function SectionContact() {
  return (
    <>
      <SectionWrapper
        id={appSections.contact.id}
        className="md:flex-row md:flex-nowrap md:justify-between"
      >
        <Card className="bg-transparent border-none w-full md:w-2/5 lg:w-3/5 px-5">
          <CardHeader className="p-0">
            <CardTitle>
              <h2>Conecte-se a mim</h2>
            </CardTitle>
            <CardDescription>
              Entre em contato comigo pelo e-mail abaixo ou diretamente pelo
              formulário
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <a
              href="mailto:fidelis.lucasm@gmail.com"
              className="text-primary lowercase cursor-pointer underline-offset-3 hover:underline"
            >
              fidelis.lucasm@gmail.com
            </a>
          </CardContent>
          <CardFooter className="p-0 space-x-3">
            <SocialMediasButtons />
          </CardFooter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </Card>
        <div className="flex-1 w-full">
          <FormContact />
        </div>
      </SectionWrapper>
    </>
  );
}
