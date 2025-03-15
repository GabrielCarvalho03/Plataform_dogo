import { create } from "zustand";
import {
  IHandleGetUser,
  ILogin,
  ILoginWithEmailAndSenha,
  ILoginWithGoogle,
  userObject,
} from "./types";
import axios from "axios";
import moment from "moment";
import { nanoid } from "nanoid";

export const UseUserLogin = create<ILogin>((set) => ({
  isLogin: true,
  setIsLogin: (value) => set({ isLogin: value }),
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  user: {} as userObject,
  setUser: (value) => set({ user: value }),

  handleLoginWithGoogle: async ({
    provider,
    signInWithPopup,
    auth,
    router,
  }: ILoginWithGoogle) => {
    const { setUser, setIsLoading } = UseUserLogin.getState();

    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);

      const user = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        createdAt: moment().format("DD/MM/YYYY"),
      };

      const create = await axios.post("/api/users/create-user", user);
      setUser(create.data.user);
      if (create.data.user.studentsAmount === 0) {
        router.push(`/initialForm/${user.uid}`);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("não foi possivel logar com email", error);
    } finally {
      setIsLoading(false);
    }
  },

  handleLoginWithEmailAndSenha: async ({
    data,
    router,
  }: ILoginWithEmailAndSenha) => {
    const { setUser, setIsLoading } = UseUserLogin.getState();
    try {
      setIsLoading(true);
      const user = {
        uid: nanoid(22),
        name: data.name,
        email: data.email,
        password: data.password,
        photo: null,
        createdAt: moment().format("DD/MM/YYYY"),
      };
      const createUser = await axios.post("/api/users/create-user", user);
      setUser(createUser.data.user);
      if (createUser.data.user.studentsAmount === 0) {
        router.push(`/initialForm/${user.uid}`);
        return;
      }

      router.push("/dashboard");

      console.log("createUser", createUser);
    } catch (error) {
      console.log("não foi possivel logar com email", error);
    } finally {
      setIsLoading(false);
    }
  },

  handleGetUser: async ({ data, router }: IHandleGetUser) => {
    const { setUser, setIsLoading } = UseUserLogin.getState();
    try {
      setIsLoading(true);

      const user = await axios.post("/api/users/get-user", data);

      setUser(user.data.user);

      if (user.data.user.studentsAmount === 0) {
        router.push(`/initialForm/${user.data.user.uuid}`);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.log("não foi possivel logar com email", err);
    } finally {
      setIsLoading(false);
    }
  },

  handleGetUserByID: async ({ uuid, router }) => {
    const { setUser, setIsLoading } = UseUserLogin.getState();

    try {
      setIsLoading(true);
      const user = await axios.post("/api/users/get-user-by-id", { uuid });
      setUser(user.data.user);
    } catch (err) {
      console.log("nao foi possivel encontrar usuario", err);
    }
  },
}));
