import { MercadoPagoConfig, PreApproval, Preference } from "mercadopago";
import { initMercadoPago } from "@mercadopago/sdk-react";

export const mercadoPago = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN,
  options: {},
});

export const preaApproval = new PreApproval(mercadoPago);

export const preference = new Preference(mercadoPago);

export const mercadoPagoClient = initMercadoPago(
  process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
  { locale: "pt-BR" }
);
