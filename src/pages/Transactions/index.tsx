import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionContext } from "../../contexts/TransactionsContext";
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