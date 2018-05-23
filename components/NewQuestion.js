import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'

export default class NewDeck extends Component {
  state = {
    question: '',
    answer: ''
  }

  render() {
    return (
      <View>
        <Text>Question:</Text>
        <TextInput value={this.state.question}
                   onChangeText={(question) => this.setState({ question })} />
        <Text>Answer:</Text>
        <TextInput value={this.state.question}
                   onChangeText={(answer) => this.setState({ answer })} />
        <TextButton text='Submit'
                    onPress={() => console.log(this.state)} />
      </View>
    )
  }
}