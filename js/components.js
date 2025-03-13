/**
 * Componentes reutilizáveis para a interface
 */

/**
 * Renderiza o cabeçalho da aplicação
 * @param {Object} user Usuário logado (opcional)
 * @returns {HTMLElement} Elemento do cabeçalho
 */
function renderHeader(user) {
  const headerContent = createElement('div', { className: 'container header-content' }, [
    createElement('a', { 
      href: '#', 
      className: 'logo',
      onClick: (e) => {
        e.preventDefault();
        navigateTo('home');
      }
    }, [
      createElement('i', { className: 'fas fa-graduation-cap' }),
      createElement('span', {}, 'EMS-TI CURSOS')
    ])
  ]);
  
  // Adiciona informações do usuário se estiver logado
  if (user && user.isLoggedIn) {
    const userInfo = createElement('div', { className: 'user-info' }, [
      createElement('span', { className: 'username' }, `Olá, ${user.username}`),
      renderButton({
        children: 'Sair',
        variant: 'secondary',
        onClick: () => {
          logout();
          navigateTo('home');
        }
      })
    ]);
    
    headerContent.appendChild(userInfo);
  }
  
  return createElement('header', {}, [headerContent]);
}

/**
 * Renderiza o layout básico da aplicação
 * @param {HTMLElement} children Conteúdo a ser renderizado dentro do layout
 * @param {Object} user Usuário logado (opcional)
 * @returns {HTMLElement} Elemento do layout
 */
function renderLayout(children, user) {
  return createElement('div', { className: 'layout' }, [
    renderHeader(user),
    createElement('main', { className: 'container' }, [children])
  ]);
}

/**
 * Renderiza um botão
 * @param {Object} props Propriedades do botão
 * @returns {HTMLElement} Elemento do botão
 */
function renderButton(props) {
  const { 
    children, 
    variant = 'primary', 
    className = '', 
    onClick,
    type = 'button',
    fullWidth = false
  } = props;
  
  const buttonClass = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`;
  
  return createElement('button', {
    type,
    className: buttonClass,
    onClick
  }, children);
}

/**
 * Renderiza um campo de entrada
 * @param {Object} props Propriedades do campo
 * @returns {HTMLElement} Elemento do campo de entrada
 */
function renderInput(props) {
  const { 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder = '',
    error = '',
    id = `input-${Math.random().toString(36).substr(2, 9)}`
  } = props;
  
  const formGroup = createElement('div', { className: 'form-group' });
  
  if (label) {
    formGroup.appendChild(
      createElement('label', { 
        className: 'form-label',
        for: id
      }, label)
    );
  }
  
  if (type === 'password' && props.togglePassword) {
    const inputContainer = createElement('div', { className: 'password-input-container' });
    
    inputContainer.appendChild(
      createElement('input', {
        type: props.showPassword ? 'text' : 'password',
        id,
        className: `form-input ${error ? 'form-input-error' : ''}`,
        value,
        placeholder,
        onChange
      })
    );
    
    inputContainer.appendChild(
      createElement('button', {
        type: 'button',
        className: 'password-toggle',
        onClick: props.togglePassword
      }, [
        createElement('i', { 
          className: props.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
        })
      ])
    );
    
    formGroup.appendChild(inputContainer);
  } else {
    formGroup.appendChild(
      createElement('input', {
        type,
        id,
        className: `form-input ${error ? 'form-input-error' : ''}`,
        value,
        placeholder,
        onChange
      })
    );
  }
  
  if (error) {
    formGroup.appendChild(
      createElement('div', { className: 'form-error' }, error)
    );
  }
  
  return formGroup;
}

/**
 * Renderiza um modal
 * @param {Object} props Propriedades do modal
 * @returns {HTMLElement} Elemento do modal
 */
function renderModal(props) {
  const { 
    title, 
    message, 
    isOpen, 
    onClose,
    onConfirm,
    children
  } = props;
  
  if (!isOpen) return null;
  
  const modalOverlay = createElement('div', { className: 'modal-overlay' });
  const modal = createElement('div', { className: 'modal' });
  
  modal.appendChild(createElement('h3', {}, title));
  modal.appendChild(createElement('p', {}, message));
  
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child) modal.appendChild(child);
      });
    } else if (children) {
      modal.appendChild(children);
    }
  }
  
  const buttonContainer = createElement('div', { className: 'modal-buttons' });
  
  buttonContainer.appendChild(
    renderButton({
      children: 'Confirmar',
      onClick: onConfirm
    })
  );
  
  buttonContainer.appendChild(
    renderButton({
      children: 'Cancelar',
      variant: 'secondary',
      onClick: onClose
    })
  );
  
  modal.appendChild(buttonContainer);
  modalOverlay.appendChild(modal);
  
  return modalOverlay;
}