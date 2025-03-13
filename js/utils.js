/**
 * Funções utilitárias para a aplicação
 */

// Função para criar elementos HTML com atributos e filhos
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  // Adiciona atributos ao elemento
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'onClick') {
      element.addEventListener('click', value);
    } else if (key === 'onChange') {
      element.addEventListener('input', (e) => value(e));
    } else if (key === 'onSubmit') {
      element.addEventListener('submit', (e) => {
        e.preventDefault();
        value(e);
      });
    } else if (key === 'style') {
      element.style.cssText = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Adiciona filhos ao elemento
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (child !== null && child !== undefined) {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          element.appendChild(child);
        }
      }
    });
  } else if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Node) {
    element.appendChild(children);
  }
  
  return element;
}

// Função para navegar entre páginas
function navigateTo(page) {
  const app = document.getElementById('app');
  app.innerHTML = '';
  
  // Renderiza a página correspondente
  switch (page) {
    case 'home':
      app.appendChild(renderHomePage());
      break;
    case 'login':
      app.appendChild(renderLoginPage());
      break;
    case 'register':
      app.appendChild(renderRegisterPage());
      break;
    case 'deposits':
      app.appendChild(renderDepositsPage());
      break;
    default:
      app.appendChild(renderHomePage());
  }
}