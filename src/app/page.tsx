"use client";

import ProfImage from "@/assets/image/prof-image";
import { FormLogin } from "@/components/shared/form-login/login";
import { FormRegister } from "@/components/shared/form-login/register";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLogin } = UseUserLogin();
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setImageSize(
        window.innerWidth > 768
          ? { width: 430, height: 222 }
          : { width: 200, height: 200 }
      );
    }
  }, []);

  return (
    <main className="min-h-svh  w-full bg-primary overflow-y-auto ">
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col-reverse lg:flex-row  w-11/12 md:w-[70%] pt-10 md:pt-0   rounded-md bg-[#1E1E1E]">
        <div className="w-full lg:w-6/12 pb-5">
          {isLogin ? <FormLogin /> : <FormRegister />}
        </div>

        <div className="relative w-full lg:w-6/12  bg-white flex flex-col justify-center items-center gap-20">
          <div className="w-full h-full flex flex-col items-center absolute top-8">
            <h5 className="text-2xl">Bem vindo(a) ao</h5>
            <span className="text-4xl">Portal do professor</span>
          </div>

          <div className="mt-36">
            <ProfImage
              //@ts-ignore
              width={imageSize.width}
              //@ts-ignore
              height={imageSize.height}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
