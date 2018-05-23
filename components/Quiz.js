import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class Quiz extends Component {
  state = {
    current: 0,
    correct: 0,
    incorrect: 0,
  }

  render() {
    const isFinished = this.state.current + 1 === this.props.questions.length
    const content = isFinished ? this.renderResult() : this.renderQuestion()

    return (
      <View>
        {content}
      </View>
    );
  }

  renderResult() {
    return (
      <QuizResult deck={this.props.deck}
                  correct={this.state.correct}
                  incorrect={this.state.incorrect}
                  questions={this.props.questions}
                  startOver={this.startOver}
                  viewDeck={this.viewDeck} />
    )
  }

  renderQuestion() {
    const currentQuestion = this.props.questions[this.state.current]

    return (
      <QuizQuestion index={this.state.current}
                    total={this.props.questions.length}
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
    // Navigate to deck page
  }
}