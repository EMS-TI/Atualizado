/**
 * Funções para gerenciar depósitos
 * 
 * Este arquivo contém funções para carregar, salvar e calcular depósitos
 * usando o localStorage para persistência de dados.
 */

import { Deposit } from '../types';

/**
 * Valor total necessário para completar todos os depósitos
 */
export const TOTAL_REQUIRED = 5050;

/**
 * Obtém os depósitos de um usuário
 * @param username Nome do usuário
 * @returns Lista de depósitos do usuário
 */
export function getDeposits(username: string): Deposit[] {
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
    }));
  }

  return savedDeposits;
}

/**
 * Salva os depósitos de um usuário
 * @param username Nome do usuário
 * @param deposits Lista de depósitos para salvar
 */
export function saveDeposits(username: string, deposits: Deposit[]): void {
  localStorage.setItem(`${username}_deposits`, JSON.stringify(deposits));
}

/**
 * Calcula o valor total dos depósitos marcados
 * @param deposits Lista de depósitos
 * @returns Valor total dos depósitos marcados
 */
export function calculateTotal(deposits: Deposit[]): number {
  return deposits.reduce((sum, deposit) => sum + (deposit.marked ? deposit.amount : 0), 0);
}