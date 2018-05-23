import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class LiteDeck extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPressDeck}>
          <Text>{this.props.title}</Text>
          <Text>{this.props.questions.length} Cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onPressDeck = () => {
    this.props.goToDeck(this.props.id)
  }
}

export default LiteDeck