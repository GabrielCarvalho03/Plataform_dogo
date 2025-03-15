import { create } from "zustand";
import { IUserDashboard } from "./types";

export const useUserDashboard = create<IUserDashboard>((set) => ({
  selecDashboard: "customer",
  setSelectDashboard: (selectDashboard) =>
    set({ selecDashboard: selectDashboard }),
}));
