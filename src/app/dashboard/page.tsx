"use client";

import { Menu } from "@/components/shared/menu/menu";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { Students } from "./studants/studants";

export default function Dashboard() {
  const { user } = UseUserLogin();

  console.log("user", user);
  return (
    <main className="w-full min-h-screen flex ">
      <div className="hidden lg:block">
        <Menu />
      </div>

      <section className={`w-full h-full  lg:ml-[230px]`}>
        <Students />
      </section>
    </main>
  );
}
