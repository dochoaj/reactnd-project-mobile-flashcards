import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'
import { create, buttonText, uiText, inputBorder } from '../utils/colors'

export default class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { deckId, callback } = nextProps.navigation.state.params

    return { ...prevState, deckId, callback }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Question:</Text>
          <TextInput style={styles.input}
                     value={this.state.question}
                     onChangeText={(question) => this.setState({ question })} />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text style={styles.inputLabel}>Answer:</Text>
          <TextInput style={styles.input}
                     value={this.state.answer}
                     onChangeText={(answer) => this.setState({ answer })} />
        </View>
        <View style={styles.controls}>
          <TextButton text='Submit'
                      bgColor={create}
                      textColor={buttonText}
                      onPress={this.onSubmitPress} />
        </View>
      </View>
    )
  }

  onSubmitPress = () => {
    const { deckId, question, answer } = this.state
    Storage.addCard(deckId, { question, answer })
      .then(() => {
        this.state.callback()
      })
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  inputLabel: {
    fontSize: 16
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: inputBorder,
    marginTop: 5,
    paddingBottom: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
})