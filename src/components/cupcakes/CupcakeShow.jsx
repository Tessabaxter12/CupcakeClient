import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneCupcake, removeCupcake, updateCupcake } from '../../api/cupcake'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditCupcakeModal from './EditCupcakeModal'

// sets a style object for our toy card container
const toyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CupcakeShow = (props) => {
    const { cupcakeId } = useParams()
    const { user, msgAlert } = props

    const [cupcake, setCupcake] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [toyModalShow, setToyModalShow] = useState(false)

    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getOneCupcake(cupcakeId)
            .then(res => setCupcake(res.data.cupcake))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])

    const setCupcakeFree = () => {
        removeCupcake(user, cupcake._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteCupcakeSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }
    if (!cupcake) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card key={cupcake._id}>
                    <Card.Header>
                        { cupcake.name }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Quanity: {cupcake.quanity}</small><br/>
                            <small>
                                Purchase: {cupcake.purcahse ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            cupcake.owner && user && cupcake.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Cupcake
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => setCupcakeFree()}
                                >
                                    Set Cupcake Free
                                </Button>
                            </>
                            :
                            null
                        }
                        <br/>
                        {
                            cupcake.owner ? `owner: ${cupcake.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditCupcakeModal 
                user={user}
                show={editModalShow}
                updatePet={updateCupcake}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                cupcake={cupcake}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}
export default CupcakeShow