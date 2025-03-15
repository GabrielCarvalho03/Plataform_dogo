import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Senha dev ter no minimo 6 caracteres"),
});

export type DataRegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Senha dev ter no minimo 6 caracteres"),
});

export type DataLoginSchema = z.infer<typeof LoginSchema>;
