import nodemailer from "nodemailer";

import { sendEmail } from "./sendEmail";

jest.mock("nodemailer", () => ({
  __esModule: true,
  default: { createTransport: jest.fn() },
}));

const createTransport = nodemailer.createTransport as jest.Mock;

describe("sendEmail", () => {
  const sendMail = jest.fn();

  beforeEach(() => {
    process.env.MAIL_USER = "portfolio@example.com";
    createTransport.mockReturnValue({ sendMail });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    sendMail.mockReset();
  });

  it("envia o e-mail com assunto e replyTo do remetente", async () => {
    sendMail.mockResolvedValue({});

    const result = await sendEmail(
      "Maria",
      "maria@example.com",
      "Vaga de QA",
      "Olá!"
    );

    expect(result).toEqual({
      success: true,
      message: "E-mail enviado com sucesso!",
    });
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "portfolio@example.com",
        subject: "Contato: Vaga de QA",
        replyTo: "maria@example.com",
        html: expect.stringContaining("Olá!"),
      })
    );
  });

  it("lança um erro genérico sem expor o erro do SMTP", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    sendMail.mockRejectedValue(new Error("535 Authentication failed: senha"));

    await expect(
      sendEmail("Maria", "maria@example.com", "Assunto", "Mensagem")
    ).rejects.toThrow(new Error("Erro ao enviar e-mail"));
  });
});
