import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

import { sendEmail } from "@/actions/sendEmail";

import { FormContact } from "./FormContact";

jest.mock("@/actions/sendEmail", () => ({ sendEmail: jest.fn() }));
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn(), dismiss: jest.fn() },
}));

const mockSendEmail = sendEmail as jest.Mock;

async function fillForm(
  values: Partial<Record<"name" | "email" | "subject" | "message", string>> = {}
) {
  const {
    name = "Maria Silva",
    email = "maria@example.com",
    subject = "Vaga de QA",
    message = "Olá, gostaria de conversar.",
  } = values;

  await userEvent.type(screen.getByLabelText("Nome"), name);
  await userEvent.type(screen.getByLabelText("Email"), email);
  await userEvent.type(screen.getByLabelText("Assunto"), subject);
  await userEvent.type(screen.getByLabelText("Mensagem"), message);
}

const submitButton = () => screen.getByRole("button", { name: /Envia/ });

describe("FormContact", () => {
  afterEach(() => jest.clearAllMocks());

  it("valida os campos obrigatórios e não envia o formulário vazio", async () => {
    render(<FormContact />);

    await userEvent.click(submitButton());

    expect(
      await screen.findByText("O nome deve ter pelo menos 2 caracteres.")
    ).toBeInTheDocument();
    expect(screen.getByText("Digite um email válido.")).toBeInTheDocument();
    expect(
      screen.getByText("O assunto deve ter pelo menos 2 caracteres.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("A mensagem deve ter pelo menos 2 caracteres.")
    ).toBeInTheDocument();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("rejeita um e-mail inválido", async () => {
    render(<FormContact />);

    await fillForm({ email: "email-invalido" });
    await userEvent.click(submitButton());

    expect(
      await screen.findByText("Digite um email válido.")
    ).toBeInTheDocument();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("envia os dados, exibe o toast de sucesso e limpa o formulário", async () => {
    mockSendEmail.mockResolvedValue({
      success: true,
      message: "E-mail enviado com sucesso!",
    });
    render(<FormContact />);

    await fillForm();
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("E-mail enviado com sucesso!")
    );
    expect(mockSendEmail).toHaveBeenCalledWith(
      "Maria Silva",
      "maria@example.com",
      "Vaga de QA",
      "Olá, gostaria de conversar."
    );
    await waitFor(() => expect(screen.getByLabelText("Nome")).toHaveValue(""));
    expect(screen.getByLabelText("Mensagem")).toHaveValue("");
  });

  it("exibe o toast de erro e mantém os dados quando o envio falha", async () => {
    mockSendEmail.mockRejectedValue(new Error("Erro ao enviar e-mail"));
    render(<FormContact />);

    await fillForm();
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Erro ao enviar e-mail")
    );
    expect(toast.success).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Nome")).toHaveValue("Maria Silva");
    expect(submitButton()).toBeEnabled();
  });

  it("desabilita o botão enquanto envia", async () => {
    let resolveSend: (value: unknown) => void = () => {};
    mockSendEmail.mockReturnValue(
      new Promise((resolve) => {
        resolveSend = resolve;
      })
    );
    render(<FormContact />);

    await fillForm();
    await userEvent.click(submitButton());

    expect(await screen.findByText("Enviando...")).toBeDisabled();

    resolveSend({ success: true, message: "ok" });

    expect(await screen.findByText("Enviar")).toBeEnabled();
  });
});
