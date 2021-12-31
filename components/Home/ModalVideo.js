// https://youtu.be/f_1hxIol2uM

import { useState } from "react"
import Modal from "./ModalControlled"

const ModalVideo = ({}) => {
	const [show, setShow] = useState(false)

	return (
		<Modal
			show={show}
			handleShow={setShow}
			activator={({ handleShow }) => (
				<button 
					type="button" 
					className="font-semibold text-white focus:outline-none"
					onClick={() => handleShow(true)}
				>
					<div>
						<span>How to use</span> 
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
						</svg>
					</div>
				</button>
			)}
		>
			{
				show && 
				<iframe 
					className="modal-iframe"
					src={`https://www.youtube.com/embed/f_1hxIol2uM?enablejsapi=1`}
					title="YouTube video player" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					allowFullScreen=""
				/>
			}
		</Modal>
	)
}

export default ModalVideo