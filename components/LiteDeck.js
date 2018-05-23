import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { uiText, cardBackground } from '../utils/colors'
class LiteDeck extends Component {
  render() {
    return (
      <View style={styles.deck}>
        <TouchableOpacity style={styles.card} onPress={this.onPressDeck}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.cardCount}>{this.props.questions.length} Cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onPressDeck = () => {
    this.props.goToDeck(this.props.id)
  }
}

const styles = StyleSheet.create({
  deck: {
    padding: 20,
    backgroundColor: cardBackground,
    marginTop: 10
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: uiText
  },
  cardCount: {
    fontSize: 12,
    color: uiText
  }
})

export default LiteDeck