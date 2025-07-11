// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";

// --- TIPOS ---
type Turma = {
  modalidade: string;
  hora: string;
};

// --- DADOS (Simulação de Banco de Dados) ---
const alunos = [
  { id: 1, nome: "Carlos Silva", modalidade: "Jiu-Jitsu" },
  { id: 2, nome: "Bruna Costa", modalidade: "Muay Thai" },
  { id: 3, nome: "Pedro Almeida", modalidade: "Misto" },
  { id: 4, nome: "Juliana Santos", modalidade: "Jiu-Jitsu" },
  { id: 5, nome: "Fernando Lima", modalidade: "Muay Thai" },
  { id: 6, nome: "Mariana Oliveira", modalidade: "Misto" },
  { id: 7, nome: "Ricardo Gomes", modalidade: "Muay Thai" },
];

const horarios: Record<number, Turma[]> = {
  1: [
    { modalidade: "Muay Thai", hora: "17:10" },
    { modalidade: "Muay Thai", hora: "18:10" },
    { modalidade: "Muay Thai", hora: "19:10" },
    { modalidade: "Jiu-Jitsu", hora: "20:00" },
  ],
  2: [
    { modalidade: "Muay Thai", hora: "17:10" },
    { modalidade: "Muay Thai", hora: "18:10" },
    { modalidade: "Muay Thai", hora: "19:10" },
    { modalidade: "Jiu-Jitsu", hora: "20:00" },
  ],
  3: [
    { modalidade: "Muay Thai", hora: "17:10" },
    { modalidade: "Muay Thai", hora: "18:10" },
    { modalidade: "Muay Thai", hora: "19:10" },
    { modalidade: "Jiu-Jitsu", hora: "20:00" },
  ],
  4: [
    { modalidade: "Muay Thai", hora: "17:10" },
    { modalidade: "Muay Thai", hora: "18:10" },
    { modalidade: "Muay Thai", hora: "19:10" },
    { modalidade: "Jiu-Jitsu", hora: "20:00" },
  ],
  5: [
    { modalidade: "Muay Thai", hora: "17:10" },
    { modalidade: "Muay Thai", hora: "18:10" },
    { modalidade: "Muay Thai", hora: "19:10" },
  ],
  6: [],
  0: [],
};

const DIAS_DA_SEMANA = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export default function DashboardPage() {
  // Estado para controlar a visibilidade do menu lateral
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const today = new Date();
    const day = today.getDay();
    return day === 0 ? 1 : day;
  });
  const [currentDate, setCurrentDate] = useState("");
  const [notification, setNotification] = useState("");
  const [openTurmas, setOpenTurmas] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleToggleTurma = (turmaKey: string) => {
    setOpenTurmas((prev) => ({
      ...prev,
      [turmaKey]: !prev[turmaKey],
    }));
  };

  const handleChamadaSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    turmaInfo: string
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const presentes: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith("aluno-") && value === "on") {
        presentes.push(key.replace("aluno-", ""));
      }
    });
    console.log(`Chamada salva para a turma ${turmaInfo}:`, presentes);
    showNotification(`Chamada da turma ${turmaInfo} salva com sucesso!`);
  };

  const turmasDoDia = horarios[selectedDay] || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* --- MENU LATERAL (SIDEBAR) --- */}
      {/* Overlay para escurecer o fundo quando o menu estiver aberto */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* O conteúdo do menu lateral */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg p-4 z-50 transition-transform duration-300 ease-in-out
                   ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-blue-400">Gojo</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-md hover:bg-gray-700"
            aria-label="Fechar menu"
          >
            {/* Ícone 'X' para fechar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <a
            href="/dashboard"
            className="text-lg text-gray-300 hover:text-blue-400 transition-colors"
          >
            Painel
          </a>
          <a
            href="/dashboard"
            className="text-lg text-gray-300 hover:text-blue-400 transition-colors"
          >
            Lista de Chamada
          </a>
          <a
            href="/dashboard"
            className="text-lg text-gray-300 hover:text-blue-400 transition-colors"
          >
            Aniversários
          </a>
        </nav>
      </aside>

      {/* --- CABEÇALHO PRINCIPAL --- */}
      <header className="flex items-center bg-gray-800 p-4 shadow-md">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 mr-4 rounded-md hover:bg-gray-700"
          aria-label="Abrir menu"
        >
          {/* Ícone Hambúrguer */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Tirar o titulo se eu supunhetar necessario */}
        <div className="text-2xl font-bold text-blue-400">Gojo</div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL DA PÁGINA --- */}
      <main className="flex-1 p-6 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-300 mb-2">
            Lista de Chamada
          </h1>
          <p id="data-atual" className="text-gray-400 text-lg">
            {currentDate}
          </p>
        </header>

        <section className="flex justify-center flex-wrap gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((dayNum) => (
            <button
              key={dayNum}
              onClick={() => setSelectedDay(dayNum)}
              className={`py-2 px-5 rounded-lg font-semibold transition-colors duration-200
                ${
                  selectedDay === dayNum
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
            >
              {DIAS_DA_SEMANA[dayNum]}
            </button>
          ))}
        </section>

        <section
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          id="container-chamada"
        >
          {turmasDoDia.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              Nenhuma turma agendada para este dia.
            </p>
          ) : (
            turmasDoDia.map((turma, index) => {
              const alunosDaTurma = alunos.filter(
                (aluno) =>
                  aluno.modalidade === turma.modalidade ||
                  aluno.modalidade === "Misto"
              );
              const turmaKey = `${turma.modalidade}-${turma.hora}-${index}`;
              const isOpen = !!openTurmas[turmaKey];

              return (
                <div
                  key={turmaKey}
                  className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[1000px]" : "max-h-24"
                  }`}
                >
                  <div
                    className="flex justify-between items-center p-4 bg-gray-700 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => handleToggleTurma(turmaKey)}
                  >
                    <span className="text-xl font-semibold text-blue-200">
                      {turma.modalidade} - {turma.hora}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({alunosDaTurma.length} alunos)
                    </span>
                    <button
                      className={`text-gray-300 text-2xl transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </button>
                  </div>
                  <div
                    className={`chamada-corpo p-4 ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    <form
                      onSubmit={(e) =>
                        handleChamadaSubmit(
                          e,
                          `${turma.modalidade} - ${turma.hora}`
                        )
                      }
                      className="space-y-4"
                    >
                      <ul className="space-y-2">
                        {alunosDaTurma.map((aluno) => (
                          <li
                            key={aluno.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`aluno-${aluno.id}-${turma.hora.replace(
                                ":",
                                ""
                              )}`}
                              name={`aluno-${aluno.id}`}
                              className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`aluno-${aluno.id}-${turma.hora.replace(
                                ":",
                                ""
                              )}`}
                              className="text-gray-300 cursor-pointer"
                            >
                              {aluno.nome}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                      >
                        Salvar Chamada
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      {notification && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg transition-opacity duration-300 opacity-100 z-50">
          {notification}
        </div>
      )}
    </div>
  );
}
