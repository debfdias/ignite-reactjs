import { useState } from "react";
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from './hooks/TransactionsContext';

import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root"); 

function App() {
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

    function handleOpenTransaction() {
        setIsTransactionModalOpen(true);
    }

    function handleCloseTransation(){
        setIsTransactionModalOpen(false);
    }
    
    return (
        <TransactionProvider>
            <Header onOpenNewTransactionModal={handleOpenTransaction}/>
            <Dashboard />
            <GlobalStyle />
            <NewTransactionModal 
                isOpen={isTransactionModalOpen}
                onRequestClose={handleCloseTransation}
            />
            
        </TransactionProvider>
    );
}

export default App;
