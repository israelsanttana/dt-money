import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";


interface Transaction {
    category: string;
    createdAt: string;
    description: string;
    id: number;
    price: number;
    type: 'income' | 'outcome';
}
export function Transactions() {
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
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>

                        {transactions.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td width="50%">{item.description}</td>
                                    <td>
                                        <PriceHighlight variant={item.type}>
                                            {item.price}
                                        </PriceHighlight>
                                    </td>
                                    <td>{item.category}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}