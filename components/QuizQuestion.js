import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import TextButton from './TextButton'

export default class QuizQuestion extends Component {
  state = {
    showAnswer: false
  }

  render() {
    return (
      <View>
        <Text>{this.props.index + 1}/{this.props.total}</Text>
        { this.state.showAnswer ? this.renderAnswer() : this.renderQuestion() }
        <View>
          <TextButton text='Correct'
                      onPress={this.props.onCorrect}/>
          <TextButton text='Incorrect'
                      onPress={this.props.onIncorrect} />
        </View>
      </View>
    )
  }

  renderQuestion() {
    return (
      <View>
        <Text>{this.props.question.question}</Text>
        <TouchableOpacity onPress={this.onAnswerTogglePress}>
          <Text>Answer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAnswer() {
    return (
      <View>
        <Text>{this.props.question.answer}</Text>
        <TouchableOpacity onPress={this.onQuestionTogglePress}>
          <Text>Question</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onQuestionTogglePress = () => {
    this.setState({ showAnswer: false })
  }

  onAnswerTogglePress = () => {
    this.setState({ showAnswer: true })
  }

  onCorrect = () => {
    this.props.onCorrect()
  }

  onIncorrect = () => {
    this.props.onIncorrect()
  }
}