import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../ultils/formatter";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {

    const { transactions } = useContext(TransactionContext)

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.length === 0 ? <p>Carregando...</p> : transactions.map(item => {
                            return (

                                <tr key={item.id}>
                                    <td width="50%">{item.description}</td>
                                    <td>
                                        <PriceHighlight variant={item.type}>
                                            <p>{item.type === 'outcome' && '-'}
                                                {item.type === 'income' && '+'}
                                            </p>
                                            <p>
                                                {priceFormatter.format(item.price)}
                                            </p>
                                        </PriceHighlight>
                                    </td>
                                    <td>{item.category}</td>
                                    <td>{dataFormatter.format(new Date(item.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}