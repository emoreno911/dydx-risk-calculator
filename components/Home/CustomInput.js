const CustomInput = ({name, label, placeholder, unit, value, onChange}) => {
	return (
		<div className="mb-2">
			<label className="block text-white">{label}</label>
			<div className="flex flex-wrap items-stretch w-full mt-1 relative">
				<input 
					type="number" 
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={evt => onChange(evt.currentTarget.value)}
					className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 h-10 rounded-lg rounded-r-none px-3 relative bg-color-dark text-white font-bold" 
				/>
				<div className="flex">
					<button className="flex items-center leading-normal rounded-l-none px-3 whitespace-no-wrap text-sm w-16 h-10 justify-center items-center text-md font-bold rounded-lg bg-color-alt text-gray-100">
						{unit}
					</button>
				</div>
			</div>
		</div>
	)
}

export default CustomInput