/**
 * Funções para renderizar as páginas da aplicação
 */

/**
 * Renderiza a página inicial
 * @returns {HTMLElement} Elemento da página inicial
 */
function renderHomePage() {
  const user = getCurrentUser();
  
  const content = createElement('div', { className: 'home-content' }, [
    // Seção de boas-vindas
    createElement('section', { className: 'hero' }, [
      createElement('h1', {}, 'Transforme seu futuro com nossos cursos'),
      createElement('p', {}, 'Aprenda com especialistas e desenvolva habilidades essenciais para o mercado financeiro'),
      createElement('div', { className: 'hero-buttons' }, [
        !user ? createElement('div', {}, [
          renderButton({
            children: 'Começar agora',
            onClick: () => navigateTo('register')
          }),
          renderButton({
            children: 'Já tenho conta',
            variant: 'secondary',
            onClick: () => navigateTo('login')
          })
        ]) : createElement('div', {}, [
          renderButton({
            children: 'Ir para Depósitos',
            onClick: () => navigateTo('deposits')
          })
        ])
      ])
    ]),
    
    // Seção de recursos
    createElement('section', { className: 'features' }, [
      createElement('div', { className: 'feature' }, [
        createElement('i', { className: 'fas fa-book-open' }),
        createElement('h3', {}, 'Educação Financeira'),
        createElement('p', {}, 'Aprenda a gerenciar suas finanças pessoais e fazer investimentos inteligentes')
      ]),
      createElement('div', { className: 'feature' }, [
        createElement('i', { className: 'fas fa-chart-line' }),
        createElement('h3', {}, 'Trader'),
        createElement('p', {}, 'Domine estratégias avançadas para operar no mercado financeiro')
      ]),
      createElement('div', { className: 'feature' }, [
        createElement('i', { className: 'fas fa-dollar-sign' }),
        createElement('h3', {}, 'Mercado de Ações'),
        createElement('p', {}, 'Entenda como funciona a bolsa de valores e comece a investir')
      ])
    ]),
    
    // Seção de chamada para ação
    createElement('section', { className: 'cta' }, [
      createElement('div', { className: 'cta-content' }, [
        createElement('i', { className: 'fas fa-play' }),
        createElement('div', { className: 'cta-text' }, [
          createElement('h2', {}, 'Comece sua jornada'),
          createElement('p', {}, 'Acesse nosso conteúdo exclusivo e transforme sua vida financeira')
        ])
      ]),
      !user ? renderButton({
        children: 'Cadastre-se gratuitamente',
        onClick: () => navigateTo('register'),
        fullWidth: true
      }) : renderButton({
        children: 'Acessar Depósitos',
        onClick: () => navigateTo('deposits'),
        fullWidth: true
      })
    ])
  ]);
  
  return renderLayout(content, user);
}

/**
 * Renderiza a página de login
 * @returns {HTMLElement} Elemento da página de login
 */
function renderLoginPage() {
  let username = '';
  let password = '';
  let error = '';
  let showPassword = false;
  
  const updateForm = () => {
    // Limpa o formulário
    formContainer.innerHTML = '';
    
    // Recria o formulário com os valores atualizados
    formContainer.appendChild(
      createElement('form', { 
        className: 'auth-form',
        onSubmit: handleLogin
      }, [
        createElement('h1', {}, 'Login'),
        renderInput({
          label: 'Usuário',
          value: username,
          onChange: (e) => { username = e.target.value; },
          error: error
        }),
        renderInput({
          label: 'Senha',
          type: 'password',
          value: password,
          onChange: (e) => { password = e.target.value; },
          showPassword: showPassword,
          togglePassword: () => {
            showPassword = !showPassword;
            updateForm();
          }
        }),
        renderButton({
          children: 'Entrar',
          type: 'submit',
          fullWidth: true
        }),
        createElement('p', { className: 'auth-link' }, [
          'Não tem uma conta? ',
          createElement('button', {
            type: 'button',
            onClick: () => navigateTo('register')
          }, 'Cadastre-se')
        ])
      ])
    );
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (login(username, password)) {
      navigateTo('deposits');
    } else {
      error = 'Usuário ou senha incorretos';
      updateForm();
    }
  };
  
  const formContainer = createElement('div', { className: 'auth-container' });
  updateForm();
  
  return renderLayout(formContainer);
}

