/**
 * Página de Login
 * 
 * Permite que usuários existentes façam login na aplicação.
 */

import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  // Estados para controlar o formulário
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para processar o login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
      // Login bem-sucedido
      localStorage.setItem('currentUser', username);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/deposits');
    } else {
      // Login falhou
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg space-y-6">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          
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

          {/* Botão de login */}
          <Button type="submit" className="w-full">
            Entrar
          </Button>

          {/* Link para cadastro */}
          <p className="text-center text-gray-400">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:underline"
            >
              Cadastre-se
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
}