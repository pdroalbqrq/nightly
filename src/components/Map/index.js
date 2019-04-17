import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, MapCallout, Callout } from 'react-native-maps';
import { white, black } from 'ansi-colors';
import { StackNavigator } from 'react-navigation';
import Telabar from '../Bar/index';
import placesJson from '../../json/placesjson.json';


var customMapStyle = require('../../json/mapstyle.json');
var tema = require('../../json/tema.json');

var corPrimaria = tema[1].cores.nome.primaria.hexa;
var corSecundaria = tema[1].cores.nome.secundaria.hexa;
var corTerciaria = tema[1].cores.nome.terciaria.hexa;


const { height, width } = Dimensions.get('window');
import avatar from '../../drawing/avatar.png'
console.disableYellowBox = true;

class Map extends Component {
       
    state = {
        region: null,
        chave: null,
        places: placesJson
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Nightly',
        headerStyle: {
          backgroundColor: corPrimaria,
          borderBottomWidth: 1,
          borderColor: corSecundaria,
          fontSize:25
        },
        headerTintColor: corSecundaria,
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      })



    constructor(props) {
        super(props);

        this.state;

    }

 

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0443,
                        longitudeDelta: 0.1134
                    }
                })
            }, //sucesso
            () => { }, //erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }



    render() {
        const { region } = this.state;
        //   const {} = this.setState.places[0]
        return (
                
            <View style={styles.container}>
           
           <View style={styles.mapProfile}>     
           <TouchableOpacity>
           <Image source={avatar} style={{height:55, width:55}} />
           </TouchableOpacity>           
           </View>  
                
                <MapView
                
                    showsPointsOfInterest={false}
                    showsBuildings={false}
                    style={styles.mapView}
                    region={region}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    customMapStyle={customMapStyle}
                    ref={el => this.mapView = el}

                >
                

                

                    {this.state.places.map(place => (
                        <Marker
                            key={place.id}
                            title={place.title}
                            ref={mark => place.mark = mark}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude
                            }}
                        >
                          
                        </Marker>
                    ))}
                    
                </MapView>
                 
                <ScrollView

                    style={styles.placesContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={e => {
                        const scrolled = e.nativeEvent.contentOffset.x;

                        const place = (e.nativeEvent.contentOffset.x > 0)
                            ? Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width)
                            : 0;


                        const { latitude, longitude, mark } = this.state.places[place];


                        this.mapView.animateToRegion({
                            latitude,
                            longitude,
                            latitudeDelta: 0.0143,
                            longitudeDelta: 0.0034
                        }, 600);

                        setTimeout(() => {
                            mark.showCallout();
                        }, 500)



                    }}
                >
                    {this.state.places.map(place => (
                        <View key={place.id} style={styles.places}
                            onTouchEnd={(e) => this.props.navigation.navigate('TelaBar', {
                                id: place.id,
                                title: place.title,
                                description: place.description,
                                img: place.img,
                                promo: place.promocao
                            })

                            }
                        >
                            <View style={styles.placepic}>
                                <Image
                                    source={{ uri: place.img }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderTopLeftRadius: 40,
                                        borderWidth: 1,
                                        borderColor: '#E9E0F9',
                                    }}
                                />
                            </View>
                            
                            <View style={styles.placesinfo}>
                                <Text style={styles.ptitle}>{place.title}</Text>
                                <ScrollView
                                    vertical
                                    showsVerticalScrollIndicator={true}
                                    pagingEnabled
                                >

                                    {/* <Text showsHorizontalScrollIndicator style={styles.pdescription}>{place.description}</Text> */}
                                </ScrollView>
                               
                            </View>
                            
                        </View>
                    ))}
                </ScrollView>
                
            </View>);
          

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
       
        
    },
    mapView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
   
    },
    mapProfile:{
      width: 55,
      height: 55,    
      position:'absolute',
      top:20,
      left:35,
      borderRadius:70,
      zIndex:1

    },
    placesContainer: {
        width: '100%',
        maxHeight: 200,

    },
    places: {
        width: width - 10,
        backgroundColor: corPrimaria,
        marginHorizontal: 5,
        marginBottom: 5,
        borderRadius: 5,
        borderTopLeftRadius: 50,
        borderWidth: 1,
        borderColor: corSecundaria,
        flexDirection: 'row',
        bottom: 0,
        alignSelf: 'flex-end'
    },

    placepic: {
        margin: 10,

    },
    placesinfo: {

        alignItems: 'center',
        margin: 10,
        justifyContent: 'flex-start',
        width: 200
    },

    ptitle: {
        fontSize: 25,
        alignItems: 'center',
        color: corSecundaria,
        marginHorizontal: 2,
        fontWeight: 'bold'
    },

    pdescription: {
        fontSize: 13,
        alignItems: 'center',
        color: corTerciaria,
        marginRight: 10
    }





});

export default Map;