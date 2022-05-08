const { createContext, useState } = require("react");


const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {

    const [toast, setToast] = useState(false);
    const [message, setMessage] = useState(null);
    const [modal, setModal] = useState(false);
    const [content, setContent] = useState(null);

    const openModal = (content) => {
        setContent(content);
        setModal(true);
    }

    const closeModal = () => {
        setContent(null);
        setModal(false)
    }

    const openToast = (message) => {
        setMessage(message);
        setToast(true);
        setTimeout(closeToast, 3000);
    }

    const closeToast = () => {
        setMessage(null);
        setToast(false);
    }

    const value = {
        toast, message, modal, content, openToast, closeToast, openModal, closeModal
    }
    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider }