import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImagem from '../../drawing/backgroud.jpg'
import LgImagem from '../../drawing/logo.png'


const { width: WIDTH } = Dimensions.get('window')
export class TelaLogin extends Component {
  constructor(){
    super()
    this.state = {
      showPass:  true,
      press: false
    }
  }

  showPass = ()=>{
    if(this.state.press == false){
      this.setState({showPass: false, press: true})
    }else{
      this.setState({showPass: true, press: false})

    }
  }
  render() {
    return (
      <ImageBackground source={bgImagem} style={styles.backgrounContainer}>
        <View style={styles.logoContainer}>
          <Image source={LgImagem} style={styles.logoimg} />
          <Text style={styles.logoTxt}>Nigthly Bares</Text>
        </View>

        <View style={styles.inputcontainer}>
          <Icon name={'ios-person'} size={28} color={'(rgba(255, 255,  255,0.7)'}
            style={styles.InputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Usuário'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={styles.inputcontainer}>
          <Icon name={'ios-lock'} size={28} color={'(rgba(255, 255,  255,0.7)'}
            style={styles.InputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Senha'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
          />

          <TouchableOpacity style={styles.btneye} onPress={this.showPass.bind(this)}>
            <Icon name={ this.state.press == false ? 'ios-eye' : 'ios-eye-off' } size={26} color={'(rgba(255, 255,  255,0.7)'} />
          </TouchableOpacity>
        </View>


        
        <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.txtEntrar}>Entrar</Text>
          </TouchableOpacity>


      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({

  backgrounContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },



  logoContainer: {
    alignItems: 'center',
    margin: 50,
    marginBottom: 50,
  },

  logoimg: {
    width: 120,
    height: 120,
  },

  logoTxt: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.9,



  },

  input: {
    width: WIDTH - 55,
    height: 49,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,

  },

  inputcontainer: {
    marginTop: 15,

  },

  InputIcon: {
    position: 'absolute',
    top: 10,
    left: 37,

  },

  btneye:{
    position:'absolute',
    top:8,
    right:37,

  },

  btnLogin:{
    width: WIDTH - 55,
    height: 49,
    borderRadius: 45,
    backgroundColor: '#4B0082',
    justifyContent:'center',
    marginTop:20,

  },

  txtEntrar:{
    color:'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center',

  }

});

export default TelaLogin
