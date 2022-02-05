import { Container } from "./styles";
import iconsImg from '../../assets/arrow-up.svg';
import outcomeImg from '../../assets/arrow-down.svg';
import totalImg from '../../assets/dollar-sign.svg';
import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";


export function Summary() {
    const { transactions } = useTransactions()

    const summary = transactions.reduce((acc, transaction) => {

        if (transaction.type === 'deposit') {
            acc.deposit += transaction.amount
            acc.total += transaction.amount
        } else {
            acc.withdraw += transaction.amount
            acc.total -= transaction.amount
        }


        return acc;
    }, {
        deposit: 0,
        withdraw: 0,
        total: 0
    })


    return (
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <img src={iconsImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.deposit)}</strong>
            </div>
            <div>
                <header>
                    <p>Saida</p>
                    <img src={outcomeImg} alt="saidas" />
                </header>
                <strong>- {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.withdraw)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Saldo</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.total)}</strong>
            </div>
        </Container>
    )

}