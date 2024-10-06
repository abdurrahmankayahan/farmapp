import { ActivityIndicator, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import DynamicGrid from "../components/DynamicGrid"
import useUserStore from '../zustand/user'
import useFieldStore, { FieldType, getAllFields, SaveFields } from '../zustand/field'
import uuid from 'react-native-uuid';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import ActionElement from '../components/ActionElement'
import { Screen } from 'react-native-screens'

import { useShallow } from 'zustand/react/shallow'
import SearchList from '../components/SearchList'
import MapView, { LatLng, Marker, Polygon } from 'react-native-maps'
import { calculatePolygonCenter, pointInPolygon } from './MapsPage'
import Basic from '../components/basic'
import { NavigationProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import ImageButton from '../components/ImageButton'


const HomePage: React.FC<{ navigation: BottomTabNavigationProp<any> }> = ({ navigation }) => {

    // const addField: any = useFieldState(state => state.addField)
    // const setField: any = useFieldState(state => state.setFields)
    // const field = useFieldState(state => state.fields)

    const fieldModel = useFieldStore()

    // const [satir, setSatir] = useState(0)
    // const [sutun, setSutun] = useState(0)
    // const [create, setCreate] = useState(false)


    const [mapCordinates, setMapCordinates] = useState<LatLng[]>([])

    const [isLoading, setIsLoading] = useState(false)
    const [isListView, setIsListView] = useState(false)

    useLayoutEffect(() => {

        navigation.setOptions(
            {
                
                headerLeft: () => (
                    isListView ?

                        <ImageButton
                        styleView={{justifyContent:"center", margin:4}}
                            variant='Left'
                            iconName="map"
                            iconSize={25}
                            iconColor='black'
                            onPress={() => {
                                setIsListView(false)
                            }}
                        />

                        :
                        <ImageButton
                        styleView={{justifyContent:"center", margin:4}}
                            variant='Left'
                            iconName="list"
                            iconSize={25}
                            iconColor='black'
                            onPress={() => {
                                setIsListView(true)
                            }}
                        />

                )
            }
        )


    }, [navigation, isListView])


    useEffect(() => {
        setIsLoading(true);
        const getFields = async () => {
            await getAllFields();
            setIsLoading(false);
        }
        getFields();
    }, [])

    useEffect(() => {
        fieldModel.allFields.length > 0 ? SaveFields() : null;
    }, [fieldModel.allFields])
    return (
        // <View style={{ flex: 1 }}>

        //     <View style={{
        //         flexDirection: "row",


        //     }}>
        //         <View >

        //             <TextInput style={styles.textInputStyle}
        //                 onChangeText={(value) => setSatir(parseInt(value))}
        //                 placeholder='satır'
        //             />

        //             <TextInput style={styles.textInputStyle}

        //                 onChangeText={(value) => setSutun(parseInt(value))}
        //                 placeholder='sutun'
        //             />

        //         </View>
        //         <View style={{ flexDirection: "row" }} >
        //             <Pressable style={styles.buttonStyle}
        //                 onPress={() => {

        //                     // useFieldStore.setState({ allFields: [] });
        //                     for (let row = 0; row < satir; row++) {
        //                         let rowItems = [];

        //                         for (let col = 0; col < sutun; col++) {

        //                             const field: FieldType = {
        //                                 id: parseInt((uuid.v4().toString()).split('-')[0], 16),
        //                                 parentId: 0,

        //                                 location: {
        //                                     row: row,
        //                                     column: col
        //                                 },
        //                                 maps:{
        //                                     color:"",
        //                                     cordinats: [],
        //                                 },
        //                                 product: {
        //                                     product: {
        //                                         id: 0,
        //                                         icon: null,
        //                                         title: "BOS",
        //                                         irrigationFrequency: 0,
        //                                         collectionFrequency: 0,
        //                                         growthTime: 0,
        //                                     },

        //                                     irrigationTime: new Date(),
        //                                     collectionTime: new Date(),
        //                                     plantingDay: new Date(),
        //                                     readyToCollect: false,

        //                                 },

        //                             }
        //                             fieldModel.addFields(field)

        //                         }

        //                     }

        //                 }}
        //             >
        //                 <Text>
        //                     Uygula
        //                 </Text>
        //             </Pressable>
        //             <Pressable style={styles.buttonStyle}
        //                 onPress={async () => {
        //                    // SaveFields();


        //                 }}>
        //                 <Text>DB KAYIT</Text>
        //             </Pressable>
        //         </View>
        //     </View>


        //     <View style={{ borderWidth: 1, marginTop: 16, flex: 1 }}>
        //         <ScrollView horizontal={false}>

        //             <ScrollView horizontal={true}>

        //                 {/* <DynamicGrid allFields={fieldModel.allFields} /> */}

        //                 {/* <DynamicGrid pId={0}  />  */}


        //             </ScrollView>

        //         </ScrollView>




        //         {/* 
        //         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

        //             <Pressable style={{ flex: 1, marginHorizontal: 5 }}>
        //                 <Text style={{ textAlign: "center", backgroundColor: "green" }}>sula</Text>
        //             </Pressable>

        //             <Pressable style={{ flex: 1, marginHorizontal: 5 }}>
        //                 <Text style={{ textAlign: "center", backgroundColor: "green" }}>topla</Text>
        //             </Pressable>

        //             <Pressable style={{ flex: 1, marginHorizontal: 5 }}>
        //                 <Text style={{ textAlign: "center", backgroundColor: "green" }}>ilaç</Text>
        //             </Pressable>
        //         </View> */}
        //         {/* TODO:  üst taraftaki button kısımlarını  component yap tek biri işaretlensin  işaretlenene göre   tek tıkla o alanın verisini toplandı sulandı  şeklinde güncelle */}



        //         {/* <DynamicGrid rows={satir} columns={sutun} /> */}
        //     </View>
        //     <ActionElement></ActionElement>
        // </View>

        <View style={styles.container}>

            {
                isListView ?

                    <ScrollView style={styles.listViewContainer} >
                        {fieldModel.allFields.map((value, index) => (
                            index > 0 ? <Basic  style={{margin:4}}  pId={value.id}></Basic> : null

                        ))}
                    </ScrollView>
                    :

                    <MapView key={"home"}
                        region={
                            fieldModel.allFields.length > 0 ?
                                {
                                    latitude: fieldModel.allFields[0].maps.cordinats[0].latitude,
                                    longitude: fieldModel.allFields[0].maps.cordinats[0].longitude,
                                    latitudeDelta: 0.003,
                                    longitudeDelta: 0.003,
                                } :

                                {
                                    latitude: 39.9334,
                                    longitude: 32.8597,
                                    latitudeDelta: 1,
                                    longitudeDelta: 1,
                                }
                        }
                        initialRegion={

                            {
                                latitude: 39.9334,
                                longitude: 32.8597,
                                latitudeDelta: 1,
                                longitudeDelta: 1,
                            }}
                        mapType='hybrid' style={styles.mapContainer}
                        onMarkerPress={(e) => { e.stopPropagation() }}
                    >

                        {mapCordinates.map((value, index) => (

                            //  TODO: NOTE: StopPropagation sadece İOS  ta calısmakta... 
                            <Marker key={"tempMarker" + index} style={{ padding: 20 }} coordinate={value} draggable={true} stopPropagation={true} onPress={() => {
                                console.log("MARKER CLİCKED")
                                setMapCordinates(mapCordinates.filter(val => val != value))

                            }} />
                        ))}


                        {fieldModel.allFields.length > 0 ? [fieldModel.allFields.map((value, index) => ([
                            <Polygon key={"Polygon" + value.id + index}

                                fillColor={value.maps.color + "44"}
                                coordinates={value.maps.cordinats} />,

                            <Marker
                                style={{}}
                                onPress={() => {
                                    fieldModel.updateFieldProduct(value.id);
                                }}
                                key={"marker" + value.id + index}
                                draggable={true}

                                pinColor="blue"
                                coordinate={calculatePolygonCenter(value.maps.cordinats)
                                } >

                                {index != 0 ? <Basic key={"Basic" + index} pId={value.id}></Basic> : null}
                            </Marker>,

                        ]

                        ))] : null}

                        {/* {mapCordinates.length > 0 ? <Polygon  coordinates={mapCordinates} /> : null} */}




                    </MapView>

            }

            <ActionElement />


            {isLoading ? <View style={styles.loadingContainer}>
                <ActivityIndicator color={"red"} size={"large"}></ActivityIndicator>
            </View> : null
            }

        </View>



    )
}


export default HomePage

const styles = StyleSheet.create({
    loadingContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    listViewContainer: {
        marginVertical:4,
        marginHorizontal: 4,
        backgroundColor:"lightgray"
        
    },
    container: {
        flex: 1,
        backgroundColor:"tomato"
    },

    mapContainer: {
        flex: 1
    },


    // buttonStyle: {
    //     padding: 20,

    //     borderWidth: 1,
    //     alignItems: "center",
    //     justifyContent: "center"
    // },
    // textInputStyle: {
    //     fontSize: 20,
    //     textAlign: "center",
    //     borderWidth: 1,
    //     marginVertical: 2,
    //     marginHorizontal: "10%"
    // },

    // row: {
    //     flexDirection: 'row',
    //     marginBottom: 10,
    // },
    // item: {
    //     flex: 1,
    //     backgroundColor: '#ddd',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     margin: 5,
    //     padding: 10,
    // },

})

