export function formatterEmailContent(
  name: string,
  from: string,
  message: string
) {
  return `
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
      <header>
        <h1 style="text-align: center; color: #EA4F0D; font-size: 24px; margin-bottom: 20px;">Email enviado através do Portfólio</h1>
      </header>
      <div style="font-size: 16px; line-height: 1.6; margin: 10px 0;">
        <p style="font-size: 16px; margin: 10px 0;"><strong style="color: #EA4F0D;">Nome:</strong> ${name}</p>
        <p style="font-size: 16px; margin: 10px 0;"><strong style="color: #EA4F0D;">E-mail:</strong> ${from}</p>
        <p style="font-size: 16px; margin: 10px 0;"><strong style="color: #EA4F0D;">Mensagem:</strong></p>
        <p style="font-size: 16px; margin: 10px 0;">${message}</p>
      </div>
      <footer style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
        <p>Lucas Fidelis</p>
      </footer>
    </div>
  `;
}
