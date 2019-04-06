import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { white } from 'ansi-colors';
import { StackNavigator } from 'react-navigation';
import Telabar from '../Bar/index';
var customMapStyle = require('../../json/mapstyle2.json');

const { height, width } = Dimensions.get('window');

class Map extends Component {

    

    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props);
        this.teste
        this.state;

        this.irBar = this.irBar.bind(this);
    }


    irBar() {
        this.props.navigation.navigate('Bar', { nome: this.props.key });
    }

    state = {
        region: null,
        chave: null,
        places: [
            {
                id: 1,
                title: 'Boate Metropole',
                description: 'DJs, drinques, festas e atmosfera animada em danceteria com vários ambientes, bares e estilos de música.',
                img: 'https://www.joaoalberto.com/wp-content/uploads/2014/01/15/casafrente-vert.jpg',
                latitude: -8.022007,
                longitude: -34.859251,

            },
            {
                id: 2,
                title: 'DownTown PUB',
                description: 'Venha e traga seus amigos para uma noite de diversão como nunca viu, a DownTown Pub tem uma gama de ritmos para muita musica e diversão, venha conferir!',
                img: 'https://www.perspectiva360.com.br/wp-content/uploads/2017/05/1997-downtown-pub-street-view-passeio-virtual-tour-recife-olinda-paulista-fotografo-de-confianca-perspectiva-360.jpg',
                latitude: -8.023675,
                longitude: -34.860146,
            },
            {
                id: 3,
                title: 'Donavans Pub',
                description: 'O Donovans Irish Pub trouxe para o Recife um pouco do modo de vida irlandês. Inspirado em legítimos Pubs Irlandeses, com uma atmosfera super diferenciada! Nascemos aceitando a missão de preparar tudo para que você se sinta em casa. Desde o início cuidamos de cada detalhe para que todos fizessem a diferença! Criamos um atendimento espetacular e tornamos o pub ideal para ser seu melhor local de lazer, seja para uma visita, hapyy hour, comer uma boa comida, ouvir uma boa música ou ao se reunir com a galera!',
                img: 'https://www.obaoba.com.br/contentFiles/system/pictures/2011/6/249082/original/41e158223ad97a75.jpg',
                latitude: -8.025802,
                longitude: -34.864383,
            }
            ,
            {
                id: 4,
                title: 'The Queen Pub',
                img: 'https://imagens2.ne10.uol.com.br/blogsne10/social1/uploads//2018/03/DSC_2768-748x410.jpg',
                description: 'The Queen Pub fica localizado na Domingos Ferreira conta com uma gama de variados drinks e comidas tipicas da inglaterra, venha conferir!',
                latitude: -8.015051,
                longitude: -34.865504,
            },
            {
                id: 5,
                title: 'Babte Papo / Boteco&Bar',
                img: 'https://www.obaoba.com.br/contentFiles/image/2017/07/VEN/principal/85_w840h0_1499468574batepapo1.jpg',
                description: 'Mercado Publico de Casa Amarela',
                latitude: -8.0256735,
                longitude: -34.9193363,
            },

            {
                id: 6,
                title: 'Casa de Show Bate Papo',
                description: 'Casa de Show Bate Papo',
                latitude: -8.0203722,
                longitude: -34.8966742,
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
                        />
                    ))}
                </MapView>
                <ScrollView

                    style={styles.placesContainer}
                    horizontal
                    onTouchEnd={this.irBar}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={e => {
                        const scrolled = e.nativeEvent.contentOffset.x;

                        const place = (e.nativeEvent.contentOffset.x > 0)
                            ? Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width)
                            : 0;
                        const { latitude, longitude, mark, id } = this.state.places[place];
                        this.teste = this.state.places.bind(this)
                     



                        this.mapView.animateToRegion({
                            latitude,
                            longitude,
                            id = key,
                            latitudeDelta: 0.0143,
                            longitudeDelta: 0.0034
                        }, 1000);

                        setTimeout(() => {
                            mark.showCallout();
                        }, 1000)



                    }}
                >
                    {this.state.places.map(place => (
                        <View key={place.id} style={styles.places}>
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
        borderRadius: 4,
        borderWidth: 2,
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

const Navegador = StackNavigator({
    Home: { screen: Map },
    Bar: { screen: Telabar }

});

export default Navegador;