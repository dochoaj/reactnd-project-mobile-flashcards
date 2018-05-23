import React, { Component } from 'react'
import LiteDeck from './LiteDeck'
import { View, Text, FlatList } from 'react-native'
import TextButton from './TextButton'

class DeckList extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const { decks } = nextProps
    return { ...prevState, decks }
  }

  render() {
    return (
      <View>
        <TextButton text='Create Deck'
                    onPress={this.onCreateDeckPress} />
        <FlatList data={Object.keys(this.state.decks)}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({item}) => (
                    <LiteDeck {...this.state.decks[item]}
                              id={item}
                              goToDeck={this.goToDeck} />
                  )}/>
      </View>
    )
  }

  goToDeck = (id) => {
    this.props.navigation.navigate('Deck', {
      ...this.state.decks[id], id,
      goToDeck: this.goToDeck,
      onCreateQuestion: this.onCreateQuestion
    })
  }

  onCreateDeckPress = () => {
    this.props.navigation.navigate('NewDeck', {
      onCreateDeck: this.onCreateDeck
    })
  }

  onCreateQuestion = (deckId, question, answer) => {
    const modified = {...this.state.decks[deckId]}
    modified.questions.push({ question, answer })

    this.setState((currState) => {
      return {
        decks: {...currState.decks, modified}
      }
    }, () => this.goToDeck(deckId))
  }

  onCreateDeck = (id, title) => {
    if (Object.keys(this.state.decks).includes(id)) {
      return false
    }

    const newDeck = {
      title, questions: []
    }

    this.setState((currState) => {
      return { decks: { ...currState.decks, [id]: newDeck } }
    }, () => this.goToDeck(id))
  }
}

DeckList.defaultProps = {
  decks: {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

export default DeckList