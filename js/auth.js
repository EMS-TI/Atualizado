/**
 * Funções para autenticação de usuários
 * 
 * Este arquivo contém funções para gerenciar o login, logout e registro de usuários
 * usando o localStorage para persistência de dados.
 */

/**
 * Obtém o usuário atualmente logado
 * @returns O usuário atual ou null se não houver nenhum
 */
function getCurrentUser() {
  const username = localStorage.getItem('currentUser');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!username || !isLoggedIn) {
    return null;
  }

  return { username, isLoggedIn };
}

/**
 * Realiza o login do usuário
 * @param {string} username Nome de usuário
 * @param {string} password Senha do usuário
 * @returns {boolean} true se o login for bem-sucedido, false caso contrário
 */
function login(username, password) {
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
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
}

/**
 * Registra um novo usuário
 * @param {string} username Nome de usuário
 * @param {string} password Senha do usuário
 * @returns {boolean} true se o registro for bem-sucedido, false caso contrário
 */
function register(username, password) {
  if (localStorage.getItem(username)) {
    return false;
  }

  localStorage.setItem(username, password);
  return true;
}