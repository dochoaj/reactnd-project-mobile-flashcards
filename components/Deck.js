import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import shuffle from 'shuffle-array'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'
import { create, buttonText, uiText, correct } from '../utils/colors'

class Deck extends Component {
  state = {
    deck: {},
    loading: true
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    return {
      title: params.title
    }
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
        this.setState({ deck, loading: false })
      })
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.number}>{this.state.deck.questions.length} Card(s)</Text>
        </View>
        <View style={styles.controls}>
          <TextButton style={{marginBottom: 10}}
                      text='Start Quiz'
                      bgColor={correct}
                      textColor={buttonText}
                      onPress={this.onStartQuizPress} />
          <TextButton text='Add Card'
                      bgColor={create}
                      textColor={buttonText}
                      onPress={this.onAddQuestionPress} />
        </View>
      </View>
    )
  }

  onStartQuizPress = () => {
    this.props.navigation.push('Quiz', {
      deck: this.state.deck.title,
      questions: shuffle(this.state.deck.questions),
      id: this.state.id,
      goToDeck: this.state.goToDeck,
    })
  }

  onAddQuestionPress = () => {
    const { title, id, goToDeck } = this.state

    this.props.navigation.navigate('NewQuestion', {
      deck: this.state.title, deckId: id, callback: this.addQuestionCallback
    })
  }

  addQuestionCallback = () => {
    return this.state.goToDeck(this.state.id)
  }
}

const styles = StyleSheet.create({
  controls: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 2,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontSize: 32,
    color: uiText
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default Deck