import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { create, buttonText, uiText, correct } from '../utils/colors'

export default class QuizResult extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.results}>
          <Text style={styles.resultText}>Correct: {this.props.correct}</Text>
          <Text style={styles.resultText}>Incorrect: {this.props.incorrect}</Text>
          <Text style={styles.resultText}>Ratio: {this.props.correct / this.props.questions.length}</Text>
        </View>
        <View style={styles.controls}>
          <TextButton text='Start Over'
                      style={{ width: 200, marginBottom: 10 }}
                      bgColor={correct}
                      textColor={buttonText}
                      onPress={this.props.startOver} />
          <TextButton text='View Deck'
                      style={{ width: 200, marginBottom: 10 }}
                      bgColor={create}
                      textColor={buttonText}
                      onPress={this.props.viewDeck} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  controls: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 24,
    color: uiText
  }
})