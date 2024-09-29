const getDate = () => {
	const date = new Date()

	let hours = 0
	const minutes = date.getMinutes().toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping: false})

	if (date.getHours() > 12) {
		hours = `${date.getHours() - 12}:${minutes} PM`
	} else if (date.getHours() === 12) {
		hours = `${date.getHours()}:${minutes} PM`
	} else {
		date.getHours() === 12 ? (hours = `12:${minutes} AM`) : (hours = `${date.getHours()}:${minutes} AM`)
	}
	const day = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
	return {time: hours, date: day}
}

export default getDate
