import { HTMLAttributes } from "react";
import { Loader } from "../loader/loader";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  loading?: boolean;
};

export const Button = ({ title, loading, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={` bg-blue-ocean flex items-center justify-center text-whiteborder-[0.5px] border-blue-ocean  px-4 py-2 mt-10 rounded-md cursor-pointer w-full text-white text-sm md:text-base `}
    >
      {loading ? <Loader size={20} /> : title}
    </button>
  );
};
