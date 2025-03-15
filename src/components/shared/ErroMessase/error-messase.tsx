type ErrorMessageProps = {
  error?: string;
};
export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <span className="text-red-300 text-sm">{error}</span>;
};
