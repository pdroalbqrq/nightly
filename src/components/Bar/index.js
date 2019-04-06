import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Telabar extends Component {


    
   static navigationOptions = ({navigation}) =>({
       title: navigation.state.params.title
   })

  render() {
    return (
      <View>
        <Text> Texto Tela Bar </Text>
      </View>
    )
  }
}

export default Telabar
