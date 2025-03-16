import Modal from "react-modal";
import { objStyle } from "./obj-style";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../../button/button";
import { PatternFormat } from "react-number-format";
import { DataRegisterStudantSchema } from "@/hooks/use-studants/schema";
import { ErrorMessage } from "../../ErroMessase/error-messase";
import { useUseStudants } from "@/hooks/use-studants/use-studants";

export function ModalSaveStudants() {
  const {
    handleCreateStudant,
    modalCreateStudant,
    setModalCreateStudant,
    isLoading,
  } = useUseStudants();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DataRegisterStudantSchema>({
    mode: "onSubmit",
  });

  return (
    <Modal
      isOpen={modalCreateStudant}
      style={objStyle}
      onRequestClose={() => setModalCreateStudant(false)}
    >
      <main className="w-[25rem] min-h-[500px] bg-[#1A1818] rounded-lg z-50">
        <div className="w-full flex flex-col items-center justify-center pt-5">
          <h1 className="text-white text-center text-xl">Cadastro</h1>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleCreateStudant({ data }))}
          className="w-full flex flex-col items-center gap-5 mt-5 z-50"
        >
          <div className="w-10/12 flex flex-col gap-3">
            <h6 className="text-white text-md">Nome</h6>
            <Input
              {...register("name", { required: "Nome é obrigatório" })}
              type="text"
              placeholder="Alice"
              className="border-[0.5px] border-gray-ligth text-white"
            />

            <ErrorMessage error={errors.name?.message} />
          </div>

          <div className="w-10/12 flex flex-col gap-3">
            <h6 className="text-white text-md">Telefone</h6>
            <PatternFormat
              {...register("phone", {
                required: "Telefone é obrigatório",
                validate: {
                  minLength: (value) =>
                    value.replace(/\D/g, "").length >= 11 ||
                    "Telefone precisa ter pelo menos 11 dígitos",
                },
              })}
              value=""
              className="border-[0.5px] border-gray-ligth bg-transparent text-white h-9 outline-none rounded-sm font-light px-2"
              mask="_"
              format="+55 (##) # ####-####"
              placeholder="Digite o telefone"
              onValueChange={(values) => {
                const { value } = values;
                setValue("phone", value);
              }}
            />
            <ErrorMessage error={errors.phone?.message} />
          </div>

          <div className="w-10/12 flex flex-col gap-3">
            <h6 className="text-white text-md">Nível</h6>
            <select
              {...register("nivel")}
              className="border-[0.5px] border-gray-ligth bg-transparent text-white h-8 rounded-md font-light px-2"
            >
              <option value="básico" className="bg-primary">
                básico
              </option>
              <option value="intermediário" className="bg-primary">
                intermediário
              </option>
              <option value="avançado" className="bg-primary">
                avançado
              </option>

              <ErrorMessage error={errors.nivel?.message} />
            </select>
          </div>

          <div className="w-10/12 flex flex-col gap-3">
            <h6 className="text-white text-md">Plano</h6>
            <Input
              type="text"
              placeholder="monthly"
              readOnly
              tabIndex={-1}
              className="border-[0.5px] border-gray-ligth text-white cursor-not-allowed"
            />

            <ErrorMessage error={errors.name?.message} />
          </div>

          <div className="w-10/12 pb-5">
            <Button title="Salvar" loading={isLoading} />
          </div>
        </form>
      </main>
    </Modal>
  );
}
