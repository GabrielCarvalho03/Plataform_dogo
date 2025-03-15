"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUseStudants } from "@/hooks/use-studants/use-studants";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { NotStudants } from "./not-studants/not-studants";
import { ModalSaveStudants } from "@/components/shared/modais/save-studants/modal-save-challenger";
import { UserPlan } from "@/components/shared/user-plan/user-plan";
import { UserStatus } from "@/components/shared/user-status/user-status";
import TrashIcon from "@/assets/icons/trash-icon";
import { Button } from "@/components/shared/button/button";
import { Loader } from "@/components/shared/loader/loader";

export function Students() {
  const router = useRouter();
  const [deletingStudant, setDeletingStudant] = useState<string | null>(null);
  const {
    studants,
    handleGetStudants,
    handleDeleteStudant,
    setModalCreateStudant,
    isLoading,
  } = useUseStudants();
  const { user } = UseUserLogin();

  useEffect(() => {
    console.log("studants", studants?.length);
    if (!studants?.length) {
      handleGetStudants({ uuid: user.uuid });
    }
  }, []);

  return (
    <main className="w-full h-full bg-bg-primary overflow-y-auto pb-10 ">
      <div className="mt-10 pl-10">
        <h1 className="text-white text-2xl font-madefor font-bold">
          Bem-vindo ao seu <span className="text-blue-ocean">dashboard</span>
        </h1>
      </div>

      <div className="w-full px-10 flex flex-col lg:flex-row  justify-between lg:items-center">
        <h1 className="mt-10  text-2xl font-madefor  text-white">
          Alunos ({studants?.length})
        </h1>

        <div className=" w-5/12 md:6/12 lg:w-2/12">
          <Button
            title="Cadastrar"
            onClick={() => setModalCreateStudant(true)}
          />
        </div>
      </div>

      <section className="w-[95%] max-h-[650px] overflow-y-auto  ml-1 lg:ml-10 mt-10 border-[0.5px] rounded-lg border-gray-ligth">
        {!studants?.length ? (
          <NotStudants />
        ) : (
          <div className=" lg:p-6 pb-10 max-h-[600px]">
            <table className="w-full bg-primary cursor-pointer rounded-lg overflow-hidden border-separate border-spacing-y-3">
              <thead>
                <tr className="">
                  <th className="text-left px-4 text-gray-400 font-light">
                    Nome
                  </th>
                  <th className="text-left px-4 text-gray-400 font-light">
                    Número
                  </th>
                  <th className="text-left px-4 text-gray-400 font-light">
                    Plano
                  </th>
                  <th className="text-left px-4 text-gray-400 font-light">
                    Status
                  </th>
                  <th className="text-left px-4 text-gray-400 font-light">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {studants.map((studant, index) => (
                  <tr
                    key={index}
                    className="h-16 bg-bg-gray-ligth hover:bg-[#252525] transition-colors"
                  >
                    <td className="p-4 text-white rounded-l-lg ">
                      {studant.name}
                    </td>
                    <td className="p-4 text-white">{studant.phone}</td>
                    <td className="p-4">
                      <UserPlan plan={studant.plan} />
                    </td>
                    <td className="p-4 text-white">
                      {<UserStatus date={studant.lastPayment} />}
                    </td>

                    <td className="p-4 text-white rounded-r-lg ">
                      <div
                        className="w-8 cursor-pointer 
                        
                        "
                        onClick={async () => {
                          setDeletingStudant(studant.phone);
                          await handleDeleteStudant({
                            uuid: user.uuid,
                            phone: studant.phone,
                          });
                          setDeletingStudant(null);
                        }}
                      >
                        {deletingStudant === studant.phone && isLoading ? (
                          <Loader size={20} />
                        ) : (
                          <TrashIcon />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ModalSaveStudants />
    </main>
  );
}
