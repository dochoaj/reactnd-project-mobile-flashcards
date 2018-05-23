import React, { Component } from 'react'
import { View, Text } from 'react-native'
import TextButton from './TextButton'

class Deck extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps) {
    return {
      title: nextProps.navigation.getParam('title', ''),
      questions: nextProps.navigation.getParam('questions', []),
      id: nextProps.navigation.getParam('id', null),
      goToDeck: nextProps.navigation.getParam('goToDeck'),
      onCreateQuestion: nextProps.navigation.getParam('onCreateQuestion'),
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.title}</Text>
        <Text>{this.state.questions.length} Cards</Text>
        <TextButton text='Start Quiz' onPress={this.onStartQuizPress} />
        <TextButton text='Add Question' onPress={this.onAddQuestionPress} />
      </View>
    )
  }

  onStartQuizPress = () => {
    this.props.navigation.navigate('Quiz', {
      deck: this.state.title,
      questions: this.state.questions,
      id: this.state.id,
      goToDeck: this.state.goToDeck
    })
  }

  onAddQuestionPress = () => {
    const { title, id, onCreateQuestion } = this.state

    this.props.navigation.navigate('NewQuestion', {
      deck: this.state.title, id, onCreateQuestion
    })
  }
}

export default Deck