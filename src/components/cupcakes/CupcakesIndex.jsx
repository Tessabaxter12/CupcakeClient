import {useState, useEffect} from 'react'
import { getAllCupcakes } from "../../api/cupcakes"
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const CupcakesIndex = (props) => {
    const [cupcakes, setCupcakes] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props
	useEffect(() => {
		getAllCupcakes()
			.then(res => {
				console.log('use Effect hook ran')
				setCupcakes(res.data.cupcakes)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                setError(true)
            })
	}, [])
    if (error) {
        return <LoadingScreen />
    }
    if (!cupcakes) {
        return <LoadingScreen />
    } else if (cupcakes.length === 0) {
        return <p>No cupcakes yet, go add some!</p>
    }
    const cupcakeCards = cupcakes.map(cupcake => (
        <Card key={cupcake.id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{cupcake.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/cupcakes/${cupcake.id}`} className='btn btn-info'>
                        View {cupcake.name}
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { cupcakeCards }
        </div>
    )
}


export default CupcakesIndex