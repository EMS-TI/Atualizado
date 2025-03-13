/**
 * Página de Cadastro
 * 
 * Permite que novos usuários se cadastrem na aplicação.
 */

import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function Register() {
  // Estados para controlar o formulário
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para processar o cadastro
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    // Verifica se o usuário já existe
    if (localStorage.getItem(username)) {
      setError('Usuário já existe');
      return;
    }

    // Salva o novo usuário e redireciona para o login
    localStorage.setItem(username, password);
    navigate('/login');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-lg space-y-6">
          <h1 className="text-2xl font-bold text-center">Cadastro</h1>
          
          {/* Campo de usuário */}
          <Input
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error}
          />

          {/* Campo de senha com botão para mostrar/ocultar */}
          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Botão de cadastro */}
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>

          {/* Link para login */}
          <p className="text-center text-gray-400">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Fazer login
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
}