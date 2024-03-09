
import { createContext, useEffect, useState } from "react";

interface Transaction {
    category: string;
    createdAt: string;
    description: string;
    id: number;
    price: number;
    type: 'income' | 'outcome';
}

interface TransactionContextType {
    transactions: Transaction[];
}

interface TransactionsProviderProps {
    children: React.ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);


export function TransactionProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    async function loadTransactions() {

        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();

        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, []);


    return (
        <TransactionContext.Provider value={{ transactions }}>
            {children}
        </TransactionContext.Provider>

    )
};