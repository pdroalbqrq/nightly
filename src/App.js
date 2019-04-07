import React from 'react';
import {
    Plataform,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import TelaLogin from '../src/components/Login/index'
import Map from '../src/components/Map/index'
import TelaBar from '../src/components/Bar/index'
const Navegador = StackNavigator({
    Login:{ 
        screen: TelaLogin
    },
    Map:{ 
        screen: Map    
    },

});


export default Navegador;

