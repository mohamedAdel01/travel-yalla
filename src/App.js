import React, { Component } from 'react';
import AddCategory from './components/App-components/addCategory'
import Categories from './components/App-components/categories'


class App extends Component {
  render() {
    return (
      <section id="App" className="d-flex flex-wrap justify-content-center">
        <AddCategory />
        <Categories />
      </section>
    )
  }
}

export default App;
