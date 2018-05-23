import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'

export default class NewDeck extends Component {
  state = {
    text: ''
  }

  render() {
    return (
      <View>
        <Text>What is the title of your new Deck?</Text>
        <TextInput value={this.state.text}
                   onChangeText={(text) => this.setState({ text })} />
        <TextButton text='Submit'
                    onPress={() => console.log(this.state)} />
      </View>
    )
  }
}