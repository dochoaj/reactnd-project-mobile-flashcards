import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'

export default class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { deckId, callback } = nextProps.navigation.state.params

    return { ...prevState, deckId, callback }
  }

  render() {
    return (
      <View>
        <Text>Question:</Text>
        <TextInput value={this.state.question}
                   onChangeText={(question) => this.setState({ question })} />
        <Text>Answer:</Text>
        <TextInput value={this.state.answer}
                   onChangeText={(answer) => this.setState({ answer })} />
        <TextButton text='Submit'
                    onPress={this.onSubmitPress} />
      </View>
    )
  }

  onSubmitPress = () => {
    const { deckId, question, answer } = this.state
    Storage.addCard(deckId, { question, answer })
      .then(() => {
        this.state.callback()
      })
  }
}