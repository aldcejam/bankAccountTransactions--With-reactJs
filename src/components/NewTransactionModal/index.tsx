import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles'

import CloseImage from "../../assets/close.svg";
import upImage from "../../assets/arrow-up.svg";
import downImage from "../../assets/arrow-down.svg"
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTransactions()

    const [transactionTitle, setTransactionTitle] = useState('')
    const [transactionAmount, setTransactionAmount] = useState(Number)
    const [transactionCategory, setTransactionCategory] = useState('')
    const [TransactionType, setTransactionType] = useState('deposit')


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title: transactionTitle,
            amount: transactionAmount,
            category: transactionCategory,
            type: TransactionType

        })
        

        setTransactionTitle('');
        setTransactionAmount(0);
        setTransactionCategory('')
        setTransactionType('deposit')
        onRequestClose();

        
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <Container onSubmit={handleCreateNewTransaction}>
                <button type="button" className="closeModel" onClick={onRequestClose}>
                    <img className="closeModal" src={CloseImage} alt="fechar modal" />
                </button>
                <h2>cadastrar transação</h2>

                {/* ========= Input Title =========*/}
                <input
                    placeholder="Titulo"
                    value={transactionTitle}
                    onChange={event => setTransactionTitle(event.target.value)}
                />
                {/* ========= Input Title =========*/}

                {/* ========= Input VALUE =========*/}
                <input
                    type="number"
                    placeholder=" Valor"
                    value={transactionAmount}
                    onChange={event => setTransactionAmount(Number(event.target.value))}
                />
                {/* ========= Input VALUE =========*/}

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setTransactionType('deposit') }}
                        isActive={TransactionType === 'deposit'}
                        activeColor='green'
                    >
                        <img src={upImage} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => { setTransactionType('withdraw') }}
                        isActive={TransactionType === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={downImage} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>

                </TransactionTypeContainer>


                {/* ========= Input CATEGORY ========= */}
                <input
                    placeholder="Categoria"
                    value={transactionCategory}
                    onChange={event => setTransactionCategory(event.target.value)}
                />
                {/* ========= Input CATEGORY ========= */}
                <button type="submit">Cadastrar</button>

            </Container>

        </Modal>
    );
}
