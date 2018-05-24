import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import Storage from '../utils/storage_api'
import { clearLocalNotification } from '../utils/notifications'

export default class Quiz extends Component {
  state = {
    current: 0,
    correct: 0,
    incorrect: 0,
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { questions, deck, id, goToDeck } = nextProps.navigation.state.params
    return {
      ...prevState, questions, deck, id, goToDeck
    }
  }

  render() {
    const isFinished = this.state.current === this.state.questions.length
    const content = isFinished ? this.renderResult() : this.renderQuestion()

    if (isFinished) {
      Storage.addQuizLog().then(clearLocalNotification)
    }

    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }

  renderResult() {
    return (
      <QuizResult deck={this.state.deck}
                  correct={this.state.correct}
                  incorrect={this.state.incorrect}
                  questions={this.state.questions}
                  startOver={this.startOver}
                  viewDeck={this.viewDeck} />
    )
  }

  renderQuestion() {
    const currentQuestion = this.state.questions[this.state.current]

    return (
      <QuizQuestion index={this.state.current}
                    total={this.state.questions.length}
                    question={currentQuestion}
                    onIncorrect={this.onIncorrect}
                    onCorrect={this.onCorrect} />
    )
  }

  onIncorrect = () => {
    this.setState((currState) => {
      return {
        ...currState,
        current: currState.current + 1,
        incorrect: currState.incorrect + 1,
      }
    })
  }

  onCorrect = () => {
    this.setState((currState) => {
      return {
        ...currState,
        current: currState.current + 1,
        correct: currState.correct + 1,
      }
    })
  }

  startOver = () => {
    this.setState({
      current: 0,
      correct: 0,
      incorrect: 0,
    })
  }

  viewDeck = () => {
    this.state.goToDeck(this.state.id)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})