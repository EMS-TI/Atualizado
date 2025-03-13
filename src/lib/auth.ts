/**
 * Funções para autenticação de usuários
 * 
 * Este arquivo contém funções para gerenciar o login, logout e registro de usuários
 * usando o localStorage para persistência de dados.
 */

import { User } from '../types';

/**
 * Obtém o usuário atualmente logado
 * @returns O usuário atual ou null se não houver nenhum
 */
export function getCurrentUser(): User | null {
  const username = localStorage.getItem('currentUser');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!username || !isLoggedIn) {
    return null;
  }

  return { username, isLoggedIn };
}

/**
 * Realiza o login do usuário
 * @param username Nome de usuário
 * @param password Senha do usuário
 * @returns true se o login for bem-sucedido, false caso contrário
 */
export function login(username: string, password: string): boolean {
  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    localStorage.setItem('currentUser', username);
    localStorage.setItem('isLoggedIn', 'true');
    return true;
  }

  return false;
}

/**
 * Realiza o logout do usuário atual
 */
export function logout(): void {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
}

/**
 * Registra um novo usuário
 * @param username Nome de usuário
 * @param password Senha do usuário
 * @returns true se o registro for bem-sucedido, false caso contrário
 */
export function register(username: string, password: string): boolean {
  if (localStorage.getItem(username)) {
    return false;
  }

  localStorage.setItem(username, password);
  return true;
}