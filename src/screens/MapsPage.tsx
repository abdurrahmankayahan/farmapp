import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { LatLng, Marker, Polygon } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'
import ColorPicker from 'react-native-wheel-color-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import uuid from "react-native-uuid"
import Basic from '../components/basic'
import useFieldStore, { deleteFieldsItem, FieldType, getAllFields } from '../zustand/field'


export const calculatePolygonCenter = (coordinates: LatLng[]) => {
    if (coordinates.length === 0) return { latitude: 0, longitude: 0 };

    let totalLat = 0, totalLng = 0;
    coordinates.forEach(coord => {
        totalLat += coord.latitude;
        totalLng += coord.longitude;
    });

    return {
        latitude: totalLat / coordinates.length,
        longitude: totalLng / coordinates.length,
    };

}
export function pointInPolygon(point: LatLng, polygon: LatLng[]) {
    let x = point.latitude, y = point.longitude;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].latitude, yi = polygon[i].longitude;
        let xj = polygon[j].latitude, yj = polygon[j].longitude;

        let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}
const toRadians = (degrees: any) => {
    return degrees * Math.PI / 180;
};
export const calculatePolygonArea = (coordinates: LatLng[]) => {
    const earthRadius = 6371000; // Dünya'nın yarıçapı (metre cinsinden)

    let area = 0;
    const numPoints = coordinates.length;

    for (let i = 0; i < numPoints; i++) {
        const j = (i + 1) % numPoints; // Bir sonraki nokta

        const lat1 = toRadians(coordinates[i].latitude);
        const lat2 = toRadians(coordinates[j].latitude);
        const dLon = toRadians(coordinates[j].longitude - coordinates[i].longitude);

        // Alan hesabı
        area += (dLon * (Math.sin(lat1) + Math.sin(lat2))) / 2;
    }

    area = Math.abs(area) * earthRadius * earthRadius; // m² cinsinden alan
    return area; // m² cinsinden alan
};




