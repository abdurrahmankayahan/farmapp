import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import useProductStore, { getProductList, ProductType } from '../zustand/product'
import useActionStore from '../zustand/action'
import SearchList from './SearchList'
import Icon from "react-native-vector-icons/Ionicons";



export default function ActionElement() {


    const [modalVisible, setModalVisible] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState("")

    const actionModel = useActionStore()
    const data = useProductStore()

    return (
        [
            
                <View  style={{  marginTop: 4, alignItems: "flex-end", justifyContent: "flex-end" }}>
                   {isVisible?(
                    
                     
                   <View style={{  flexDirection: "row" }}>

                        <Pressable style={[styles.button, actionModel.btnType.isPlanting ? styles.buttonSelected : {}]}
                            onPress={() => {
                                !actionModel.btnType.isPlanting ?
                                    setModalVisible(true) : null;
                                useActionStore.setState((state) => ({
                                    btnType: {
                                        ...state.btnType, // Diğer değerleri korur
                                        isPlanting: !state.btnType.isPlanting, // isPlanting'i tersine çevirir (true -> false veya false -> true)
                                    },
                                }))

                            }}
                            onLongPress={() => {
                                setModalVisible(true);
                            }}
                        >

                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                <Icon name="leaf" size={20} color={"black"} />
                                <View>
                                    <Text style={{ textAlign: "center", color:"black"}}>Ekim</Text>
                                    <Text style={{ textAlign: "center", color:"black"}}>{actionModel.product.title === "" ? "...." : actionModel.product.title}</Text>
                                </View>
                            </View>

                        </Pressable>
                        <Pressable style={[styles.button, actionModel.btnType.isIrrigation ? styles.buttonSelected : {}]}
                            onPress={() => {
                                useActionStore.setState((state) => ({
                                    btnType: {
                                        ...state.btnType,
                                        isIrrigation: !state.btnType.isIrrigation,
                                    },
                                }))

                            }}
                        >

                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                <Icon name="water" size={20} color={"black"}/>
                                <Text style={{ textAlign: "center",color:"black" }}>Sulama</Text>

                            </View>

                        </Pressable>

                        <Pressable style={[styles.button, actionModel.btnType.isCollection ? styles.buttonSelected : {}]}
                            onPress={() => {
                                useActionStore.setState((state) => ({
                                    btnType: {
                                        ...state.btnType,
                                        isCollection: !state.btnType.isCollection,
                                    },
                                }))
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                <Icon name="hand-right" size={20} color={"black"}/>
                                <Text style={{ textAlign: "center",color:"black" }}>Toplama</Text>

                            </View>

                        </Pressable>

                        <Pressable style={[styles.button, actionModel.btnType.isSpraying ? styles.buttonSelected : {}]}
                            onPress={() => {
                                useActionStore.setState((state) => ({
                                    btnType: {
                                        ...state.btnType,
                                        isSpraying: !state.btnType.isSpraying,
                                    },
                                }))
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                <Icon name="bug" size={20} color={"black"}/>
                                <Text style={{ textAlign: "center", color:"black"}}>İlaçlama</Text>

                            </View>
                        </Pressable>
                    </View>
                   
                
                
                
                ):null}
                
                   
                    <View style={{ flexDirection:"row"}}>
                        <Pressable style={{flex:1, alignItems:"center"}}
                        onPress={()=>{
                            setIsVisible(!isVisible)
                        }}>
                            <Icon name={isVisible?"chevron-down":"chevron-up"} size={isVisible?15:25} color={"black"} />

                        </Pressable>
                    </View>

                </View>
           ,
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
                       <View style={{flexDirection:"row"}}>
                       <Text style={{flex:1, fontSize:25,alignSelf:"center",textAlign:"center"}} >Ürünler</Text>
                        <Pressable
                            style={{ backgroundColor: "red", borderRadius: 12, alignSelf: "flex-end", marginTop: 12, marginRight: 12, padding: 4 }}
                            onPress={() => {
                                setModalVisible(false);
                            }
                            
                        }>
                            <Text style={styles.textStyle}>X</Text>
                        </Pressable>

                                </View>

                        <SearchList
                            style={{ flex: 1, marginTop: 8 }}
                            data={data.allProduct}
                            renderItem={({ item }) =>

                                <Pressable
                                    style={{ padding: 2, marginTop: 4, borderBottomWidth: 2, alignItems: "center" }}
                                    onPress={() => {
                                        actionModel.product.title = item.title
                                        setModalVisible(false)
                                    }}>
                                    <Text style={{color:"black"}} > {item.title}</Text>
                                </Pressable>

                            }

                        />


                    </View>
                </View>



            </Modal>,



        ]
    )
}

const styles = StyleSheet.create({


    centeredView: {
        backgroundColor:"#ddda",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       paddingVertical:20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'gray',
        borderWidth:1,
        borderRadius: 20,
        width: "70%",
        height: "90%",
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
        flex: 1,
        justifyContent: 'center',
        minHeight: 45,
        marginHorizontal: 5,
        borderWidth: 2,
        borderRadius: 10

    },
    buttonSelected: {
        borderRadius: 10,
        justifyContent: "flex-start",
        backgroundColor: "aqua",
        borderWidth: 4
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

})