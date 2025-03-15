import GoogleIcon from "@/assets/icons/google-icon";
import { Input } from "@/components/ui/input";
import { DataRegisterSchema, RegisterSchema } from "@/hooks/useLogin/schema";
import { UseUserLogin } from "@/hooks/useLogin/user-login";
import { auth } from "@/services/firebase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErroMessase/error-messase";

export const FormRegister = () => {
  const { setIsLogin, handleLoginWithGoogle, handleLoginWithEmailAndSenha } =
    UseUserLogin();
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataRegisterSchema>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const teste = async (data: DataRegisterSchema) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full flex flex-col items-center pt-8 ">
      <div className="flex items-center flex-col">
        <h5 className="text-2xl text-white">Register</h5>
        <span className="text-md text-white font-light">
          Faça Registro para acessar o Dashboard
        </span>
      </div>

      <form
        onSubmit={handleSubmit((data) =>
          handleLoginWithEmailAndSenha({ data, router })
        )}
        className="w-10/12 flex flex-col  pt-8"
      >
        <div className="flex flex-col gap-7">
          <div>
            <Input
              {...register("name")}
              className="border-[0.5px] h-10 border-gray-300 rounded-sm text-white outline-none focus:outline-none"
              placeholder="Name"
              type="text"
            />
            <ErrorMessage error={errors.name?.message} />
          </div>

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
              type="password"
            />
            <ErrorMessage error={errors.password?.message} />
          </div>
        </div>

        <h1 className="my-5 text-white font-[200]">
          Já tem conta?{" "}
          <span
            className="text-blue-ocean cursor-pointer font-normal"
            onClick={() => setIsLogin(true)}
          >
            Faça login
          </span>
        </h1>

        <div className="w-full flex justify-center">
          <button className="bg-blue-ocean w-9/12 h-10 rounded-md text-white cursor-pointer">
            Registrar
          </button>
        </div>

        <section className="w-full flex justify-center items-center my-10">
          <div className="w-5/12 h-[1px] bg-gray-500" />
          <span className="w-2/12 text-center text-white">ou</span>
          <div className="w-5/12 h-[1px] bg-gray-500" />
        </section>

        <div className="w-full flex justify-center mb-5">
          <button
            type="button"
            onClick={() =>
              handleLoginWithGoogle({ provider, auth, router, signInWithPopup })
            }
            className="bg-white w-9/12 h-10 rounded-md cursor-pointer flex justify-center items-center gap-5"
          >
            <GoogleIcon />
            Entrar com o Google
          </button>
        </div>
      </form>
    </div>
  );
};
