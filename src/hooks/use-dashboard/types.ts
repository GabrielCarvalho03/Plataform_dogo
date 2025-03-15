export interface IUserDashboard {
  selecDashboard: "customer" | "challanger";
  setSelectDashboard: (selectDashboard: "customer" | "challanger") => void;
}
