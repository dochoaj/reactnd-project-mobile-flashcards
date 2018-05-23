import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Text>{props.text}</Text>
  </TouchableOpacity>
)
