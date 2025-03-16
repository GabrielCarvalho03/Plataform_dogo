import { create } from "zustand";
import { IUserDashboard } from "./types";

export const useUserDashboard = create<IUserDashboard>((set) => ({
  selecDashboard: "Studant",
  setSelectDashboard: (selectDashboard) =>
    set({ selecDashboard: selectDashboard }),
}));
