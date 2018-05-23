import React, { Component } from 'react'
import { View, Text } from 'react-native'
import TextButton from './TextButton'

class Deck extends Component {
  render() {
    <View>
      <Text>{this.props.title}</Text>
      <Text>{this.props.cards.length} Cards</Text>
      <TextButton text='Start Quiz' />
      <TextButton text='Add Question' />
    </View>
  }
}

export default Deck