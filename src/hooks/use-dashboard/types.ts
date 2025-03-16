export interface IUserDashboard {
  selecDashboard: "Studant" | "Plan";
  setSelectDashboard: (selectDashboard: "Studant" | "Plan") => void;
}
