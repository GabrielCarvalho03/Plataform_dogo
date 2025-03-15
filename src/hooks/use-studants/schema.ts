import { z } from "zod";

export const RegisterStudantSchema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  phone: z.string().min(10, "Telefone obrigatorio"),
  nivel: z.enum(["básico", "intermediário", "avançado"]),
});

export type DataRegisterStudantSchema = z.infer<typeof RegisterStudantSchema>;
