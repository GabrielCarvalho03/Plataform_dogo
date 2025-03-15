type IStudant = {
  name: string;
  phone: string;
  createdAt: string;
  lastPayment: string;
  nivel: string;
  plan: string;
};

type ICreateStudant = {
  data: {
    name: string;
    phone: string;
    nivel: string;
  };
};

type IHandleGetStudants = {
  uuid: string;
};

type IHandleDeleteStudants = {
  uuid: string;
  phone: string;
};

export interface IUserStudants {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  modalCreateStudant: boolean;
  setModalCreateStudant: (value: boolean) => void;

  studants: IStudant[] | null;
  setStudants: (value: IStudant[] | null) => void;
  handleGetStudants: ({ uuid }: IHandleGetStudants) => Promise<void>;
  handleCreateStudant: ({ data }: ICreateStudant) => Promise<void>;
  handleDeleteStudant: ({
    uuid,
    phone,
  }: IHandleDeleteStudants) => Promise<void>;
}
