import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class Map extends Component {
    state = {
        region: null,
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
        const { region } =  this.state;

        return (

            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                >
                    {/* <Marker coordinate={this.state}/> */}
                </MapView>
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
});