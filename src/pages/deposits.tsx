/**
 * Página de Depósitos
 * 
 * Permite ao usuário visualizar, adicionar e remover depósitos.
 */

import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';

interface Deposit {
  id: number;
  amount: number;
  date: string;
  marked: boolean;
  removing: boolean;
  removalDate?: string;
}

export function Deposits() {
  // Estados para gerenciar os depósitos e a interface
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [actionType, setActionType] = useState<'reset' | 'logout' | 'remove' | null>(null);
  const [selectedDeposit, setSelectedDeposit] = useState<number | null>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('currentUser');
  const TOTAL_AMOUNT = 5050;
  
  // Carrega os depósitos do localStorage quando a página é carregada
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login');
      return;
    }

    const savedDeposits = JSON.parse(
      localStorage.getItem(`${username}_deposits`) || '[]'
    );
    
    if (savedDeposits.length === 0) {
      // Se não houver depósitos salvos, cria uma lista inicial com 100 depósitos
      const initialDeposits = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        amount: i + 1,
        date: '',
        marked: false,
        removing: false,
      }));
      setDeposits(initialDeposits);
    } else {
      setDeposits(savedDeposits);
    }
  }, [username, navigate]);

  // Calcula o total depositado sempre que a lista de depósitos muda
  useEffect(() => {
    const total = deposits.reduce(
      (sum, deposit) => sum + (deposit.marked ? deposit.amount : 0),
      0
    );
    setTotalDeposited(total);
  }, [deposits]);

  // Função para adicionar ou remover um depósito
  const handleDeposit = (deposit: Deposit) => {
    if (deposit.marked) {
      // Se o depósito já está marcado, pede senha para remover
      setSelectedDeposit(deposit.id);
      setActionType('remove');
      setShowPasswordModal(true);
      setPassword('');
      setError('');
    } else {
      // Se o depósito não está marcado, adiciona diretamente
      const newDeposits = deposits.map((d) => {
        if (d.id === deposit.id) {
          return {
            ...d,
            marked: true,
            date: new Date().toISOString(),
            removing: false,
            removalDate: undefined,
          };
        }
        return d;
      });

      setDeposits(newDeposits);
      localStorage.setItem(`${username}_deposits`, JSON.stringify(newDeposits));
    }
  };

  // Função para confirmar ação com senha
  const handlePasswordSubmit = () => {
    const storedPassword = localStorage.getItem(username || '');
    
    if (storedPassword === password) {
      if (actionType === 'reset') {
        // Reinicia todos os depósitos
        const newDeposits = deposits.map((d) => ({
          ...d,
          marked: false,
          date: '',
          removing: false,
          removalDate: undefined,
        }));
        setDeposits(newDeposits);
        localStorage.setItem(`${username}_deposits`, JSON.stringify(newDeposits));
      } else if (actionType === 'logout') {
        // Faz logout do usuário
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        navigate('/login');
      } else if (actionType === 'remove' && selectedDeposit) {
        // Remove um depósito específico
        const newDeposits = deposits.map((d) => {
          if (d.id === selectedDeposit) {
            return {
              ...d,
              marked: false,
              removing: true,
              removalDate: new Date().toISOString(),
            };
          }
          return d;
        });
        setDeposits(newDeposits);
        localStorage.setItem(`${username}_deposits`, JSON.stringify(newDeposits));
      }
      setShowPasswordModal(false);
      setPassword('');
      setError('');
      setSelectedDeposit(null);
    } else {
      setError('Senha incorreta');
    }
  };

  // Função para iniciar uma ação que requer confirmação
  const initiateAction = (type: 'reset' | 'logout') => {
    setActionType(type);
    setShowPasswordModal(true);
    setPassword('');
    setError('');
  };

  // Calcula o progresso como porcentagem do total
  const progress = (totalDeposited / TOTAL_AMOUNT) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Painel de informações */}
        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Controle de Depósitos</h2>
            <div className="space-x-4">
              <Button variant="secondary" onClick={() => initiateAction('reset')}>
                Reiniciar
              </Button>
              <Button variant="danger" onClick={() => initiateAction('logout')}>
                Sair
              </Button>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Informações de valores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Total Depositado</p>
              <p className="text-2xl font-bold">
                R$ {totalDeposited.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Falta Depositar</p>
              <p className="text-2xl font-bold">
                R$ {(TOTAL_AMOUNT - totalDeposited).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Grade de depósitos */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {deposits.map((deposit) => (
            <button
              key={deposit.id}
              onClick={() => handleDeposit(deposit)}
              className={`
                aspect-square rounded-lg font-medium transition-colors relative group
                ${
                  deposit.marked
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : deposit.removing
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }
              `}
            >
              <span>{deposit.id}</span>
              {/* Tooltip para mostrar a data ao passar o mouse */}
              {(deposit.date || deposit.removalDate) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {deposit.marked ? (
                    `Depositado em: ${new Date(deposit.date).toLocaleDateString()}`
                  ) : deposit.removing && deposit.removalDate ? (
                    `Retirado em: ${new Date(deposit.removalDate).toLocaleDateString()}`
                  ) : null}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Modal de confirmação com senha */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4">
              <h3 className="text-xl font-bold">
                {actionType === 'reset' 
                  ? 'Confirmar Reinício' 
                  : actionType === 'logout'
                  ? 'Confirmar Saída'
                  : 'Confirmar Remoção do Depósito'}
              </h3>
              <p className="text-gray-400">
                Digite sua senha para confirmar esta ação
              </p>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                error={error}
              />
              <div className="flex gap-2">
                <Button onClick={handlePasswordSubmit}>
                  Confirmar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setError('');
                    setSelectedDeposit(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}