"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "entrada" | "saida";
  category: string;
  date: string;
}

export default function Dashboards() {
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("@fineasy:transacoes");
    if (stored) setTransacoes(JSON.parse(stored));
  }, []);

  // cálculo de totais
  const entradas = transacoes
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.amount, 0);

  const saidas = transacoes
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + t.amount, 0);

  const saldo = entradas - saidas;

  // formatação gráfico de barra
  const dataResumo = [
    { name: "Entradas", valor: entradas, color: "#10b981" },
    { name: "Saídas", valor: saidas, color: "#ef4444" },
  ];

  // formatação gráfico de pizza
  const gastosPorCategoria = transacoes
    .filter((t) => t.type === "saida")
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const dataCategorias = Object.keys(gastosPorCategoria).map((cat) => ({
    name: cat,
    value: gastosPorCategoria[cat],
  }));

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium"
          >
            <ArrowLeft size={20} /> Voltar
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> Dashboards
          </h1>
        </header>

        {/* cards de sumário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-sm font-bold uppercase mb-2">
              Entradas
            </p>
            <p className="text-2xl font-black text-green-600">
              R$ {entradas.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-sm font-bold uppercase mb-2">
              Saídas
            </p>
            <p className="text-2xl font-black text-red-600">
              R$ {saidas.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-sm font-bold uppercase mb-2">
              Saldo Total
            </p>
            <p
              className={`text-2xl font-black ${
                saldo >= 0 ? "text-indigo-600" : "text-orange-600"
              }`}
            >
              R$ {saldo.toLocaleString()}
            </p>
          </div>
        </div>

        {/* gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* comparativo barras */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-100">
            <h3 className="font-bold text-slate-700 mb-6">
              Comparativo Mensal
            </h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={dataResumo}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="valor" radius={[10, 10, 0, 0]}>
                  {dataResumo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* distribuição por categorias */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-100">
            <h3 className="font-bold text-slate-700 mb-6">
              Gastos por Categoria
            </h3>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={dataCategorias}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataCategorias.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