/**
 * Renderiza a página de cadastro
 * @returns {HTMLElement} Elemento da página de cadastro
 */
function renderRegisterPage() {
  let username = '';
  let password = '';
  let error = '';
  let showPassword = false;
  
  const updateForm = () => {
    // Limpa o formulário
    formContainer.innerHTML = '';
    
    // Recria o formulário com os valores atualizados
    formContainer.appendChild(
      createElement('form', { 
        className: 'auth-form',
        onSubmit: handleRegister
      }, [
        createElement('h1', {}, 'Cadastro'),
        renderInput({
          label: 'Usuário',
          value: username,
          onChange: (e) => { username = e.target.value; },
          error: error
        }),
        renderInput({
          label: 'Senha',
          type: 'password',
          value: password,
          onChange: (e) => { password = e.target.value; },
          showPassword: showPassword,
          togglePassword: () => {
            showPassword = !showPassword;
            updateForm();
          }
        }),
        renderButton({
          children: 'Cadastrar',
          type: 'submit',
          fullWidth: true
        }),
        createElement('p', { className: 'auth-link' }, [
          'Já tem uma conta? ',
          createElement('button', {
            type: 'button',
            onClick: () => navigateTo('login')
          }, 'Fazer login')
        ])
      ])
    );
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      error = 'Preencha todos os campos';
      updateForm();
      return;
    }
    
    if (register(username, password)) {
      navigateTo('login');
    } else {
      error = 'Usuário já existe';
      updateForm();
    }
  };
  
  const formContainer = createElement('div', { className: 'auth-container' });
  updateForm();
  
  return renderLayout(formContainer);
}

/**
 * Renderiza a página de depósitos
 * @returns {HTMLElement} Elemento da página de depósitos
 */
