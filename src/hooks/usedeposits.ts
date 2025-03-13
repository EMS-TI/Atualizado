import { useState, useEffect } from 'react';
import { getDeposits, saveDeposits, calculateTotal, TOTAL_REQUIRED } from '../lib/deposits';
import type { Deposit } from '../types';

export function useDeposits(username: string) {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadedDeposits = getDeposits(username);
    setDeposits(loadedDeposits);
    setTotal(calculateTotal(loadedDeposits));
  }, [username]);

  const toggleDeposit = (id: number) => {
    const newDeposits = deposits.map((deposit) =>
      deposit.id === id
        ? {
            ...deposit,
            marked: !deposit.marked,
            date: !deposit.marked ? new Date().toISOString() : '',
          }
        : deposit
    );

    setDeposits(newDeposits);
    saveDeposits(username, newDeposits);
    setTotal(calculateTotal(newDeposits));
  };

  const resetDeposits = () => {
    const newDeposits = deposits.map((deposit) => ({
      ...deposit,
      marked: false,
      date: '',
    }));

    setDeposits(newDeposits);
    saveDeposits(username, newDeposits);
    setTotal(0);
  };

  return {
    deposits,
    total,
    remaining: TOTAL_REQUIRED - total,
    progress: (total / TOTAL_REQUIRED) * 100,
    toggleDeposit,
    resetDeposits,
  };
}