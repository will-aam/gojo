// src/app/dashboard/Aniversarios.tsx
import { useMemo } from "react";

// Reutilize o tipo Aluno que definimos na página principal
type Aluno = {
  id: number;
  nome: string;
  modalidade: string;
  nascimento: string;
};

// Defina as props que o componente receberá
interface AniversariosProps {
  alunos: Aluno[];
}

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function Aniversarios({ alunos }: AniversariosProps) {
  // Otimiza o agrupamento de alunos por mês.
  // useMemo garante que este cálculo pesado só seja refeito se a lista de 'alunos' mudar.
  const alunosPorMes = useMemo(() => {
    const grupos: Aluno[][] = Array.from({ length: 12 }, () => []);
    alunos.forEach((aluno) => {
      // Adiciona "T00:00:00" para evitar problemas com fuso horário
      const mes = new Date(aluno.nascimento + "T00:00:00").getMonth();
      grupos[mes].push(aluno);
    });
    // Ordena os alunos dentro de cada mês pelo dia
    grupos.forEach((mes) => {
      mes.sort(
        (a, b) =>
          new Date(a.nascimento + "T00:00:00").getDate() -
          new Date(b.nascimento + "T00:00:00").getDate()
      );
    });
    return grupos;
  }, [alunos]);

  // Otimiza a busca pelo próximo aniversariante.
  const proximoAniversarianteId = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    let proximoId = null;
    let menorDiferenca = Infinity;

    alunos.forEach((aluno) => {
      const dataNascimento = new Date(aluno.nascimento + "T00:00:00");
      const proximaData = new Date(
        hoje.getFullYear(),
        dataNascimento.getMonth(),
        dataNascimento.getDate()
      );
      if (proximaData < hoje) {
        proximaData.setFullYear(hoje.getFullYear() + 1);
      }
      const diferenca = proximaData.getTime() - hoje.getTime();
      if (diferenca >= 0 && diferenca < menorDiferenca) {
        menorDiferenca = diferenca;
        proximoId = aluno.id;
      }
    });
    return proximoId;
  }, [alunos]);

  const mesAtual = new Date().getMonth();

  return (
    <>
      <header className="text-center mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h1 className="text-4xl font-extrabold text-blue-300 mb-2">
          Aniversariantes do Ano
        </h1>
        <p className="text-gray-400 text-lg">
          Confira os aniversários de todos os alunos, mês a mês.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {meses.map((nomeMes, index) => {
          const aniversariantesDoMes = alunosPorMes[index];
          const ehMesAtual = index === mesAtual;

          return (
            <div
              key={nomeMes}
              className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden
                         ${ehMesAtual ? "border-l-4 border-l-blue-500" : ""}`}
            >
              <div className="card-mes-header p-3 text-lg font-semibold bg-gray-700/50 border-b border-gray-700">
                {nomeMes}
              </div>
              {aniversariantesDoMes.length > 0 ? (
                <ul className="lista-aniversariantes">
                  {aniversariantesDoMes.map((aluno) => {
                    const dia = new Date(
                      aluno.nascimento + "T00:00:00"
                    ).getDate();
                    const ehProximo = aluno.id === proximoAniversarianteId;
                    return (
                      <li
                        key={aluno.id}
                        className={`flex items-center gap-4 p-3 border-b border-gray-700 last:border-b-0
                                   ${ehProximo ? "bg-blue-900/50" : ""}`}
                      >
                        <span className="text-2xl">🎂</span>
                        <span
                          className={`flex-grow font-medium ${
                            ehProximo ? "text-blue-300 font-bold" : ""
                          }`}
                        >
                          {aluno.nome}
                        </span>
                        <span className="text-sm font-semibold text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          Dia {dia}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="p-4 text-center text-gray-500 italic">
                  Nenhum aniversariante este mês.
                </p>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
