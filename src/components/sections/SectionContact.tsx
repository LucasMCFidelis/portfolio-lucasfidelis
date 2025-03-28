import { Icon } from "../IconWrapper";
import SectionWrapper from "../SectionWrapper";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function SectionContact() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <SectionWrapper className="md:flex-row md:flex-nowrap md:justify-between">
      <Card className="bg-transparent border-none w-full md:w-3/5">
        <CardHeader className="p-0">
          <CardTitle>
            <h2>Conecte-se a mim</h2>
          </CardTitle>
          <CardDescription>
            Entre em contato comigo pelo e-mail:
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Button variant={"link"} className="lowercase">
            lucasm241301@gmail.com
          </Button>
        </CardContent>
        <CardFooter className="p-0 space-x-3">
          <a
            href="https://www.linkedin.com/in/lucas-fidelis-778705149"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="icon" variant="secondary">
              <Icon name="LinkedIn" />
            </Button>
          </a>
          <a
            href="https://github.com/LucasMCFidelis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="icon" variant="secondary">
              <Icon name="GitHub" />
            </Button>
          </a>
        </CardFooter>
      </Card>
      <div className="flex-1 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>assunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Assunto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </SectionWrapper>
  );
}
