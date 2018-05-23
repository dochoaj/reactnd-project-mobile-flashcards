import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { AppLoading } from 'expo'
import LiteDeck from './LiteDeck'
import TextButton from './TextButton'
import Storage from '../utils/storage_api'

class DeckList extends Component {
  state = {
    decks: {},
    loading: true
  }

  fetchDecks = () => {
    this.setState({ loading: true })

    return Storage.getDecks()
      .then((decks) => {
        console.log(decks)
        this.setState({ decks, loading: false })
      })
  }

  componentDidMount() {
    this.fetchDecks()
  }

  render() {
    if (this.state.loading) {
      <AppLoading  />
    }

    return (
      <View>
        <TextButton text='Create Deck'
                    onPress={this.onCreateDeckPress} />
        <FlatList data={Object.keys(this.state.decks)}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({item}) => (
                    <LiteDeck {...this.state.decks[item]}
                              id={item}
                              goToDeck={this.goToDeck} />
                  )}/>
      </View>
    )
  }

  goToDeck = (id) => {
    this.props.navigation.navigate('Deck', {
      ...this.state.decks[id], id,
      goToDeck: this.goToDeck
    })
  }

  onCreateDeckPress = () => {
    this.props.navigation.navigate('NewDeck', {
      callback: this.fetchDecks
    })
  }
}

export default DeckList