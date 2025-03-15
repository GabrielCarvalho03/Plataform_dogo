import GoogleIcon from "@/assets/icons/google-icon";
import { Input } from "@/components/ui/input";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { auth } from "@/services/firebase-client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DataLoginSchema, LoginSchema } from "@/hooks/useLogin/schema";
import { ErrorMessage } from "../ErroMessase/error-messase";
import { Loader } from "../loader/loader";

export const FormLogin = () => {
  const router = useRouter();
  const { isLoading, setIsLogin, handleLoginWithGoogle, handleGetUser } =
    UseUserLogin();
  const provider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataLoginSchema>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  return (
    <div className="w-full h-full flex flex-col items-center pt-8 ">
      <div className="flex items-center flex-col">
        <h5 className="text-2xl text-white">Login</h5>
        <span className="text-md text-white font-light">
          Faça Login para acessar o Dashboard
        </span>
      </div>

      <form
        onSubmit={handleSubmit((data) => handleGetUser({ data, router }))}
        className="w-10/12 flex flex-col  pt-8"
      >
        <div className="flex flex-col gap-10">
          <div>
            <Input
              {...register("email")}
              className="border-[0.5px] h-10 border-gray-300 rounded-sm text-white outline-none focus:outline-none"
              placeholder="Email"
              type="email"
            />
            <ErrorMessage error={errors.email?.message} />
          </div>

          <div>
            <Input
              {...register("password")}
              className="border-[0.5px] h-10 border-gray-300 rounded-sm  text-white outline-none focus:outline-none"
              placeholder="Senha"
              type="Text"
            />
            <ErrorMessage error={errors.password?.message} />
          </div>
        </div>

        <h1 className="my-5 text-white font-[200]">
          Não tem conta?{" "}
          <span
            className="text-blue-ocean cursor-pointer font-normal"
            onClick={() => setIsLogin(false)}
          >
            Registre-se
          </span>
        </h1>

        <div className="w-full flex justify-center">
          <button className="bg-blue-ocean w-9/12 h-10 rounded-md text-white cursor-pointer flex items-center justify-center">
            {isLoading ? <Loader size={20} /> : "Entrar"}
          </button>
        </div>

        <section className="w-full flex justify-center my-10">
          <div className="w-5/12 h-[1px] bg-gray-500" />
          <span className="w-2/12 text-center text-white">ou</span>
          <div className="w-5/12 h-[1px] bg-gray-500" />
        </section>

        <div className="w-full flex justify-center mb-5">
          <button
            type="button"
            className="bg-white w-9/12 h-10 rounded-md cursor-pointer flex justify-center items-center gap-5"
            onClick={() =>
              handleLoginWithGoogle({ provider, signInWithPopup, auth, router })
            }
          >
            {!isLoading && (
              <div className="flex justify-center items-center gap-5">
                <GoogleIcon />
                Entrar com o Google
              </div>
            )}
            {isLoading && <Loader size={20} color="#000" />}
          </button>
        </div>
      </form>
    </div>
  );
};
