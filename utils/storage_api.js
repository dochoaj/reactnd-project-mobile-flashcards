import { AsyncStorage } from 'react-native'
import moment from 'moment'
import capitalize from 'capitalize'

export const DECK_STORAGE_KEY = 'MobileFlashcards:Decks'
export const QUIZLOG_STORAGE_KEY = 'MobileFlashcards:QuizLog'

const cleanDecks = () => {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}

const cleanQuizLog = () => {
  return AsyncStorage.removeItem(QUIZLOG_STORAGE_KEY)
}

const addQuizLog = () => {
  return AsyncStorage.setItem(QUIZLOG_STORAGE_KEY, JSON.stringify(moment().format('YYYY-MM-DD')))
}

const isQuizReadyToday = () => {
  return AsyncStorage.getItem(QUIZLOG_STORAGE_KEY)
    .then(JSON.parse)
    .then((date) => {
      return date === moment().format('YYYY-MM-DD')
    })
}

const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      if (results === null) {
        return {}
      }

      return JSON.parse(results)
    })
}

const getDeck = (key) => {
  return getDecks().then((decks) => {
            if (decks[key]) {
              return decks[key]
            }

            return false
          })
}

const addDeck = (title, content = { questions: [] }) => {
  const deckKey = capitalize(title)
  const deckContent = {...content, title: title}

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckKey]: deckContent
  })).then(() => {
    return {...deckContent, key: deckKey}
  })
}

const addCard = (deckKey, card) => {
  return getDeck(deckKey)
          .then((deck) => {
            if (!deck) {
              return false
            }

            const content = { ...deck, questions: [...deck.questions, card] }
            return addDeck(deckKey, content)
          })
}

export default { cleanDecks, getDecks, getDeck, addCard, addDeck, cleanQuizLog, addQuizLog, isQuizReadyToday }