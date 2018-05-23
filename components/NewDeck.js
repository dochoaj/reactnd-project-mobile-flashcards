import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import capitalize from 'capitalize'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'
import { create, buttonText, uiText, inputBorder } from '../utils/colors'

export default class NewDeck extends Component {
  state = {
    text: ''
  }

  static navigationOptions = {
    title: 'New Deck',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>What is the title of your new Deck?</Text>
          <TextInput value={this.state.text}
                     style={styles.input}
                     onChangeText={(text) => this.setState({ text })} />
        </View>
        <View style={styles.controls}>
          <TextButton text='Submit'
                      bgColor={create}
                      textColor={buttonText}
                      onPress={this.onSubmit} />
        </View>
      </View>
    )
  }

  onSubmit = () => {
    let { text } = this.state
    text = text.trim()
    Storage.addDeck(text)
      .then((deck) => {
        return this.props.navigation.state.params.callback(deck.key)
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