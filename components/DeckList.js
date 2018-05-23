import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import LiteDeck from './LiteDeck'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'
import { create, buttonText, uiText } from '../utils/colors'

class DeckList extends Component {
  state = {
    decks: {},
    loading: true
  }

  static navigationOptions = {
    title: 'Mobile Flashcards',
  }

  fetchDecks = () => {
    this.setState({ loading: true })

    return Storage.getDecks()
      .then((decks) => {
        this.setState({ decks, loading: false })
      })
  }

  render() {
    if (this.state.loading) {
      <AppLoading  />
    }

    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <TextButton text='Create Deck'
                      bgColor={create}
                      textColor={buttonText}
                      onPress={this.onCreateDeckPress} />
        </View>
        <View style={styles.content}>
          <FlatList data={Object.keys(this.state.decks)}
                    ListEmptyComponent={this.renderEmptyList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item}) => (
                      <LiteDeck {...this.state.decks[item]}
                                id={item}
                                goToDeck={this.goToDeck} />
                    )}/>
        </View>
      </View>
    )
  }

  renderEmptyList() {
    return (
      <View style={styles.message}>
        <Text style={styles.messageText}>You don't have any Decks yet. Tap the Create Deck button to add one.</Text>
      </View>
    )
  }

  goToDeck = (id) => {
    return this.fetchDecks().then(() => {
      return this.props.navigation.push('Deck', {
        ...this.state.decks[id], id,
        goToDeck: this.goToDeck,
      })
    })
  }

  onCreateDeckPress = () => {
    this.props.navigation.navigate('NewDeck', {
      callback: this.createDeckCallback
    })
  }

  createDeckCallback = (deckId) => {
    this.fetchDecks()
    this.goToDeck(deckId)
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  content: {
    flex: 3,
    marginTop: 10
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  message: {
    flex: 5,
    alignItems: 'center',
    padding: 10,
  },
  messageText: {
    color: uiText
  }
})

export default DeckList