import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CupcakeForm from '../shared/CupcakeForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditCupcakeModal = (props) => {
    const { user, show, handleClose, updateCupcake, msgAlert, triggerRefresh } = props
    const [cupcake, setCupcake] = useState(props.cupcake)

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
        updateCupcake(user, cupcake)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateCupcakeSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CupcakeForm 
                    cupcake={cupcake}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Cupcake"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCupcakeModal