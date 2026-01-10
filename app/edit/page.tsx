"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Tag,
  X,
  ArrowLeft,
  List,
} from "lucide-react";

// formato de cada transação armazenada no LocalStorage
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "entrada" | "saida";
  category: string;
  date: string;
}

// categorias padrões de transação que o usuário pode escolher
enum DEFAULT_CATEGORIES {
  SALARIO = "Salário",
  ALUGUEL = "Aluguel",
  ALIMENTO = "Alimento",
  TRANSPORTE = "Transporte",
  LAZER = "Lazer",
  OUTROS = "Outros",
}

export default function Edit() {
  // dados de todas as transações armazenada nesse array
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);

  // dados de uma transação específica (acabou de ocorrer)
  const [dadosFormulario, setDadosFormulario] = useState({
    description: "",
    amount: "",
    type: "saida" as "entrada" | "saida",
    category: DEFAULT_CATEGORIES.OUTROS as string,
    customCategory: "",
  });

  // busca transações salvas no LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("@fineasy:transacoes");

    if (stored) {
      try {
        setTransacoes(JSON.parse(stored));
      } catch (error) {
        console.error("Erro ao carregar transações", error);
      }
    }
  }, []);

  // pega os valores colocados nos inputs e salva no estado dadosFormulario
  function salvarValoresDosInputsNumEstado(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setDadosFormulario((dado) => ({ ...dado, [name]: value }));
  }

  // auto explicativo
  function adicionarTransacoesNoStorage(e: React.FormEvent) {
    e.preventDefault();

    // pega os valores armazenados em salvarValoresDosInputsNumEstado()
    const { description, amount, type, category, customCategory } =
      dadosFormulario;

    // garante que os valores principais (description + amount) possuem conteúdo para armazenar
    if (!description || !amount || Number(amount) <= 0) return;

    // vê se o usuário informou uma categoria customizada ou não (valendo a padrão)
    const categoriaFinal =
      customCategory.trim() !== "" ? customCategory : category;

    // transação que o usuário acabou de informar e deseja salvar no LocalStorage
    const novaTransacao: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      type,
      category: categoriaFinal,
      date: new Date().toISOString(),
    };

    // bota a nova transação em 1ª na lista de transações
    const versaoAtualizada = [novaTransacao, ...transacoes];
    setTransacoes(versaoAtualizada);
    localStorage.setItem(
      "@fineasy:transacoes",
      JSON.stringify(versaoAtualizada)
    );

    // reseta o formulário para os campos vazios
    setDadosFormulario({
      description: "",
      amount: "",
      type: "saida",
      category: DEFAULT_CATEGORIES.OUTROS,
      customCategory: "",
    });
  }

  function deletarTransacao(id: string) {
    // pega uma versão nova sem a transação que queremos deletar
    const versaoAtualizada = transacoes.filter((t) => t.id !== id);
    setTransacoes(versaoAtualizada);
    localStorage.setItem(
      "@fineasy:transacoes",
      JSON.stringify(versaoAtualizada)
    );
  }

  return (
    <div className="p-10">
      <header className="flex justify-between items-center mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium"
        >
          <ArrowLeft size={20} /> Voltar
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <List className="text-indigo-600" /> Registros
        </h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* formulário de transição */}
        <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-6 text-slate-700">
            Novo Registro
          </h2>

          <form onSubmit={adicionarTransacoesNoStorage} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">
                Descrição
              </label>
              <input
                type="text"
                name="description"
                value={dadosFormulario.description}
                onChange={salvarValoresDosInputsNumEstado}
                placeholder="Gás, Almoço em família, Emprestei para..."
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-base"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">
                Valor (R$)
              </label>
              <input
                type="number"
                name="amount"
                value={dadosFormulario.amount}
                onChange={salvarValoresDosInputsNumEstado}
                placeholder="0, 10, 100, 1000..."
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-base"
              />
            </div>

            {/* grid interno para escolha de categorias ou colocar uma própria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Categoria
                </label>
                <select
                  name="category"
                  value={dadosFormulario.category}
                  onChange={salvarValoresDosInputsNumEstado}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-base"
                >
                  {/* mapeamento que mostra todas as categorias possíveis */}
                  {Object.values(DEFAULT_CATEGORIES).map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Tag Extra
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="customCategory"
                    value={dadosFormulario.customCategory}
                    onChange={salvarValoresDosInputsNumEstado}
                    placeholder="Uber, Pix, Steam..."
                    className="w-full p-3 pl-9 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-base"
                  />
                </div>
              </div>
            </div>

            {/* botões que informam o tipo de transação e mudar de cor dependendo do tipo */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  setDadosFormulario((dados) => ({ ...dados, type: "entrada" }))
                }
                className={`flex-1 flex flex-col items-center py-3 rounded-xl border transition-all ${
                  dadosFormulario.type === "entrada"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                <ArrowUpCircle size={20} />
                <span className="text-xs font-bold uppercase mt-1">
                  Entrada
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setDadosFormulario((dados) => ({ ...dados, type: "saida" }))
                }
                className={`flex-1 flex flex-col items-center py-3 rounded-xl border transition-all ${
                  dadosFormulario.type === "saida"
                    ? "bg-red-50 border-red-500 text-red-700"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                <ArrowDownCircle size={20} />
                <span className="text-xs font-bold uppercase mt-1">Saída</span>
              </button>
            </div>

            {/* botão de submit que faz o formulário rodar salvarValoresDosInputsNumEstado() */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} /> Confirmar
            </button>
          </form>
        </section>

        {/* histórico de transações */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-700">
            Histórico Recente
          </h2>
          <div className="space-y-3">
            {transacoes.length === 0 && (
              <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
                Nenhum registro ainda.
              </div>
            )}
            {transacoes.map((transacao) => (
              <div
                key={transacao.id}
                className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-3 shadow-sm relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 pr-8">
                    <p className="font-bold text-slate-800 wrap-break-word leading-tight mb-1">
                      {transacao.description}
                    </p>
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-black uppercase">
                      {transacao.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deletarTransacao(transacao.id)}
                    className="p-2 text-slate-600 hover:text-white hover:bg-red-500 rounded-lg absolute top-2 right-2 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-end border-t border-slate-50 pt-3">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {new Date(transacao.date).toLocaleDateString("pt-BR")}
                  </p>
                  <span
                    className={`font-black text-lg ${
                      transacao.type === "entrada"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transacao.type === "entrada" ? "+" : "-"}{" "}
                    {transacao.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
