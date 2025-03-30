import axios from "axios";

export async function sendEmail(name: string, from: string, subject: string, message: string) {
  try {
    const response = await axios.post(import.meta.env.VITE_MAIL_API_ROUTE, {
      name,
      from, // E-mail da pessoa que preencheu o formulário (será usado no reply-to)
      subject,
      message,
    });

    console.log("E-mail enviado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}
