/**
 * Função utilitária para combinar classes CSS
 * 
 * Esta função combina várias classes CSS usando clsx e tailwind-merge
 * para evitar conflitos e duplicações.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina várias classes CSS
 * @param inputs Classes CSS a serem combinadas
 * @returns String com as classes combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}