import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    isModalOpen1: boolean;
    openModal1: () => void;
    closeModal1: () => void;
    isModalOpen2: boolean;
    openModal2: () => void;
    closeModal2: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const openModal1 = () => setIsModalOpen1(true);
    const closeModal1 = () => setIsModalOpen1(false);
    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    return (
        <ModalContext.Provider value={{ isModalOpen1, openModal1, closeModal1, isModalOpen2, openModal2, closeModal2 }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
