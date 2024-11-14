import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd 'de' MMMM", { locale: ptBR });
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return format(date, "dd MMM yyyy - HH:mm", { locale: ptBR });
}
