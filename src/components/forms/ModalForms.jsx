
import { X } from 'lucide-react';
import { Overlay, ModalBox, ModalHeader, Close } from '../ui/dashboard-primitives';



export function Modal({ title, onClose, children }) {
  
  return <>
  <Overlay /* onClick={onClose} */>
    <ModalBox onClick={(event) => event.stopPropagation()}>
      <ModalHeader>
        <div>
          <Eyebrow> {title} </Eyebrow> 
          {/* <h2>{title}</h2> */}
        </div>

        <Close onClick={onClose}> <X size={20}/> </Close>
      
      </ModalHeader>
        {children}
      </ModalBox>
  </Overlay>
  </>
}

const Eyebrow = ({ children }) => 
  <div style={{ color: '#22d3ee', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>
    {children}
  </div>
