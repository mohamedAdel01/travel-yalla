import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class addCategory extends Component {
    render() {
        return (
            <section className="m-4 col-12 px-0" id="addCategory">
                <div className="container col-9 shadow-sm border rounded p-3 pb-5">
                    <div>
                        <h5 className="text-secondary">Add Category</h5>
                    </div>
                    <div className="d-flex justify-content-center pt-4">
                        <Form className="col-6 px-2">
                            <Form.Group controlId="englishName">
                                <Form.Label>English Name</Form.Label>
                                <Form.Control type="text" placeholder="English Name *" />
                            </Form.Group>

                            <Button variant="info" type="submit">
                                Create Category
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>
        )
    }
}

export default addCategory;
