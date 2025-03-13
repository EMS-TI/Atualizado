/**
 * Funções para gerenciar depósitos
 * 
 * Este arquivo contém funções para carregar, salvar e calcular depósitos
 * usando o localStorage para persistência de dados.
 */

/**
 * Valor total necessário para completar todos os depósitos
 */
const TOTAL_REQUIRED = 5050;

/**
 * Obtém os depósitos de um usuário
 * @param {string} username Nome do usuário
 * @returns {Array} Lista de depósitos do usuário
 */
function getDeposits(username) {
  const savedDeposits = JSON.parse(
    localStorage.getItem(`${username}_deposits`) || '[]'
  );

  if (savedDeposits.length === 0) {
    // Se não houver depósitos salvos, cria uma lista inicial com 100 depósitos
    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      amount: i + 1,
      date: '',
      marked: false,
      removing: false,
      removalDate: '',
    }));
  }

  return savedDeposits;
}

/**
 * Salva os depósitos de um usuário
 * @param {string} username Nome do usuário
 * @param {Array} deposits Lista de depósitos para salvar
 */
function saveDeposits(username, deposits) {
  localStorage.setItem(`${username}_deposits`, JSON.stringify(deposits));
}

/**
 * Calcula o valor total dos depósitos marcados
 * @param {Array} deposits Lista de depósitos
 * @returns {number} Valor total dos depósitos marcados
 */
function calculateTotal(deposits) {
  return deposits.reduce((sum, deposit) => sum + (deposit.marked ? deposit.amount : 0), 0);
}