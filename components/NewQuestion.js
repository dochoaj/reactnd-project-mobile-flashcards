import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'

export default class NewDeck extends Component {
  state = {
    question: '',
    answer: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { id, onCreateQuestion } = nextProps.navigation.state.params

    return {
      ...prevState, id, onCreateQuestion
    }
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
    const { id, question, answer, onCreateQuestion } = this.state

    onCreateQuestion(id, question, answer)
  }
}