/**
 * Página Inicial
 * 
 * Apresenta uma visão geral do site e opções para login ou registro.
 */

import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, TrendingUp, DollarSign } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Seção de boas-vindas */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Transforme seu futuro com nossos cursos
          </h1>
          <p className="text-gray-400 text-lg">
            Aprenda com especialistas e desenvolva habilidades essenciais para o mercado financeiro
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/register')}>
              Começar agora
            </Button>
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Já tenho conta
            </Button>
          </div>
        </section>

        {/* Seção de recursos */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold">Educação Financeira</h3>
            <p className="text-gray-400">
              Aprenda a gerenciar suas finanças pessoais e fazer investimentos inteligentes
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold">Trader</h3>
            <p className="text-gray-400">
              Domine estratégias avançadas para operar no mercado financeiro
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <DollarSign className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold">Mercado de Ações</h3>
            <p className="text-gray-400">
              Entenda como funciona a bolsa de valores e comece a investir
            </p>
          </div>
        </section>

        {/* Seção de chamada para ação */}
        <section className="bg-gray-800 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <Play className="w-12 h-12 text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold">Comece sua jornada</h2>
              <p className="text-gray-400">
                Acesse nosso conteúdo exclusivo e transforme sua vida financeira
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/register')} className="w-full">
            Cadastre-se gratuitamente
          </Button>
        </section>
      </div>
    </Layout>
  );
}