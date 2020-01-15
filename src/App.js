import React, { Component } from 'react';
import AddCategory from './components/App-components/addCategory'
import Categories from './components/App-components/categories'


class App extends Component {
  render() {
    return (
      <section id="App" className="d-flex flex-wrap justify-content-center">
        <AddCategory categories={this.state.categories} updateCategories={this.updateCategories}/>
        <Categories categories={this.state.categories} updateCategories={this.updateCategories}/>
      </section>
    )
  }

  // ===== DATA =====
  constructor(props){
    super(props);
    this.state = {
        categories: []
    }
  }

  // ====== METHODS ======
  updateCategories = (newCategories) => {
    this.setState({categories: newCategories})
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

export default App;