function renderDepositsPage() {
  const user = getCurrentUser();
  
  if (!user) {
    navigateTo('login');
    return createElement('div');
  }
  
  let deposits = getDeposits(user.username);
  let showPasswordModal = false;
  let password = '';
  let error = '';
  let actionType = null;
  let selectedDeposit = null;
  
  const TOTAL_AMOUNT = 5050;
  
  const updatePage = () => {
    // Calcula o total depositado
    const totalDeposited = calculateTotal(deposits);
    const progress = (totalDeposited / TOTAL_AMOUNT) * 100;
    
    // Limpa o conteúdo
    container.innerHTML = '';
    
    // Recria o conteúdo com os valores atualizados
    container.appendChild(
      createElement('div', { className: 'deposits-container' }, [
        // Painel de informações
        createElement('div', { className: 'card' }, [
          createElement('div', { className: 'deposits-header' }, [
            createElement('h2', {}, 'Controle de Depósitos'),
            createElement('div', { className: 'deposits-header-buttons' }, [
              renderButton({
                children: 'Reiniciar',
                variant: 'secondary',
                onClick: () => initiateAction('reset')
              }),
              renderButton({
                children: 'Sair do exercício',
                variant: 'danger',
                onClick: () => initiateAction('logout')
              })
            ])
          ]),
          
          // Barra de progresso
          createElement('div', { className: 'progress-bar' }, [
            createElement('div', { 
              className: 'progress-bar-fill',
              style: `width: ${progress}%`
            })
          ]),
          
          // Informações de valores
          createElement('div', { className: 'deposits-stats' }, [
            createElement('div', { className: 'stat-card' }, [
              createElement('p', { className: 'stat-label' }, 'Total Depositado'),
              createElement('p', { className: 'stat-value' }, `R$ ${totalDeposited.toFixed(2)}`)
            ]),
            createElement('div', { className: 'stat-card' }, [
              createElement('p', { className: 'stat-label' }, 'Falta Depositar'),
              createElement('p', { className: 'stat-value' }, `R$ ${(TOTAL_AMOUNT - totalDeposited).toFixed(2)}`)
            ])
          ])
        ]),
        
        // Grade de depósitos
        createElement('div', { className: 'deposits-grid' }, 
          deposits.map(deposit => {
            const buttonClass = deposit.marked 
              ? 'deposit-item marked' 
              : deposit.removing 
                ? 'deposit-item removing' 
                : 'deposit-item';
            
            const depositButton = createElement('button', {
              className: buttonClass,
              onClick: () => handleDeposit(deposit)
            }, [
              document.createTextNode(deposit.id)
            ]);
            
            // Adiciona tooltip apenas se houver data
            if (deposit.date || deposit.removalDate) {
              const tooltipText = deposit.marked 
                ? `Depositado em: ${new Date(deposit.date).toLocaleDateString()}` 
                : deposit.removing && deposit.removalDate 
                  ? `Retirado em: ${new Date(deposit.removalDate).toLocaleDateString()}` 
                  : '';
              
              const tooltip = createElement('div', { 
                className: 'deposit-tooltip' 
              }, tooltipText);
              
              depositButton.appendChild(tooltip);
            }
            
            return depositButton;
          })
        ),
        
        // Modal de confirmação com senha
        showPasswordModal ? renderModal({
          title: actionType === 'reset' 
            ? 'Confirmar Reinício' 
            : actionType === 'logout' 
              ? 'Confirmar Saída do Exercício' 
              : 'Confirmar Remoção do Depósito',
          message: 'Digite sua senha para confirmar esta ação',
          isOpen: showPasswordModal,
          onClose: () => {
            showPasswordModal = false;
            password = '';
            error = '';
            selectedDeposit = null;
            updatePage();
          },
          onConfirm: handlePasswordSubmit,
          children: [
            renderInput({
              type: 'password',
              value: password,
              onChange: (e) => { 
                password = e.target.value;
                // Não chama updatePage() aqui para evitar problemas de renderização
              },
              placeholder: 'Sua senha',
              error: error
            })
          ]
        }) : null
      ])
    );
  };
  
  const handleDeposit = (deposit) => {
    if (deposit.marked) {
      // Se o depósito já está marcado, pede senha para remover
      selectedDeposit = deposit.id;
      actionType = 'remove';
      showPasswordModal = true;
      password = '';
      error = '';
    } else {
      // Se o depósito não está marcado, adiciona diretamente
      deposits = deposits.map(d => {
        if (d.id === deposit.id) {
          return {
            ...d,
            marked: true,
            date: new Date().toISOString(),
            removing: false,
            removalDate: ''
          };
        }
        return d;
      });
      
      saveDeposits(user.username, deposits);
    }
    
    updatePage();
  };
  
  const handlePasswordSubmit = () => {
    const storedPassword = localStorage.getItem(user.username);
    
    if (storedPassword === password) {
      if (actionType === 'reset') {
        // Reinicia todos os depósitos
        deposits = deposits.map(d => ({
          ...d,
          marked: false,
          date: '',
          removing: false,
          removalDate: ''
        }));
        
        saveDeposits(user.username, deposits);
      } else if (actionType === 'logout') {
        // Redireciona para a página inicial sem fazer logout
        navigateTo('home');
        return;
      } else if (actionType === 'remove' && selectedDeposit) {
        // Remove um depósito específico
        deposits = deposits.map(d => {
          if (d.id === selectedDeposit) {
            return {
              ...d,
              marked: false,
              removing: true,
              removalDate: new Date().toISOString()
            };
          }
          return d;
        });
        
        saveDeposits(user.username, deposits);
      }
      
      showPasswordModal = false;
      password = '';
      error = '';
      selectedDeposit = null;
    } else {
      error = 'Senha incorreta';
    }
    
    updatePage();
  };
  
  const initiateAction = (type) => {
    actionType = type;
    showPasswordModal = true;
    password = '';
    error = '';
    
    updatePage();
  };
  
  const container = createElement('div', { className: 'max-w-4xl mx-auto space-y-8' });
  updatePage();
  
  return renderLayout(container, user);
}