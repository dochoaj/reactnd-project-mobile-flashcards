import React, { Component } from 'react'
import LiteDeck from './LiteDeck'
import { View, Text, FlatList } from 'react-native'

class DeckList extends Component {
  render() {
    return (
      <View>
        <FlatList data={Object.keys(this.props.decks)}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({item}) => <LiteDeck {...this.props.decks[item]}/>}/>
      </View>
    )
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