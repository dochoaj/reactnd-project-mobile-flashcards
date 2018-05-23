import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default (props) => (
  <TouchableOpacity style={[{
                      padding: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: props.bgColor || 'white'
                    }, props.style]}
                    onPress={props.onPress}>
    <Text style={{
      fontSize: props.fontSize || 16,
      color: props.textColor || 'black'
    }}>{props.text}</Text>
  </TouchableOpacity>
)
