import { Ring } from "@uiball/loaders";

type LoaderProps = {
  color?: string;
  size?: number;
};

export const Loader = ({ color, size }: LoaderProps) => {
  return (
    <Ring size={size ?? 40} lineWeight={5} speed={2} color={color ?? "#fff"} />
  );
};
