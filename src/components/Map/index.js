import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { white } from 'ansi-colors';
var customMapStyle = require('../../json/mapstyle.json');
export default class Map extends Component {
    state = {
        region: null,
        places: [
            {
                id: 1,
                title: 'Igreja Santa Tereza',
                description: 'Igreja para casamentos',
                latlng: { latitude: -8.022007, longitude: -34.859251 }

            },
            {
                id: 2,
                title: 'Duetto Motel',
                description: 'rsrs +18',
                latlng: { latitude: -8.023675, longitude: -34.860146 }
            },
            {
                id: 3,
                title: 'CEMO (Centro de Educação Músical de Olinda)',
                description: 'conservatório',
                latlng: { latitude: -8.025802, longitude: -34.864383 }
            }
        ]
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
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

        return (

            <View style={styles.container}>
                <MapView
                    showsPointsOfInterest={false}
                    showsBuildings={false}
                    style={styles.mapView}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    customMapStyle={customMapStyle}

                >
                    {this.state.places.map(place => (
                        <Marker
                            key={place.id}
                            coordinate={place.latlng}
                        />
                    ))}
                </MapView>
                <ScrollView
                    style={styles.placesContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled 
                    // onMomentumScrollEnd={e =>{
                    //     const scrolled = e.nativeEvent.contentOffset.x;

                    //     const place = (scrolled > 0)
                    //     ? scrolled / Dimensions.get('window').width
                    //     : 0;

                    //     const { latitude, longitude } = this.state.places[place];

                    //     this.mapView.animateToCoordinate({
                    //         latitude,
                    //         longitude
                    //     });
                    // }}
                    >
                    {this.state.places.map(place => (
                        <View key={place.id} style={styles.places}>
                            <Text>{place.title}</Text>
                            <Text>{place.description}</Text>
                        </View>
                    ))}


                </ScrollView>
            </View>);

    }
}

const { height, width } = Dimensions.get('window');
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
    placesContainer: {
        width: '100%',
        maxHeight: 200,
    },
    places: {
        width: width - 40,
        maxHeight: 200,
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 20
    }
});