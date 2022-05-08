import { useGlobal } from "../hooks";

const Modal = () => {
    const { content, modal } = useGlobal();
    return (
        <>
            {
                modal &&
                <div className="fixed inset-0 z-20 bg-gray-500 bg-opacity-50 overflow-y-auto flex justify-center items-center">
                    {content}
                </div>
            }
        </>
    );
}

export default Modal;