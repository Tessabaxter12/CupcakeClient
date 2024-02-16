import { useState } from 'react'
import CupcakeForm from '../shared/CupcakeForm'
import { useNavigate } from 'react-router-dom'
import { createCupcake } from '../../api/cupcake'
import messages  from '../shared/AutoDismissAlert/messages'

const CupcakesCreate = (props) => {
    const { user, msgAlert } = props

    const navigate = useNavigate()
    const [cupcake, setCupcake] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        e.persist()
            setCupcake(prevCupcake => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            const updatedCupcake = { [updatedName] : updatedValue }
            return {
                ...prevCupcake, ...updatedCupcake
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createCupcake(user, cupcake)
            .then(res => { navigate(`/cupcakes/${res.data.cupcake.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createCupcakeSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }
    return (
        <CupcakeForm
            cupcake={cupcake}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new cupcake!"
        />
    )
}

export default CupcakesCreate