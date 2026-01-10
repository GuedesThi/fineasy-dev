import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-indigo-50">
      <main className="flex flex-col items-center justify-center gap-7">
        <div className="inline-flex items-center gap-4 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-2xl py-1 px-3 mb-4">
          <Zap size={16} />
          <span>Controle financeiro simplificado</span>
        </div>

        <h1 className="text-6xl font-bold text-black max-w-[70%] text-center mb-4">
          Tome as rédeas da sua{" "}
          <span className="text-indigo-600">vida financeira.</span>
        </h1>

        <p className="max-w-[40%] text-center text-lg text-slate-600 mb-8">
          O Fineasy é a ferramenta mais simples e prática para você: monitorar e
          editar seus gastos, e saldos em tempo real. Sem planilhas complexas ou
          bancos de dados pesados (LocalStorage).
        </p>

        <div className="flex max-w-full gap-5">
          <Link
            href="/dashboards"
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-[1rem] font-bold px-7 py-5 rounded-2xl gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            Acessar meu dashboard
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/edit"
            className="flex items-center justify-center bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 font-bold px-7 py-5 rounded-2xl gap-2 transition-all"
          >
            Lançar despesas
          </Link>
        </div>
      </main>

      <section className="flex items-center mt-25 content-between justify-between max-w-[65%]">
        <article className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm max-w-[32%] px-5 py-9">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
            <BarChart3 size={24} />
          </div>

          <h3 className="font-bold text-xl mb-2">Visão Inteligente</h3>
          <p className="text-slate-500 text-sm">
            Gráficos dinâmicos que mostram exatamente para onde seu dinheiro
            está indo.
          </p>
        </article>
        <article className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm max-w-[32%] px-5 py-9">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <ShieldCheck size={24} />
          </div>

          <h3 className="font-bold text-xl mb-2">Privacidade Total</h3>
          <p className="text-slate-500 text-sm">
            Seus dados nunca saem do seu navegador. Segurança absoluta via
            LocalStorage.
          </p>
        </article>
        <article className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm max-w-[32%] px-5 py-9">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
            <Zap size={16} />
          </div>

          <h3 className="font-bold text-xl mb-2">Rápido e Simples</h3>
          <p className="text-slate-500 text-sm">
            Sem cadastros demorados. Abra, lance e analise em segundos.
          </p>
        </article>
      </section>
    </div>
  );
}
