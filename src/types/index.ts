/**
 * Definições de tipos para a aplicação
 * 
 * Este arquivo contém interfaces que definem a estrutura dos dados
 * utilizados em toda a aplicação.
 */

/**
 * Representa um usuário da aplicação
 */
export interface User {
  username: string;
  isLoggedIn: boolean;
}

/**
 * Representa um depósito
 */
export interface Deposit {
  id: number;
  amount: number;
  date: string;
  marked: boolean;
  removing?: boolean;
  removalDate?: string;
}

/**
 * Propriedades do componente Button
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Propriedades do componente Input
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Propriedades do componente Layout
 */
export interface LayoutProps {
  children: React.ReactNode;
}