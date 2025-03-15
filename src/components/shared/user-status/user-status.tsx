import moment from "moment";

type UserPlanProps = {
  date: string;
};

export const UserStatus = ({ date }: UserPlanProps) => {
  const actualData = moment();
  const lastPayment = moment(date);

  return (
    <span
      className={`
            px-3 py-1 rounded-full text-sm text-white
          ${actualData.isAfter(lastPayment) ? "bg-red-300 " : "bg-green-300"}
          `}
    >
      {actualData.isAfter(lastPayment) ? "Inativo" : "Ativo"}
    </span>
  );
};
