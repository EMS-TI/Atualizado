/**
 * Arquivo principal da aplicação
 * 
 * Inicializa a aplicação e configura a navegação
 */

// Função para inicializar a aplicação
function initApp() {
  // Verifica se o usuário está logado
  const user = getCurrentUser();
  
  // Define a página inicial com base no estado de autenticação
  if (user && user.isLoggedIn) {
    navigateTo('deposits');
  } else {
    navigateTo('home');
  }
  
  // Configura a navegação por hash
  window.addEventListener('hashchange', handleHashChange);
}

// Função para lidar com mudanças na hash da URL
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  
  switch (hash) {
    case 'login':
      navigateTo('login');
      break;
    case 'register':
      navigateTo('register');
      break;
    case 'deposits':
      navigateTo('deposits');
      break;
    case 'home':
    case '':
      navigateTo('home');
      break;
    default:
      navigateTo('home');
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initApp);