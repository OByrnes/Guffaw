import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext()

export const useModalContext = () => useContext(ModalContext)
const customStyles = {
  content : {
    backgroundColor: "#4f5d75ff",
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function ModalProvider(props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  
  function openModal (){
    setIsOpen(true)
  }
  function closeModal(){
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ modalIsOpen, openModal, closeModal, customStyles}}>
      {props.children}
    </ModalContext.Provider>

  )
}