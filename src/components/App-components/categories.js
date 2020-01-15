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
                    {this.state.categories && this.state.categories.length && this.state.categories.map((category, c_i) =>
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
                                                    <Button className={this.state.editState ? 'hidden' : ''} onClick={() => this.submit(category.name)} variant="info" type="button">
                                                        Create Movie
                                                    </Button>
                                                    <Button className={!this.state.editState ? 'hidden' : ''} onClick={() => this.edit(category.name, c_i)} variant="info" type="button">
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
                    {this.state.categories && !this.state.categories.length &&
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
            categories: [],
            editState: false,
            open: null,
            movieToEdit: null
        }
    }

// ====== METHODS ======
    submit(categoryName) {

        if (!this.state.form.name) return
        this.state.categories.forEach(category => {
            if (category.name === categoryName) {
                category.movies.unshift({ ...this.state.form, id: Math.random() })
            }
        })
        localStorage.setItem('database-adel-1/8', JSON.stringify(this.state.categories))

        this.setState({
            categories: this.state.categories
        })

        this.clear()
    }

    delete(c_i,id) {        
        let newCategories = this.state.categories
        newCategories[c_i].movies = this.state.categories[c_i].movies.filter(movie => movie.id !== id)
        this.setState({
            categories: newCategories
        })

        this.clear()
    }

    edit(categoryName, c_i) {        
        this.delete(c_i, this.state.movieToEdit.id)
        this.submit(categoryName)
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

// ====== lifeCycle Hooks ========
    componentDidMount() {
        //lets pretend as GET request and save it in variable response ^_^

        let response = {
            categories: [
              {
                id: 80877,
                name: 'Action',
                movies: [
                  {
                    id: 132548,
                    name: 'SPIDER-MAN 2 ',
                    description: 'Boasting an entertaining villain and deeper emotional focus, this is a nimble sequel that improves upon the original',
                    rate: '4.0'
                  },
                  {
                    id: 655881,
                    name: 'BATTLE ROYALE',
                    description: 'Battle Royale is a controversial and violent parable of adolescence, heightening teenage melodrama with life-or-death stakes.',
                    rate: '3.5'
                  },
                  {
                    id: 655882,
                    name: 'ESCAPE FROM NEW YORK',
                    description: 'Featuring an atmospherically grimy futuristic metropolis, Escape from New York is a strange, entertaining jumble of thrilling action and oddball weirdness.',
                    rate: '4.2'
                  },
                  {
                    id: 655883,
                    name: 'IRON MONKEY',
                    description: 'Iron Monkey may not have the poetic lyricism of Crouching Tiger, it makes up for it in fun and energy.',
                    rate: '3.8'
                  }
                ]
              },
              {
                id: 21281,
                name: 'Comedy',
                movies: [
                  {
                    id: 655880,
                    name: 'Juno',
                    description: 'The chemical equation of writer Diablo Cody plus director Jason Reitman explodes onscreen with this non-traditional family comedy showcasing Cody’s edgy contemporary dialogue.',
                    rate: '4.3'
                  },
                  {
                    id: 132570,
                    name: 'Shaun of the Dead',
                    description: 'This acerbic action comedy introduced a winning combo: sparring buddies Simon Pegg and Nick Frost and master of style Edgar Wright, who dreamed up the script with Pegg.',
                    rate: '4.1'
                  },
                  {
                    id: 132574,
                    name: 'Old School',
                    description: 'You’re my boy, Blue! Say what you will about the Frat Pack films that followed it, but “Old School” still gets a passing grade.',
                    rate: '2.4'
                  },
                  {
                    id: 164438,
                    name: 'Trainwreck',
                    description: 'Producer Judd Apatow steered breakout standup comic Amy Schumer to her smash big-screen debut ($141 million worldwide) by helping her to write a recognizably real woman to play — accessible, honest, emotional — within the genre confines of a mainstream romantic comedy.',
                    rate: '3.9'
                  }
                ]
              }
            ]
          }   
        this.setState({ categories: response.categories })
    }
}

export default Categories;
