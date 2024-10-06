import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import SelectItems from './SelectItems';
import useFieldStore, { FieldType } from '../zustand/field';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import useProductStore, { ProductOfFields } from '../zustand/product';
import useActionStore from '../zustand/action';
import ImageButton from './ImageButton';


const basic: FC<{ pId: number,style?:ViewStyle }> = ({ pId ,style}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalInputText, setModalInputText] = useState("")
    const [satir, setSatir] = useState(0)
    const [sutun, setSutun] = useState(0)

    const fieldModel = useFieldStore()

    const actionModel = useActionStore();
    const productModel=fieldModel.allFields.filter(val=>(val.id==pId))[0].product!;


    const [dateNow, setDateNow] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {

            setDateNow(new Date());

        }, 1000);

        return () => clearInterval(interval);
    }, []);

    let bComp = (

        <TouchableOpacity activeOpacity={1} style={[{ borderWidth: 2},
            {backgroundColor: fieldModel.allFields.filter(v => (v.id == pId))[0].maps.color +"55"}]}
            onPress={() => {
                console.log(pId)

                fieldModel.updateFieldProduct(pId);
                //console.log("ilk:",fieldModel.allFields)
                //TODO: fields içerisindeki  alanları  yenileriyle güncelle....
            }}
            onLongPress={() => {
                setModalVisible(true);
            }}>
            <View style={[styles.container, { justifyContent: "space-between", alignItems: "center" }]} >

                <Icon name="leaf-outline" size={25} color={"black"} />
                <Text style={{color:"black"}} >
                    {fieldModel.allFields.filter(v => (v.id == pId))[0].product.product.title}
                </Text>
                {/* <Text>
                    {fieldModel.allFields.filter(v => (v.id == pId))[0].product.irrigationTime.toLocaleString()}
                </Text> */}

                <View style={{ justifyContent: "center" }}>
                    <ImageButton variant='Right' text={"% "+((dateNow.getTime() -  productModel.irrigationTime.getTime())/(1000*3600*24)).toFixed(2)} iconName="water-outline" iconColor={((dateNow.getTime() -  productModel.irrigationTime.getTime())/(1000*3600*24) >= productModel.product.irrigationFrequency ? "blue" : "green")} iconSize={20} />
                    {/* <Text style={{
                        color:
                            (new Date((dateNow - productModel.irrigationTime)) >= productModel.irrigationFrequency ? "blue" : "green"

                            )
                    }}>S</Text> */}
                    <ImageButton variant='Right' text={"% "+((dateNow.getTime() -  productModel.collectionTime.getTime())/(1000*3600*24)).toFixed(2)} iconName="hand-left-outline" iconColor={((dateNow.getTime() -  productModel.collectionTime.getTime())/(1000*3600*24) >= productModel.product.collectionFrequency ? "green" : "red")} iconSize={20} />
                   
                    {/* <Icon name="hand-left-outline" color={((dateNow.getTime() - productModel.collectionTime.getTime())/(1000*3600*24) >= productModel.product.collectionFrequency ? "green" : "red")} size={20} /> */}

                    {/* <Text style={{
                        color:
                            (new Date((dateNow - productModel.collectionTime)) >= productModel.collectionFrequency ? "blue" : "green"

                            )
                    }}>T</Text> */}
                </View>

            </View>

        </TouchableOpacity>

    )
    // console.log(productModel.irrigationTime)

    // console.log(productModel.product.irrigationFrequency)
    // console.log("==>",((dateNow.getTime() - productModel.irrigationTime.getTime())/(1000*3600*24)))
    return (

        [<View style={style}>
            {bComp}
        </View>,
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>


                    <Text>{pId} Alanını Parçala</Text>
                    <View style={{
                        flexDirection: "row",

                    }}>


                        <View >

                            <TextInput style={styles.textInputStyle}
                                onChangeText={(value) => setSatir(parseInt(value))}
                                placeholder='satır'
                            />

                            <TextInput style={styles.textInputStyle}

                                onChangeText={(value) => setSutun(parseInt(value))}
                                placeholder='sutun'
                            />

                        </View>
                        <View style={{ flexDirection: "row" }} >
                            <Pressable style={styles.buttonStyle}
                                onPress={() => {


                                    for (let row = 0; row < satir; row++) {
                                        let rowItems = [];

                                        for (let col = 0; col < sutun; col++) {

                                            const field: FieldType = {
                                                id: parseInt((uuid.v4().toString()).split('-')[0], 16),
                                                parentId: pId,
                                                location: {
                                                    row: row,
                                                    column: col
                                                },
                                                maps:{
                                                    color:"",
                                                    cordinats: [],
                                                },
                                                product: {
                                                    product: {
                                                        id: -1,
                                                        icon: null,
                                                        title: "Bos",
                                                        irrigationFrequency: 0,
                                                        collectionFrequency: 0,
                                                        growthTime: 0,
                                                        type:"",
                                                    },

                                                    irrigationTime: new Date(),
                                                    collectionTime: new Date(),
                                                    plantingDay: new Date(),
                                                    readyToCollect: false,

                                                },

                                            }
                                            fieldModel.addFields(field)

                                        }
                                    }

                                }}  >

                                <Text>
                                    Uygula
                                </Text>
                            </Pressable>

                        </View>
                    </View>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                            bComp = (

                                <TouchableOpacity style={{ borderWidth: 2 }}
                                    onPress={() => {
                                        useFieldStore.setState((state) => ({

                                            allFields: state.allFields.map((field) =>
                                                field.id === pId
                                                    ? {
                                                        ...field,
                                                        product: {
                                                            ...field.product,
                                                            ...(
                                                                actionModel.btnType.isPlanting
                                                                    ? actionModel.product
                                                                    : field.product
                                                            ),

                                                            irrigationTime: actionModel.btnType.isIrrigation ? new Date() : field.product?.irrigationTime,
                                                            collectionTime: actionModel.btnType.isCollection ? new Date() : field.product?.collectionTime,

                                                        },
                                                    }
                                                    : field
                                            ),
                                        }));

                                    }}
                                    onLongPress={() => {
                                        setModalVisible(true);
                                    }}>
                                    <View style={[styles.container, { justifyContent: "space-between", alignItems: "center" }]} >

                                        <Text>
                                            {modalInputText}
                                        </Text>

                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={{
                                                color:
                                                    ((dateNow.getTime() - productModel.irrigationTime.getTime())/(1000*3600*24) >= productModel.product.irrigationFrequency ? "blue" : "green"

                                                    )
                                            }}>S</Text>
                                            <Text style={{
                                                color:
                                                    ((dateNow.getTime() - productModel.collectionTime.getTime())/(1000*3600*24) >= productModel.product.collectionFrequency ? "blue" : "green"

                                                    )
                                            }}>T</Text>
                                        </View>

                                    </View>




                                </TouchableOpacity>

                            )

                        }

                        }>
                        <Text style={styles.textStyle}>Kapat</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>,

        ])
}

export default basic

const styles = StyleSheet.create({
    container: {
       
        flexDirection: "row",
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 10,
    },
    item: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 10,
    },
    textInputStyle: {
        fontSize: 20,
        textAlign: "center",
        borderWidth: 1,
    },

    buttonStyle: {
        padding: 20,

        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 55,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})