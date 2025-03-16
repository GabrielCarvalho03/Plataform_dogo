"use client";

import { useState } from "react";
import ProfilleAvatar from "@/assets/image/profille-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserDashboard } from "@/hooks/use-dashboard/user-dashboard";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuMobile from "@/assets/icons/menu-mobile";
import { XIcon } from "lucide-react";

export const Menu = () => {
  const { user } = UseUserLogin();
  const { selecDashboard, setSelectDashboard } = useUserDashboard();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className=" hidden lg:flex w-[230px] h-screen bg-black fixed  flex-col items-center ">
        <Avatar className="w-16 h-16 mt-10">
          <AvatarImage src={user?.photo ? user?.photo : undefined} />
          <AvatarFallback className="bg-transparent">
            <ProfilleAvatar />
          </AvatarFallback>
        </Avatar>

        <h1 className="text-white font-[600] py-4">{user?.name}</h1>

        <section className="w-full flex flex-col items-center gap-5 ">
          <button
            onClick={() => setSelectDashboard("Studant")}
            className={` ${
              selecDashboard == "Studant"
                ? "bg-blue-ocean text-white"
                : "bg-transparent text-blue-ocean"
            } border-[0.5px] border-blue-ocean w-10/12 px-4 py-2 mt-10 rounded-md`}
          >
            Alunos
          </button>

          <button
            onClick={() => setSelectDashboard("Plan")}
            className={` ${
              selecDashboard == "Plan"
                ? "bg-blue-ocean text-white"
                : "bg-transparent text-blue-ocean"
            } border-[0.5px] border-blue-ocean w-10/12 px-4 py-2  rounded-md`}
          >
            Planos
          </button>
        </section>
      </div>

      <div className=" lg:hidden absolute flex w-[230px] h-screen  flex-col items-center ">
        <div className="w-full " onClick={() => setIsOpen(true)}>
          <MenuMobile />
        </div>
        <Sheet open={isOpen}>
          <SheetContent
            side="left"
            className="w-6/12 bg-black text-white border-none "
          >
            <XIcon
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            ></XIcon>

            <section className="w-6/12 flex h-screen bg-black fixed  flex-col items-center mt-20">
              <Avatar className="w-16 h-16 mt-10">
                <AvatarImage src={user?.photo ? user?.photo : undefined} />
                <AvatarFallback className="bg-transparent">
                  <ProfilleAvatar />
                </AvatarFallback>
              </Avatar>

              <h1 className="text-white font-[600] py-4">{user?.name}</h1>

              <section className="w-full flex flex-col items-center gap-5 ">
                <button
                  onClick={() => {
                    setSelectDashboard("Studant");
                    setIsOpen(false);
                  }}
                  className={` ${
                    selecDashboard == "Studant"
                      ? "bg-blue-ocean text-white"
                      : "bg-transparent text-blue-ocean"
                  } border-[0.5px] border-blue-ocean w-10/12 px-4 py-2 mt-10 rounded-md`}
                >
                  Alunos
                </button>

                <button
                  onClick={() => {
                    setSelectDashboard("Plan");
                    setIsOpen(false);
                  }}
                  className={` ${
                    selecDashboard == "Plan"
                      ? "bg-blue-ocean text-white"
                      : "bg-transparent text-blue-ocean"
                  } border-[0.5px] border-blue-ocean w-10/12 px-4 py-2  rounded-md`}
                >
                  Planos
                </button>
              </section>
            </section>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
