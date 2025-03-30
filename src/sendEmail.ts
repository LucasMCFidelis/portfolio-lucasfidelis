import axios from "axios";
import { formaterEmailContent } from "./formaterEmailContent";

export async function sendEmail(name: string, from: string, subject: string, message: string) {
  try {
    const htmlContent = formaterEmailContent(name, from, message); // Gera o HTML formatado

    const response = await axios.post(import.meta.env.VITE_MAIL_API_ROUTE, {
      name,
      from, // E-mail da pessoa que preencheu o formulário (será usado no reply-to)
      subject,
      message,
      htmlContent,
    });

    console.log("E-mail enviado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}
