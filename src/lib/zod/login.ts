import { z } from "zod";

export const loginSchema = z
  .object({
    identifier: z
      .string({ message: "Campo obrigatório" })
      .min(1, { message: "E-mail ou RA não pode estar vazio" })
      .refine(
        (value) => {
          return (
            typeof value === "string" &&
            (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
              value.length === 4 ||
              value.length === 5 ||
              (value.length === 6 && /^[0-9]+$/.test(value)))
          );
        },
        { message: "E-mail inválido ou RA deve ter no minimo 4 dígitos" },
      ),

    password: z
      .string({ message: "Campo obrigatório" })
      .min(1, { message: "Senha não pode ser vazia" }),
  })
  .refine(
    (data) => {
      return data.identifier !== null && data.identifier.length > 0;
    },
    {
      message: "E-mail ou RA é obrigatório",
      path: ["identifier"],
    },
  );

export type LoginType = z.infer<typeof loginSchema>;
