import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';

const { height, width } = Dimensions.get('window');

class Telabar extends Component {



  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: '#3C024F',
      borderBottomWidth: 1,
      borderColor: '#fff',
      fontSize:25
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  })

  render() {
    const { navigation } = this.props;
    const comida = navigation.state.params.promo.sextaFeira.comida
    const bebida = navigation.state.params.promo.sextaFeira.bebida
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: navigation.state.params.img }}
          style={{
            width: width,
            height: 200,
          }}
        />
        <ScrollView style={styles.descriptionHeight}>
        <Text style={styles.placesinfo}> {navigation.state.params.description} </Text>
        </ScrollView>
        <View style={styles.promocaoView}>
          <Text style={styles.promocao}> Promoções de Hoje </Text>
        </View>
        <View style={styles.promocaoViewItens}>
          {comida.map(comida => (
            <Text style={styles.promocaoItens}> {comida.nome} : R$ {comida.preco + ""} </Text>
          ))}
          {bebida.map(bebida => (
            <Text style={styles.promocaoItens}> {bebida.nome} : R$ {bebida.preco + ""} </Text>
          ))}
        </View>



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C024F',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  descriptionHeight:{
    maxHeight: 100,
    borderBottomWidth: 2,
    borderColor:'#FFF'
  },
  placesinfo: {
    alignItems: 'center',
    margin: 10,
    justifyContent: 'flex-start',
    color: '#fff',
    fontSize: 20
  },
  promocaoView: {
    width: width,
    height: 50,
    borderColor: '#fff',
    alignItems: 'center',
  },
  promocaoViewItens: {
    width: width,
    height: 50,
    marginTop:20,
    borderColor: '#fff',
    alignItems: 'flex-start',
  },
  promocao: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 25
  },
  promocaoItens: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: '#fff',
    marginLeft:20,
    fontSize: 20
  }

});



export default Telabar
