import { Container, TransactionTypeContainer, RadioBox } from "./styles"
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useState } from "react";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface FormValues {
    title: string;
    value: number;
    category: string;
  }

type Type = "deposit" | "withdraw";

type FormObjectValue = "title" | "value" | "category";


export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [type, setType] = useState<Type>("deposit");
    const [values, setValues] = useState<FormValues>({
        title: "",
        category: "",
        value: 0
      });    
    
    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
    }

    function handleChange(prop: FormObjectValue, value: string | number) {
        setValues({ ...values, [prop]: value });
    }
    
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder="Título"
                    value={values.title}
                    onChange={e => handleChange("title", e.target.value)}
                />
                <input
                    placeholder="Valor"
                    type="number"
                    onChange={e => handleChange("value", Number(e.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === "deposit"}
                        activeColor="green"
                        onClick={() => setType("deposit")}
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        isActive={type === "withdraw"}
                        activeColor="red"
                        onClick={() => setType("withdraw")}
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder="Categoria"
                    onChange={e => handleChange("category", e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}