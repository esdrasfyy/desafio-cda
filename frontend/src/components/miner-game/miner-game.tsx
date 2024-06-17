import { ButtonGift } from "../ui/button/button-gift/button-gift";

export const MinerGame = () => {
  return (
    <div className="px-2 rounded-md shadow-snipped border-[1px] border-[--color-one] border-solid w-full h-full flex flex-col justify-between">
      {" "}
      <div>
        <h1 className="w-full text-2xl font-semibold text-[--color-one] text-center mt-6">
          Mineração
        </h1>
        <p className="text-xs w-full mt-5 text-white/50">
          Explore um tabuleiro de 20 quadrados em busca de tesouros. Encontre 10
          diamantes sem acionar nenhuma das 3 bombas. Tudo isso dentro de um
          determinado tempo!
        </p>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <p className="w-full text-center text-xs text-red-600">
          JOGO AINDA EM DESENVOLVIMENTO, POR ENQUANTO PEGUE EMBLEMAS ALEATORIOS.
        </p>
        <div className="max-w-64 mx-auto w-full">
          <ButtonGift />
        </div>
      </div>
    </div>
  );
};
