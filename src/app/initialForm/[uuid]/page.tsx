"use client";

import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useMercadoPago } from "@/hooks/mercadopago";
import { useParams, useRouter } from "next/navigation";
import { UseUserLogin } from "@/hooks/useLogin/user-login";

export default function InitialForm() {
  const router = useRouter();
  const [countAlunos, setCountAlunos] = useState(10);
  const { createMercadoPagoCheckout } = useMercadoPago();
  const { uuid } = useParams();
  const { user, handleGetUserByID } = UseUserLogin();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false); // Quando a aba não está visível
      } else {
        setIsActive(true); // Quando a aba estiver visível
      }
    };

    // Adiciona um event listener para visibilidade
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        if (user?.studentsAmount === 0) {
          handleGetUserByID({ uuid: String(uuid) });
        } else {
          router.push("/dashboard");
        }
      }, 5000);

      return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmontar
    }
  }, [isActive, user?.studentsAmount, uuid, router, handleGetUserByID]);

  const valorPorAluno = 49;
  const valorPrimeiros5Alunos = 220;
  const descontoPorFaixa = 0.02;
  const alunosParaDesconto = 5;

  let valorTotal = 0;
  if (countAlunos <= 5) {
    valorTotal = valorPrimeiros5Alunos;
  } else {
    const alunosAcima5 = countAlunos - 5;
    valorTotal = valorPrimeiros5Alunos + alunosAcima5 * valorPorAluno;
  }

  const faixasDesconto = Math.floor((countAlunos - 5) / alunosParaDesconto);
  let desconto = faixasDesconto * descontoPorFaixa;

  if (desconto > 0.1) desconto = 0.1;

  const valorComDesconto = valorTotal * (1 - desconto);

  return (
    <main className="min-h-svh w-full bg-primary overflow-y-auto">
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col-reverse lg:flex-row w-11/12 md:w-[70%] pt-10 md:pt-0 rounded-md bg-[#1E1E1E] py-10">
        <div className="w-full flex flex-col justify-center items-center gap-10">
          <h1 className="text-white font-bold text-2xl py-10">
            Vamos Escolher um Pacote
          </h1>
          <form className="relative w-[300px] h-[400px] bg-white rounded-[10px] flex flex-col justify-center items-center px-5">
            <h1 className="text-xl font-bold text-center absolute top-5">
              Quantos alunos vão usar o Dogo ?
            </h1>

            <div className="w-full flex flex-col items-center gap-5">
              <h1 className="text-lg">
                <span className="font-bold">{countAlunos}</span> alunos
              </h1>

              <Slider
                className=""
                defaultValue={[countAlunos]}
                max={15}
                step={1}
                min={5}
                onChange={(value: any) =>
                  setCountAlunos(Number(value.target.value))
                }
              />
              {desconto > 0 && (
                <h2 className="text-green-500 font-semibold">
                  Desconto de{" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "percent",
                    maximumFractionDigits: 0,
                  }).format(desconto)}
                  {""} aplicado!
                </h2>
              )}

              <h1 className="text-xl font-bold ">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorComDesconto)}{" "}
              </h1>
            </div>

            <button
              type="button"
              className="absolute bottom-10 w-10/12 h-10 bg-blue-ocean rounded-md text-white font-bold cursor-pointer"
              onClick={() =>
                createMercadoPagoCheckout({
                  uuid: uuid,
                  email: "gc9591157@gmail.com",
                  amount: valorComDesconto,
                  students_amount: countAlunos,
                })
              }
            >
              Ir para pagamento
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
