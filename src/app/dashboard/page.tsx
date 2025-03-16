"use client";

import { Menu } from "@/components/shared/menu/menu";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { Students } from "./studants/studants";
import { useUserDashboard } from "@/hooks/use-dashboard/user-dashboard";
import { Plans } from "./plans/plans";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUseStudants } from "@/hooks/use-studants/use-studants";
import { Loader } from "@/components/shared/loader/loader";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const route = useRouter();
  const { user, handleGetUserByID } = UseUserLogin();
  const { handleGetStudants } = useUseStudants();
  const { selecDashboard } = useUserDashboard();
  const uuidCookie = Cookies.get("uuid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfos();
  }, [user?.uuid || uuidCookie]);

  const getInfos = async () => {
    if (!uuidCookie || uuidCookie == "") {
      route.push("/");
    }
    if (uuidCookie && !user?.uuid) {
      await handleGetUserByID({ uuid: uuidCookie });
      await handleGetStudants({ uuid: uuidCookie });
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center">
        <Loader />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen flex ">
      <div className="">
        <Menu />
      </div>
      <section className={`w-full h-full  lg:ml-[230px]`}>
        {selecDashboard === "Studant" && <Students />}
        {selecDashboard === "Plan" && <Plans />}
      </section>
    </main>
  );
}
