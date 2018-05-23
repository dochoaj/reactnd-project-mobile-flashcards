import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import capitalize from 'capitalize'
import TextButton from './TextButton'

export default class NewDeck extends Component {
  state = {
    text: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onCreateDeck } = nextProps.navigation.state.params

    return {
      ...prevState, onCreateDeck
    }
  }

  render() {
    return (
      <View>
        <Text>What is the title of your new Deck?</Text>
        <TextInput value={this.state.text}
                   onChangeText={(text) => this.setState({ text })} />
        <TextButton text='Submit'
                    onPress={() => {
                      let { text } = this.state
                      text = text.trim()
                      text && this.state.onCreateDeck(capitalize(text), text)
                    }} />
      </View>
    )
  }
}