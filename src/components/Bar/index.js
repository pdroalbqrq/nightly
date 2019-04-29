import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get('window');
const avatarprof = 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png'

var tema = require('../../json/tema.json');

var corPrimaria = tema[1].cores.nome.primaria.hexa;
var corSecundaria = tema[1].cores.nome.secundaria.hexa;
var corTerciaria = tema[1].cores.nome.terciaria.hexa;


class Telabar extends Component {

  constructor() {
    super()
    this.state = {
      press: false,
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: null,
    headerTintColor: '#E9E0F9',
    headerTransparent: true
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
        <View style={styles.avatarContainer}>
          <View style={styles.avatarperf}>
            <Image source={{ uri: avatarprof }} style={{ width: 150, height: 150, margin: -2 }} />
          </View>
        </View>

        <View style={styles.minfo}>
          <View style={styles.mInfoInside}>

            <View style={styles.mView}>
              <Text style={styles.txtQnt}>10 mil</Text>
              <Text style={styles.txtDesc}>Curtidas</Text>
            </View>

            <View style={styles.mView}>
              <Text style={styles.txtQnt}>4.8</Text>
              <Text style={styles.txtDesc}>Avaliação</Text>
            </View>


            <View style={styles.mView}>
              <Text style={styles.txtQnt}>100 mil</Text>
              <Text style={styles.txtDesc}>Views</Text>
            </View>


          </View>
        </View>

        <View style={styles.teste}> 

        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corPrimaria

  },
  teste:{
    flex:1,
  },
  avatarContainer:{
    alignItems: 'center'
  },
  avatarperf: {
    position: 'absolute',
    top:-80,
    borderWidth: 5,
    borderColor: corPrimaria,
    borderRadius: 150,
    alignItems: 'center'
  },

  minfo: {
    top: 100,
    alignItems: 'flex-start',
  },
  mInfoInside: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  txtDesc: {

    color: corTerciaria,
    fontSize: 20
  },
  txtQnt: {
    color: corTerciaria,
    fontSize: 15
  },

  mView: {
    alignItems: 'center',

  }

});



export default Telabar
