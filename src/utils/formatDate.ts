export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  });

  const formatted = formatter.format(parsedDate);

  const [monthRaw, , year] = formatted.split(" ");

  const month = monthRaw.replace(".", "");
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${capitalizedMonth} ${year}`;
}
