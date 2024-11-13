import { z } from "zod";
import { validate } from "../../../utils";

const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres")
    .refine((value) => validate.cpf(value), {
      message: "CPF inválido",
    }),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const validations = {
  loginSchema
}
