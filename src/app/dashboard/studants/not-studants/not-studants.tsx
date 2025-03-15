import { Button } from "@/components/shared/button/button";
import { useUseStudants } from "@/hooks/use-studants/use-studants";

export const NotStudants = () => {
  const { modalCreateStudant, setModalCreateStudant } = useUseStudants();
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-white text-center lg:text-start lg:text-2xl mt-10 ">
        Você ainda não tem nenhum aluno cadastrado
      </h1>
      <div className="w-4/12 py-5 pb-10">
        <Button
          onClick={() => setModalCreateStudant(true)}
          title="Cadastrar aluno"
        />
      </div>
    </main>
  );
};
