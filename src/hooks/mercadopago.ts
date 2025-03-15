"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useMercadoPago = () => {
  const router = useRouter();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
  }, []);

  async function createMercadoPagoCheckout(checkoutData: any) {
    try {
      const response = await axios.post(
        "/api/mercado-pago/subscription",
        checkoutData,
        {
          headers: {
            "x-client-secret": process.env.NEXT_PUBLIC_MP_CLIENT_SECRET!,
          },
        }
      );

      const data = await response.data;

      console.log("data", data);

      window.open(data);
    } catch (err) {
      console.log(err);
    }
  }

  return { createMercadoPagoCheckout };
};
