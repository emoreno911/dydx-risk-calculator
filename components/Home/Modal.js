import React, { useState } from "react"
import ReactDOM, { createPortal } from 'react-dom'

const Modal = ({ children, activator, addBackdrop = true }) => {
  const [show, setShow] = useState(false)

  const content = (
    <div className={`modal-window ${show ? 'open' : ''}`}>
      { addBackdrop && <div className="modal-backdrop" onClick={() => setShow(false)}></div> }
			<div className="max-w-xl max-h-screen overflow-auto">
				<button title="Close" className="modal-close noselect" onClick={() => setShow(false)}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				{
					children
				}
			</div>
		</div>
  )

  return (
    <>
      {activator({ setShow })}
      {createPortal(
        content,
        window.document.body
      )}
    </>
  )
}

export default Modal