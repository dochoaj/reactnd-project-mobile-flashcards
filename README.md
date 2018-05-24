# Daniel Ochoa's Mobile Flashcard Project

This is my implementation of the `Mobile Flashcards` React Nanodegree project. Based on a Create React Native App scaffold.

## Installation

* Install all project dependencies with `yarn`

## Usage

* Start the development server with `yarn start`, you can use expo features to test **on iOS** by using the Simulator or your own device. No tests on Android were issued.

## Architecture

* The project directory is as follows:

- Components: All the screens are here. The App entry point is the Stack Navigation of `App.js` and the main route is `DeckList`. As Redux wasn't an obligation for this project (I really think that Redux makes things a lot easier when working when React Native) I decided to use a hierarchical approach to handle global state. So, the main component knows how to handle the main state modification callbacks.

- Utils: This is a miscelaneous directory. You can find the following:

  - `colors.js`: Constants with colors values that are going to be used in the entire app.
  - `notifications.js`: Helper functions used to handle notification. This is a small test help that you can uncomment in order to test the notifications in a more easy way. Remember that in order for Expo notifications to work, the application must not be open in the phone.
  - `storage_api.js`: Helper functions that knows how to handle `AsyncStorage`.

## Proud of

- `Navigation`: I had an issue with navigation, where as after any Card or Deck creation, that route remained on the stack and was an option as the user pushes the back button. I read the entire documentation of react navigation and figured out how to rid of that problem.

- `State management`: My `DeckList` component can handle most of the app logic only inheriting a method to other routes that tells them how to comeback to a certain deck view.

- `Quiz implementation`: I'm really proud of this component. I was able to implement a sequential order of components only using the state of the Quiz component. So simple, so elegant.
