import React, { Component } from 'react'
import { View, Text } from 'react-native'
import TextButton from './TextButton'

export default class QuizResult extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>Correct: {this.props.correct}</Text>
          <Text>Incorrect: {this.props.incorrect}</Text>
          <Text>Ratio: {this.props.correct / this.props.questions.length}</Text>
        </View>
        <View>
          <TextButton text='Start Over'
                      onPress={this.props.startOver} />
          <TextButton text='View Deck'
                      onPress={this.props.viewDeck} />
        </View>
      </View>
    )
  }
}