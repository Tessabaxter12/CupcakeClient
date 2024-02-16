import CupcakesIndex from './cupcakes/CupcakesIndex'

const Home = (props) => {
	const { msgAlert } = props

	return (
		<>
			<h2>Welcome To The Cupcake App</h2>
			<CupcakesIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
