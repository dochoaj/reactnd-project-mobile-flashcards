import React from 'react'
import { createStackNavigator } from 'react-navigation'

import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewQuestion from './components/NewQuestion'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'

export default createStackNavigator(
  {
    DeckList,
    Deck,
    NewDeck,
    NewQuestion,
    Quiz
  }, {
    initialRouteName: 'DeckList',
  });
