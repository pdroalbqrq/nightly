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
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import bgImagem from '../../drawing/backgroud.jpg'
import LgImagem from '../../drawing/logo.png'
import Facebook from '../../drawing/facebook.png'
import Google from '../../drawing/google.png'
import { NavigationActions, StackActions } from 'react-navigation';


const { width: WIDTH } = Dimensions.get('window');
var tema = require('../../json/tema.json');

export class TelaLogin extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false,
      email: '',
      senha: '',

    }
    this.logar = this.logar.bind(this)

    var config = {
      "apiKey": "AIzaSyCHgXFB3jhMI0sCLbQNAHDK-f7UacpSQDk",
      "authDomain": "nightly-23428.firebaseapp.com",
      "databaseURL": "https://nightly-23428.firebaseio.com",
      "projectId": "nightly-23428",
      "storageBucket": "",
      "messagingSenderId": "221789084607"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.dispatch(StackActions.reset({
          index: 0, 
          actions:[
            NavigationActions.navigate({routeName: 'Map'})
          ]
        }));

      }
      // else{
      //   alert('Usuário Deslogado')
      // }
    })


  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })

    }



  }


  logar() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
      .catch((error) => {
        if (error.code == 'auth/wrong-password') {
          alert('Usuário ou senha Incorreta');

        } else {
          alert('Ops, tente novamente.');
        }
      })
  }

  render() {
    
    return (

      
      <View style={styles.backgrounContainer}>
        <View style={styles.logoContainer}>
          <Image source={LgImagem} style={styles.logoimg} />
        </View>
        <View style={styles.inputAll}>
          <View style={styles.inputcontainer}>
            <Icon name={'ios-person'} size={28} color={'#E9E0F9'}
              style={styles.InputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Usuário'}
              placeholderTextColor={'#E9E0F9'}
              underlineColorAndroid='transparent'
              onChangeText={(email) => { this.setState({ email }) }}
            />
          </View>

          <View style={styles.inputcontainer}>
            <Icon name={'ios-lock'} size={28} color={'#E9E0F9'}
              style={styles.InputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Senha'}
              secureTextEntry={this.state.showPass}
              placeholderTextColor={'#E9E0F9'}
              underlineColorAndroid='transparent'
              onChangeText={(senha) => { this.setState({ senha }) }}
            />

            <TouchableOpacity style={styles.btneye} onPress={this.showPass.bind(this)}>
              <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'#E9E0F9'} />
            </TouchableOpacity>
          </View>



          <TouchableOpacity style={styles.btnLogin}
            onPress={this.logar}><Text style={styles.txtEntrar}>ENTRAR</Text>

          </TouchableOpacity>
        </View>

        <View style={styles.cadastrar}>
          <Text style={styles.txtCad}>Já possui conta?</Text>
          <Text style={styles.txtCad}>Cadastre-se !</Text>
        </View>

        <View style={styles.containerSocial}>
          <TouchableOpacity style={styles.social}>
            <Image source={Facebook} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.social}>
            <Image source={Google} />
          </TouchableOpacity>
        </View>


      </View>
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
    backgroundColor: tema[0].cores.nome.primaria.hexa
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoimg: {
    width: 120,
    height: 150,
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
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'transparent',
    color: tema[0].cores.nome.primaria.hexa,
    marginHorizontal: 25,
    borderBottomWidth: 0.6,
    borderColor: '#E9E0F9',
  },
  inputAll:{
    backgroundColor:tema[0].cores.nome.terciaria.hexa,
    alignItems:'center',
    justifyContent: 'center',
    padding: 40,
    width: WIDTH -10,
    borderRadius: 10
  },
  inputcontainer: {
    marginTop: 15
  },
  InputIcon: {
    position: 'absolute',
    top: 10,
    left: 37,
  },
  btneye: {
    position: 'absolute',
    top: 8,
    right: 37,
    color: tema[0].cores.nome.primaria.hexa
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 49,
    borderRadius: 45,
    backgroundColor: tema[0].cores.nome.primaria.hexa,
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3
  },
  txtEntrar: {
    color: tema[0].cores.nome.terciaria.hexa,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  containerSocial: {
    flexDirection: 'row',
  },
  social: {
    width: 100,
    height: 100,
    marginTop: 10,
    paddingLeft: 15

  },

  cadastrar: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 7,

  },

  txtCad: {

    fontSize: 17,
    marginLeft: 10,
  }

});

export default TelaLogin
