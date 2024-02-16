import { Form, Button, Container } from 'react-bootstrap'

const CupcakeForm = (props) => {
    const { cupcake, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What type of cupcake is it?"
                        id="name"
                        name="name"
                        value={ cupcake.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Quanity: </Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How many cupcakes?"
                        id="quanity"
                        name="quanity"
                        value={ cupcake.quanity }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label="Do you want to purchase them?"
                        name="purchase"
                        defaultChecked={ cupcake.adoptable }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CupcakeForm 