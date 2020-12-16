import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchedPokemons: []
  }

  componentDidMount(){
    this.fetchPokemons()
  }

  fetchPokemons = () => {
    fetch(`http://localhost:3000/pokemon`)
    .then(res => res.json())
    .then(pokemon => this.setState({pokemons:pokemon}))
  }

  searched = (query) => {
    let filtered = this.state.pokemons.filter(poke => poke.name.includes(query))
    this.setState({searchedPokemons: filtered})
  }

  addPokemon = (newPoke) => {
    let pokeData = {
      "name": newPoke.name.value,
      "hp": newPoke.hp.value,
      "sprites": {
        "front": newPoke.frontUrl.value,
        "back": newPoke.backUrl.value
      }
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(pokeData)
    }

    fetch(`http://localhost:3000/pokemon`, configObj)
    .then(res => res.json())
    .then(addedPokemon => {
      this.setState(prevState => {
        return {
          pokemons: [addedPokemon, ...prevState.pokemons]
        }
      })
    })

  }

  render() {
    
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search searched={this.searched}/>
        <br />
        <PokemonCollection pokemons={this.state.searchedPokemons.length === 0 ? this.state.pokemons : this.state.searchedPokemons} />
      </Container>
    )
  }
}

export default PokemonPage
