import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formata um Date como 'Mês Ano' com o mês capitalizado e sem ponto", () => {
    expect(formatDate(new Date(2024, 0, 15))).toBe("Jan 2024");
    expect(formatDate(new Date(2023, 8, 10))).toBe("Set 2023");
  });

  it("aceita a data como string", () => {
    expect(formatDate("2022-12-15T12:00:00")).toBe("Dez 2022");
  });
});
