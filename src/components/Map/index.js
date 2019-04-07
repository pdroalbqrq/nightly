import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import MapView, { Marker, MapCallout, Callout } from 'react-native-maps';
import { white, black } from 'ansi-colors';
import { StackNavigator } from 'react-navigation';
import Telabar from '../Bar/index'
import placesJson from '../../json/placesjson.json';

var customMapStyle = require('../../json/mapstyle2.json');

const { height, width } = Dimensions.get('window');

console.disableYellowBox = true;

class Map extends Component {
    static navigationOptions = {
        title: 'NightlyApp'
        };


    constructor(props) {
        super(props);

        this.state;

    }

    state = {
        region: null,
        chave: null,
        places: placesJson


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
                                        borderRadius: 3,
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: '#fff',
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
        alignItems: 'flex-end'
    },
    mapView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    customCalloutContainer: {
        backgroundColor: '#3C024F',
        maxHeight:20,
        width: width-50
    },
    placesContainer: {
        width: '100%',
        maxHeight: 200,

    },
    places: {
        width: width - 10,
        backgroundColor: '#3C024F',
        marginHorizontal: 5,
        marginBottom: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: 'row',

        borderRadius: 5,
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
        color: '#fff',
        marginHorizontal: 2,
    },

    pdescription: {
        fontSize: 13,
        alignItems: 'center',
        color: '#fff',
        marginRight: 10
    }





});

export default Map;