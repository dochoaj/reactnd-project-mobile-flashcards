import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { AppLoading } from 'expo'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'

class Deck extends Component {
  state = {
    deck: {},
    loading: true
  }

  static getDerivedStateFromProps(nextProps) {
    const { id, goToDeck } = nextProps.navigation.state.params
    return { id, goToDeck }
  }

  componentDidMount() {
    this.fetchDeck()
  }

  fetchDeck = () => {
    this.setState({ loading: true })

    return Storage.getDeck(this.state.id)
      .then((deck) => {
        console.log(deck)
        this.setState({ deck, loading: false })
      })
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>{this.state.deck.title}</Text>
        <Text>{this.state.deck.questions.length} Cards</Text>
        <TextButton text='Start Quiz' onPress={this.onStartQuizPress} />
        <TextButton text='Add Question' onPress={this.onAddQuestionPress} />
      </View>
    )
  }

  onStartQuizPress = () => {
    this.props.navigation.navigate('Quiz', {
      deck: this.state.deck.title,
      questions: this.state.deck.questions,
      id: this.state.id,
      goToDeck: this.state.goToDeck
    })
  }

  onAddQuestionPress = () => {
    const { title, id, goToDeck } = this.state

    this.props.navigation.navigate('NewQuestion', {
      deck: this.state.title, deckId: id, callback: this.addQuestionCallback
    })
  }

  addQuestionCallback = () => {
    this.fetchDeck()
      .then(() => {
        this.state.goToDeck(this.id)
      })
  }
}

export default Deck