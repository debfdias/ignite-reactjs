import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

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
        <>
            <Header onOpenNewTransactionModal={handleOpenTransaction}/>
            <Dashboard />
            <GlobalStyle />
            <NewTransactionModal 
                isOpen={isTransactionModalOpen}
                onRequestClose={handleCloseTransation}
            />
            
        </>
    );
}

export default App;
