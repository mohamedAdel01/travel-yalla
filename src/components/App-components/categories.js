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
                    {this.props.categories && this.props.categories.length && this.props.categories.map((category, c_i) =>
                        <div className="my-3" key={c_i}>
                            <div className="col-12 px-2 py-2 bg-info text-white pointer"
                                onClick={() => this.state.open !== c_i ? this.setState({ open: c_i }) : this.setState({ open: null })}
                                aria-controls="movie-details"
                                aria-expanded={this.state.open}>
                                <FaAlignJustify />
                                <span className="mx-2">{category.name}</span>
                            </div>

                            <div className="d-flex justify-content-center mx-2">
                                <Collapse in={this.state.open === c_i}>
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
                                            <Form onSubmit={e => { e.preventDefault(); }} className="col-12 px-2 d-flex mt-3">
                                                <div className="col-6 px-0">
                                                    <Form.Group controlId={'movieEnglishName' + c_i}>
                                                        <Form.Label>English Name</Form.Label>
                                                        <Form.Control value={this.state.form.name} onChange={e => this.setState({ form: { ...this.state.form, name: e.target.value } })} type="text" placeholder="English Name *" />
                                                    </Form.Group>

                                                    <Form.Group controlId={'movieDescription' + c_i}>
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control value={this.state.form.description} onChange={e => this.setState({ form: { ...this.state.form, description: e.target.value } })} as="textarea" rows="3" placeholder="Description" />
                                                    </Form.Group>
                                                </div>

                                                <div className="d-flex align-items-end mb-3 mx-3">
                                                    <Button className={this.state.editState ? 'hidden' : ''} onClick={() => this.submit(category.id)} variant="info" type="button">
                                                        Create Movie
                                                    </Button>
                                                    <Button className={!this.state.editState ? 'hidden' : ''} onClick={() => this.edit(category.id, c_i)} variant="info" type="button">
                                                        Edit Movie
                                                    </Button>
                                                    <Button className={[!this.state.editState ? 'hidden' : '', 'mx-2']} onClick={() => this.clear()} variant="danger" type="button">
                                                        cancle
                                                    </Button>

                                                </div>
                                            </Form>
                                        </div>
                                        {category.movies && category.movies.length && category.movies.map((movie, m_i) =>
                                            <div className="overflow-hidden my-3" key={m_i}>
                                                <div className="col-12 d-flex justify-content-between mx-2 px-2 py-3 bg-secondary text-white">
                                                    <div className="d-flex align-items-center">
                                                        <FaAlignJustify />
                                                        <span className="mx-2">{movie.name}</span>
                                                    </div>
                                                    <div className="movieBtn px-2">
                                                        <Button onClick={() => this.openEditMode(c_i,movie)} variant="warning" className="px-4 mx-2">Edit</Button>
                                                        <Button onClick={() => this.delete(c_i,movie.id)} variant="danger" className="px-4 mx-2">Delete</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {category.movies && !category.movies.length &&
                                            <div className="bg-light text-center py-2">there is no movies</div>
                                        }
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    )}
                    {this.props.categories && !this.props.categories.length &&
                        <div className="bg-light text-center py-2">there is no category</div>
                    }
                </div>
            </section >
        )
    }

// ===== DATA =====
    constructor(props){
        super(props);
        this.state = {
            form: {
                id: '',
                name: '',
                description: '',
                rate: 4.0
            },
            editState: false,
            open: null,
            movieToEdit: null
        }
    }

// ====== METHODS ======
    submit(c_id) {

        if (!this.state.form.name) return
        this.props.categories.forEach(category => {
            if (category.id === c_id) {
                category.movies.unshift({ ...this.state.form, id: Math.random() })
                return
            }
        })

        this.props.updateCategories(this.props.categories)

        this.clear()
    }

    delete(c_i,id) {        
        let newCategories = this.props.categories
        newCategories[c_i].movies = this.props.categories[c_i].movies.filter(movie => movie.id !== id)

        this.props.updateCategories(newCategories)
        this.clear()
    }

    edit(c_id, c_i) {        
        this.delete(c_i, this.state.movieToEdit.id)
        this.submit(c_id)
    }

    openEditMode(c_i, movie) {
        this.setState({
            form: {
                id: movie.id,
                name: movie.name,
                description: movie.description,
                rate: movie.rate
            },
            editState: true,
            movieToEdit: movie
        })
    }

    clear() {
        this.setState({
            form: {
                ...this.state.form,
                id: '',
                name: '',
                description: '',
                rate: 4.0
            },
            editState: false
        })
    }

}

export default Categories;
