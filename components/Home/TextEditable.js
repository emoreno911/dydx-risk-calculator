import { useEffect, useState } from "react"
import { toNumber } from "../utilities"

const TextEditable = ({ value, onChangeText }) => {
	const [text, setText] = useState("")

	useEffect(() => { setText(value) }, [])
	useEffect(() => { setText(value) }, [value])

	const handleChangeText = (evt) => {
		if (evt.keyCode === 13) {
			handleStoreText()
			evt.currentTarget.blur()
			return
		}
		
		setText(evt.currentTarget.value)
	}

	const handleStoreText = (evt) => {
		const newValue = text;
		const oldValue = value;

		if (newValue !== oldValue) 
			onChangeText(toNumber(text))
	}

	const handleEdit = (evt) => {
		evt.currentTarget.parentNode.querySelector('input').focus();
	}

	return (
		<div className="account-input-name">
			<input type="number"
				defaultValue={text}
				onKeyUp={handleChangeText}
				onBlur={handleStoreText}
			/>
			<label>Edit Collateral</label>
			<span>{text}</span>
			<button type="button" title="Edit Collateral" onClick={handleEdit}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
				</svg>
			</button>
		</div>
	)
}

export default TextEditable