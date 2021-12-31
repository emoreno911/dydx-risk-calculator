import React from "react"
import ReactDOM, { createPortal } from 'react-dom'

const ModalControlled = ({ children, activator, show, handleShow, addBackdrop = false }) => {
  const content = (
    <div className={`modal-window ${show ? 'open' : ''}`}>
      { addBackdrop && <div className="modal-backdrop" onClick={() => handleShow(false)}></div> }
			<div className="">
				<button title="Close" className="modal-close noselect" onClick={() => handleShow(false)}>
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
      {activator({ handleShow })}
      {createPortal(
        content,
        window.document.body
      )}
    </>
  )
}

export default ModalControlled