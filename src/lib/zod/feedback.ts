import { z } from "zod";

export const feedbackSchema = z.object({
  comment: z
    .string()
    .max(255, { message: "A mensagem não pode ter mais de 255 caracteres" })
    .optional()
    .default(""),
  rating: z
    .number()
    .int({ message: "O rating deve ser um número inteiro" })
    .min(1, { message: "O rating deve ser pelo menos 1" })
    .max(5, { message: "O rating não pode ser maior que 5" })
    .optional()
    .default(1),
});

export type FeedbackType = z.infer<typeof feedbackSchema>;
