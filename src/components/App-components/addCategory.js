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
                        <Form onSubmit={e => { e.preventDefault(); }} className="col-6 px-2">
                            <Form.Group controlId="englishName">
                                <Form.Label>English Name</Form.Label>
                                <Form.Control value={this.state.form.name} onChange={e => this.setState({ form: { ...this.state.form, name: e.target.value } })} type="text" placeholder="English Name *" />
                            </Form.Group>

                            <Button onClick={() => this.create()} variant="info" type="button">
                                Create Category
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>
        )
    }

    // ===== DATA =====
    constructor(props){
        super(props);
        this.state = {
            form: {
                id: Math.random(),
                name: '',
                movies: []
            }
        }
    }

    // ===== METHODS =====
    create() {
        this.props.categories.unshift(this.state.form)
        this.props.updateCategories(this.props.categories)
    }
}

export default addCategory;