const MapsPage = () => {

    const [colorSelect, setColorSelect] = useState("")
    const [fieldTitle, setFieldTitle] = useState(("alan" + (uuid.v4().toString()).split('-')[0], 16).toString())
    const [showModal, setShowModal] = useState(false)
    const [mapCordinates, setMapCordinates] = useState<LatLng[]>([])
    const [allMapsField, setAllMapsField] = useState<{ color: string, cordinats: LatLng[] }[]>([])
    const fieldModel = useFieldStore()

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true);
        const getFields = async () => {
            await getAllFields();
            setIsLoading(false);
        }
        getFields();
    }, [])


    return (
        <View style={styles.container}>
            <MapView
             
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
                        latitude: 40.2234,
                        longitude: 32.9207,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}

                key={"maps"}
                mapType='hybrid'
                 style={styles.mapContainer}
                onPress={e => {
                    if (fieldModel.allFields.length > 0 ? (pointInPolygon(e.nativeEvent.coordinate, fieldModel.allFields[0].maps.cordinats)) : true) {

                        setMapCordinates([...mapCordinates, e.nativeEvent.coordinate])
                    }

                }

                }
            >

                {mapCordinates.map(value => (

                    //  TODO: NOTE: StopPropagation sadece İOS  ta calısmakta... 

                    <Marker style={{ padding: 20 }} coordinate={value} draggable={true} stopPropagation={true} onPress={() => {
                        console.log("MARKER CLİCKED")
                        setMapCordinates(mapCordinates.filter(val => val != value))

                    }} />



                ))}


                {fieldModel.allFields.length > 0 ? [fieldModel.allFields.map((value, index) => ([
                    <Polygon key={"Polygon" + index} fillColor={value.maps.color + "44"} coordinates={value.maps.cordinats} />,

                    <Marker
                        key={"markers" + value.id + index}
                        onPress={() => {
                            Alert.alert("Alanı Sil", "Alanı silmek istiyor musun?", [
                                {
                                    text: "iptal",
                                    style: "cancel",
                                },
                                {
                                    text: "Sil",
                                    onPress: () => {
                                        console.log(value.id + "press delete fields")
                                        deleteFieldsItem(value.id)

                                    },
                                    style: "destructive",
                                }
                            ])

                        }}
                     
                        stopPropagation={true}
                        pinColor="blue"
                        title={calculatePolygonArea(value.maps.cordinats).toFixed(2) + "  m²"}
                        coordinate={calculatePolygonCenter(value.maps.cordinats)

                        } />
                ]

                ))] : null}

                {mapCordinates.length > 0 ? <Polygon coordinates={mapCordinates} /> : null}



            </MapView>


            <View style={styles.buttonContainer} >
                <Pressable style={styles.colorSelectorButton}
                    onPress={() => {
                        setShowModal(true)
                    }}>
                    <Icon color={colorSelect} name='color-palette' size={25} />
                </Pressable>
                <TextInput style={styles.textInput}
                    cursorColor={"black"}
                    placeholder='Alanı isimlendir'
                    onChangeText={(val) => {
                        setFieldTitle(val)
                    }}

                />

                <Pressable style={styles.button}
                    onPress={() => {
                        const field: FieldType = {
                            id: parseInt((uuid.v4().toString()).split('-')[0], 16),
                            parentId: allMapsField.length > 0 ? -1 : 0,

                            location: {
                                row: 0,
                                column: 0
                            },
                            maps: {
                                color: colorSelect,
                                cordinats: mapCordinates
                            },
                            product: {
                                product: {
                                    id: 0,
                                    icon: null,
                                    title: "BOS",
                                    irrigationFrequency: 0,
                                    collectionFrequency: 0,
                                    growthTime: 0,
                                },

                                irrigationTime: new Date(),
                                collectionTime: new Date(),
                                plantingDay: new Date(),
                                readyToCollect: false,

                            },
                        }
                        fieldModel.addFields(field)


                        const tmpData = { color: colorSelect, cordinats: mapCordinates };


                        setAllMapsField([...allMapsField, tmpData]),
                            setMapCordinates([])

                        console.log("maps(", mapCordinates.length, ")***:   ", mapCordinates)
                        console.log(fieldModel.allFields)

                    }}>
                    <Text style={{ color: "black" }}> Alan ekle </Text>

                </Pressable>

                <Modal animationType="fade"
                    transparent={true}
                    visible={showModal} >
                    <View style={styles.centeredView}>
                        <View style={styles.modalContainer}>

                            <View style={styles.colorSelectContainer}>

                                <ColorPicker onColorChange={(v) => {

                                    setColorSelect(v);

                                }}


                                />
                            </View>

                            <Pressable style={[styles.colorSelectButton, { backgroundColor: colorSelect }]} onPress={() => setShowModal(false)} >
                                <Text>Bitti</Text>
                            </Pressable>

                        </View>
                    </View>


                </Modal>
            </View>


            {isLoading ? <View style={styles.loadingContainer}>
                <ActivityIndicator color={"red"} size={"large"}></ActivityIndicator>
            </View> : null
            }

        </View>

    )
}

export default MapsPage

const styles = StyleSheet.create({
    loadingContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    container: {
        flex: 1,
        backgroundColor: "tomato"
    },
    mapContainer: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: "row"
    },
    colorSelectorButton: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 4,
        padding: 4,
        backgroundColor: "lightgray"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalContainer: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: "70%",
        height: "50%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    colorSelectContainer: {
        borderWidth: 1,
        margin: 8,
        backgroundColor: "white",
        flex: 1

    },
    colorSelectButton: {
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        margin: 8,
        padding: 4,
        backgroundColor: "tomato"
    },
    textInput: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        margin: 4,
        padding: 4,

        backgroundColor: "lightgray",
        textAlign: "center",
        fontSize: 25,
        flex: 1
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        margin: 4,
        padding: 4,
        backgroundColor: "lightgray"
    }


})