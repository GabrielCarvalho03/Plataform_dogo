import PlanImage from "@/assets/image/plan-image";
import { Button } from "@/components/shared/button/button";
import { UserPlan } from "@/components/shared/user-plan/user-plan";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { useRouter } from "next/navigation";

export const Plans = () => {
  const router = useRouter();
  const { user } = UseUserLogin();
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-white text-center lg:text-start lg:text-2xl mt-10">
        Planos
      </h1>

      <section className=" w-10/12 lg:w-8/12 min-h-32 border-[0.5px] flex flex-col lg:flex-row items-center  py-5 px-2 rounded-lg border-gray-ligth mt-10">
        <div className=" w-full flex justify-center lg:justify-normal lg:w-6/12 ">
          <PlanImage />
        </div>

        <div className="w-10/12 lg:w-6/12 h-full    flex flex-col items-center ">
          <div className="w-full  flex flex-col items-center justify-center gap-1">
            <h1 className="text-white text-center lg:text-start lg:text-2xl mt-10 tracking-tighter">
              Plano atual:
            </h1>

            <UserPlan textSize="20" plan="free" />

            <div className=" w-10/12 lg:w-6/12">
              <Button
                onClick={() => router.push(`/initialForm/${user.uuid}`)}
                title="Atualizar plano"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
