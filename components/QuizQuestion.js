import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { create, buttonText, uiText, correct, incorrect } from '../utils/colors'

export default class QuizQuestion extends Component {
  state = {
    showAnswer: false
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currentQuestion}>
          <Text style={{ fontSize: 20, color: uiText }}>Current: {this.props.index + 1}/{this.props.total}</Text>
        </View>
        <View style={styles.questionAndAnswerContainer}>
          { this.state.showAnswer ? this.renderAnswer() : this.renderQuestion() }
        </View>
        <View style={styles.controls}>
          <TextButton text='Correct'
                      style={{ width: 200, marginBottom: 10 }}
                      bgColor={correct}
                      textColor={buttonText}
                      onPress={this.props.onCorrect}/>
          <TextButton text='Incorrect'
                      style={{ width: 200 }}
                      bgColor={incorrect}
                      textColor={buttonText}
                      onPress={this.props.onIncorrect} />
        </View>
      </View>
    )
  }

  renderQuestion() {
    return (
      <View style={styles.questionAndAnswer}>
        <Text style={{fontSize: 40, color: uiText}}>{this.props.question.question}</Text>
        <TouchableOpacity onPress={this.onAnswerTogglePress}>
          <Text style={{fontSize: 14, color: uiText}}>Answer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAnswer() {
    return (
      <View style={styles.questionAndAnswer}>
        <Text style={{fontSize: 40, color: uiText}}>{this.props.question.answer}</Text>
        <TouchableOpacity onPress={this.onQuestionTogglePress}>
          <Text style={{fontSize: 14, color: uiText}}>Question</Text>
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

const styles = StyleSheet.create({
  controls: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  currentQuestion: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  questionAndAnswer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionAndAnswerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})