"use client";

import ProfImage from "@/assets/image/prof-image";
import { FormLogin } from "@/components/shared/form-login/login";
import { FormRegister } from "@/components/shared/form-login/register";
import { UseUserLogin } from "@/hooks/useLogin/user-login";

export default function Home() {
  const { isLogin } = UseUserLogin();

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
              width={window?.innerWidth > 768 ? 430 : 200}
              height={window?.innerWidth > 768 ? 222 : 200}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
