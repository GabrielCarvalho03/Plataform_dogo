import { create } from "zustand";
import { IUserStudants } from "./types";
import axios from "axios";
import { UseUserLogin } from "../useLogin/user-login";
import moment from "moment";
import { toast } from "react-toastify";

export const useUseStudants = create<IUserStudants>((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  studants: null,
  setStudants: (value) => set({ studants: value }),

  modalCreateStudant: false,
  setModalCreateStudant: (value) => set({ modalCreateStudant: value }),

  handleGetStudants: async ({ uuid }) => {
    const { setIsLoading, studants, setStudants } = useUseStudants.getState();

    try {
      setIsLoading(true);
      const studants = await axios.post("/api/studants/get-studants", {
        uuid: uuid,
      });
      setStudants(studants.data);
      console.log("studants", studants);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  },

  handleCreateStudant: async ({ data }) => {
    const { setIsLoading, handleGetStudants, setModalCreateStudant, studants } =
      useUseStudants.getState();
    const { user } = UseUserLogin.getState();
    if (user.studentsAmount == 0 && studants && studants?.length >= 5) {
      toast.error(
        "Limite free de alunos atingido, Atualize o plano para adicionar mais alunos!"
      );

      return;
    }

    if (
      user.studentsAmount != 0 &&
      studants &&
      studants?.length >= user.studentsAmount
    ) {
      toast.error("Limite de alunos atingido!");

      return;
    }
    try {
      setIsLoading(true);
      const createStudantObject = {
        name: data.name,
        phone: `55${data.phone}`,
        nivel:
          data.nivel === "básico"
            ? "basic"
            : data.nivel == "intermediário"
            ? "intermediary"
            : "advanced",
        teacherId: user.uuid,
        lastPayment: moment().add(1, "month").format("YYYY-MM-DDTHH:mm:ssZ"),
      };

      const create = await axios.post(
        "/api/studants/create-studants",
        createStudantObject
      );
      await handleGetStudants({ uuid: user.uuid });

      toast.success("Aluno cadastrado com sucesso!");
      setModalCreateStudant(false);
    } catch (err) {
      console.log("nao foi possivel criar aluno", err);
    } finally {
      setIsLoading(false);
    }
  },

  handleDeleteStudant: async ({ uuid, phone }) => {
    const { setIsLoading, handleGetStudants } = useUseStudants.getState();

    try {
      setIsLoading(true);
      await axios.post("/api/studants/delete-studants", { uuid, phone });
      await handleGetStudants({ uuid });
      toast.success("Aluno deletado com sucesso!");
    } catch (err) {
      console.log("nao foi possivel deletar aluno", err);
    } finally {
      setIsLoading(false);
    }
  },
}));
