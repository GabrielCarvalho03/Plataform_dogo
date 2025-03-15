import ProfilleAvatar from "@/assets/image/profille-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserDashboard } from "@/hooks/use-dashboard/user-dashboard";
import { UseUserLogin } from "@/hooks/useLogin/user-login";

export const Menu = () => {
  const { user } = UseUserLogin();
  const { selecDashboard, setSelectDashboard } = useUserDashboard();

  return (
    <div className="w-[230px] h-screen bg-black fixed flex flex-col items-center ">
      <Avatar className="w-16 h-16 mt-10">
        <AvatarImage src={user?.photo ? user?.photo : ""} />
        <AvatarFallback className="bg-transparent">
          <ProfilleAvatar />
        </AvatarFallback>
      </Avatar>

      <h1 className="text-white font-[600] py-4">{user?.name}</h1>

      <section className="w-full flex flex-col items-center gap-5 ">
        <button
          onClick={() => setSelectDashboard("customer")}
          className={` ${
            selecDashboard == "customer"
              ? "bg-blue-ocean text-white"
              : "bg-transparent text-blue-ocean"
          } border-[0.5px] border-blue-ocean w-10/12 px-4 py-2 mt-10 rounded-md`}
        >
          Clientes
        </button>

        {/* <button
          onClick={() => setSelectDashboard("challanger")}
          className={` ${
            selecDashboard == "challanger"
              ? "bg-blue-ocean text-white"
              : "bg-transparent text-blue-ocean"
          } border-[0.5px] border-blue-ocean w-10/12 px-4 py-2  rounded-md`}
        >
          Desafios
        </button> */}
      </section>
    </div>
  );
};
