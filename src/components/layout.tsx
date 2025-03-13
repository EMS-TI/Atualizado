/**
 * Componente Layout
 * 
 * Define a estrutura básica das páginas com cabeçalho e conteúdo principal.
 */

import { ReactNode } from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">EMS-TI CURSOS</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}