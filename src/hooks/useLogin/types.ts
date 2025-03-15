import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DataRegisterSchema } from "./schema";

export type ILoginWithGoogle = {
  provider: any;
  signInWithPopup: any;
  auth: any;
  router: AppRouterInstance;
};

export type ILoginWithEmailAndSenha = {
  data: DataRegisterSchema;
  router: AppRouterInstance;
};

export type IHandleGetUser = {
  data: {
    email: string;
    password: string;
  };
  router: AppRouterInstance;
};

export type userObject = {
  uuid: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
  studentsAmount: number;
};

export type IHandleGetUserByID = {
  uuid: string;
  router: AppRouterInstance;
};

export interface ILogin {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  user: userObject;
  setUser: (value: userObject) => void;

  handleLoginWithGoogle: ({
    provider,
    signInWithPopup,
  }: ILoginWithGoogle) => Promise<void>;

  handleLoginWithEmailAndSenha: ({
    data,
  }: ILoginWithEmailAndSenha) => Promise<void>;

  handleGetUser: ({ data }: IHandleGetUser) => Promise<void>;

  handleGetUserByID: ({ router, uuid }: IHandleGetUserByID) => Promise<void>;
}
