"use server";

import nodemailer from "nodemailer";

import { formatterEmailContent } from "@/utils/formatterEmailContent";

export async function sendEmail(
  name: string,
  from: string,
  subject: string,
  message: string
) {
  try {
    const htmlContent = formatterEmailContent(name, from, message);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Contato: ${subject}`,
      replyTo: from,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "E-mail enviado com sucesso!" };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error("Erro ao enviar e-mail");
  }
}
