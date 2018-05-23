import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import capitalize from 'capitalize'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'

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
                    onPress={this.onSubmit} />
      </View>
    )
  }

  onSubmit = () => {
    let { text } = this.state
    text = text.trim()
    Storage.addDeck(text)
      .then(() => {
        return this.props.navigation.state.params.callback()
      })
      .then(() => {
        return this.props.navigation.goBack()
      })
  }
}