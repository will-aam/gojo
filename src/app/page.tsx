// src/app/page.tsx
"use client"; // Importante: Indica que este é um Componente Cliente (usa Hooks como useState e useRouter)

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o useRouter para redirecionamento

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para exibir mensagens de erro
  const router = useRouter(); // Inicializa o hook de roteamento

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Evita o recarregamento da página ao submeter o formulário
    setError(""); // Limpa qualquer erro anterior

    // Lógica de autenticação simplificada (apenas para demonstração)
    // Em um projeto real, você faria uma chamada para uma API de autenticação aqui.
    if (username === "testuser" && password === "testpass") {
      console.log("Login bem-sucedido!");
      // Redireciona para a página de dashboard/teste
      router.push("/dashboard");
    } else {
      setError("Usuário ou senha inválidos. Tente novamente.");
      console.log("Falha no login.");
    }
  };

  return (
    // Contêiner principal: Ocupa a tela inteira, fundo cinza escuro, texto branco, centraliza o conteúdo
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      {/* Box de Login: Fundo mais claro, bordas arredondadas, sombra, largura limitada para mobile e expande para desktop */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm md:max-w-md">
        <h1 className="text-4xl font-extrabold text-center mb-8">Login</h1>

        <form onSubmit={handleSubmit}>
          {error && ( // Exibe a mensagem de erro se houver
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Usuário:
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
