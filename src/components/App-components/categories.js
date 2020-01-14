import React, { Component } from 'react';
import { Form, Collapse, Button } from 'react-bootstrap';
import { FaAlignJustify } from "react-icons/fa"


class Categories extends Component {
    render() {
        return (
            <section className="col-12 px-0" id="Categories" >
                <div className="container col-9 shadow-sm border rounded p-3 pb-5">
                    <div>
                        <h5 className="text-secondary">Movie Data</h5>
                    </div>
                    {this.state.categories.length && this.state.categories.map((category, i) =>
                        <div className="my-3" key={i}>
                            <div className="col-12 px-2 py-2 bg-info text-white pointer"
                                onClick={() => this.state.open !== i ? this.setState({ open: i }) : this.setState({ open: null })}
                                aria-controls="movie-details"
                                aria-expanded={this.state.open}>
                                <FaAlignJustify />
                                <span className="mx-2">{category.name}</span>
                            </div>

                            <div className="d-flex justify-content-center mx-2">
                                <Collapse in={this.state.open === i}>
                                    <div id="movie-details" className="col-12 p-2 bg-light">
                                        <div className="d-flex mx-2">
                                            <div>
                                                <p>name:</p>
                                            </div>
                                            <div className="px-2">
                                                <p>{category.name}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Form onSubmit={e => { e.preventDefault(); }} className="col-9 px-2 d-flex mt-3">
                                                <div>
                                                    <Form.Group controlId="movieEnglishName">
                                                        <Form.Label>English Name</Form.Label>
                                                        <Form.Control value={this.state.form.name} onChange={e => this.setState({ form: { ...this.state.form, name: e.target.value } })} type="text" placeholder="English Name *" />
                                                    </Form.Group>

                                                    <Form.Group controlId="movieDescription">
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control value={this.state.form.description} onChange={e => this.setState({ form: { ...this.state.form, description: e.target.value } })} as="textarea" rows="3" placeholder="Description" />
                                                    </Form.Group>
                                                </div>

                                                <div className="d-flex align-items-end mb-3 mx-3">
                                                    <Button onClick={this.submit.bind(this, category.name)} variant="info" type="button">
                                                        Create Movie
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                        {category.movies.length && category.movies.map((movie, i) =>
                                            <div className="overflow-hidden my-3" key={i}>
                                                <div className="col-12 d-flex justify-content-between mx-2 px-2 py-3 bg-secondary text-white">
                                                    <div className="d-flex align-items-center">
                                                        <FaAlignJustify />
                                                        <span className="mx-2">{movie.name}</span>
                                                    </div>
                                                    <div className="movieBtn px-2">
                                                        <Button variant="warning" className="px-4 mx-2">Edit</Button>
                                                        <Button variant="danger" className="px-4 mx-2">Delete</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {!category.movies.length &&
                                            <div className="bg-light text-center py-2">there is no movies</div>
                                        }
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    )}
                    {!this.state.categories.length &&
                        <div className="bg-light text-center py-2">there is no category</div>
                    }
                </div>
            </section >
        )
    }

    // DATA
    state = {
        form: {
            id: '',
            name: '',
            description: '',
            rate: 4.0
        },
        categories: [],
        open: null
    }

    // METHODS
    submit(categoryName) {

        if (!this.state.form.name) return
        this.state.categories.forEach(category => {
            if (category.name === categoryName) {
                category.movies.push({ ...this.state.form, id: this.state.categories.length })
            }
        })
        localStorage.setItem('database', JSON.stringify(this.state.categories))

        this.setState({
            categories: this.state.categories
        })
        this.clear()
    }

    clear() {
        this.setState({
            form: {
                ...this.state.form,
                id: '',
                name: '',
                description: '',
                rate: 4.0
            }
        })
    }

    // lifeCycle Hooks
    componentDidMount() {
        //lets pretend as GET request and save it in variable response ^_^
        let response = JSON.parse(localStorage.getItem('database'))
        this.setState({ categories: response.categories })
    }
}

export default Categories;
