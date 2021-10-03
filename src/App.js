import "./App.css";

import UnsplashGallery from "./components/UnsplashGallery.js";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      currentTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({currentTerm: this.state.searchTerm});
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>🖼️ Unsplash vyhledávač</h1>
          <div className="intro-text">
            <p>
              Jednoduchá <em>React</em> aplikace, která slouží pro vyhledávání
              obrázků na platformě <em>Unsplash</em>, na které jsou k dispozici
              volně dostupné obrázky.
            </p>
            <p>
              Do <em>vyhledávacího pole</em> zadejte jakýkoliv termín a služba
              vám vypíše obrázky dostupné pod tímto textem.
            </p>
          </div>

          <form action="#" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="search"
              className="search form-field"
              placeholder="brown cat"
              onChange={this.handleChange}
            />
            <button type="submit" className="button form-field">
              Odeslat
            </button>
          </form>
        </div>

        <UnsplashGallery currentTerm={this.state.currentTerm} />
      </div>
    );
  }
}

export default App;
