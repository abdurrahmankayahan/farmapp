import { Alert, FlatList, Image, ListRenderItem, Modal, Pressable, StyleProp, StyleSheet, Switch, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteFinanceItem } from '../zustand/finance'
import Icon from 'react-native-vector-icons/Ionicons'
import { deleteProductItem, ProductType, updateProductItem } from '../zustand/product'
import ImageButton from './ImageButton'
import SelectItems from './SelectItems'

const ProductList:
    React.FC<{
        data: any,
        renderItem?: ListRenderItem<any> | null | undefined,
        style?: StyleProp<ViewStyle>

    }> = ({ data, renderItem, style }) => {


        const [seacrhText, setSeacrhText] = useState("")
        const [modalvisible, setModalVisible] = useState(false)
        const [selectedItem, setSelectedItem] = useState<ProductType>()



        const filteredData = data.filter((item: any) =>
            item.title.toLowerCase().includes(seacrhText.toLowerCase())
        );




        return (
            [<View style={style}>
                <TextInput style={styles.textInputStyle} placeholder='Ara'
                onChangeText={setSeacrhText}
            />
                <View style={{ marginTop: 8, borderBottomStartRadius: 20, borderBottomEndRadius: 20, borderBottomWidth: 3, justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={[styles.gridIdStyle, { width: "10%", fontWeight: "900" }]}> ID</Text>
                    <Text style={[styles.gridIdStyle, { width: "10%", fontWeight: "900" }]}> </Text>
                    <Text style={[styles.gridIdStyle, { width: "40%", fontWeight: "900" }]}> MEYVE / SEBZE</Text>
                    <Text style={[styles.gridTitleStyle, { width: "20%", fontWeight: "900" }]}> GELİŞME GÜN</Text>
                    <Text style={[styles.gridTitleStyle, { width: "20%", fontWeight: "900" }]}> TARİH</Text>


                </View>
                <FlatList

                    style={styles.flatListStyle}
                    data={filteredData}
                    renderItem={renderItem ? renderItem :
                        ({ item, index }) =>
                        (

                            <Pressable
                                key={"press" + index}
                                onPress={() => {
                                    setModalVisible(true)
                                    setSelectedItem(item)
                                }}
                                onLongPress={() => {

                                    Alert.alert("Sil", "Seçilen satırı silmek istiyor musun?", [
                                        {
                                            text: "iptal",
                                            onPress: () => {

                                            },
                                            style: "cancel"
                                        },
                                        {
                                            text: "Sil",
                                            onPress: () => {
                                                console.log(item.id)
                                                deleteProductItem(item.id)
                                            },
                                            style: "destructive",
                                        }
                                    ])

                                }} >

                                <View style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderTopWidth: 1, paddingVertical: 4 }}>

                                    <View style={{ flexDirection: 'row' }} >
                                        <Text style={styles.gridIdStyle}>{item.id}</Text>
                                        {/* <Text style={styles.gridIconStyle}> {item.icon} icon</Text> */}
                                        <Icon style={[styles.gridIconStyle,{ alignSelf:"center",}]} name='leaf' size={40} />
                                        <View style={{alignItems:"center", justifyContent:"center", width: "40%" }} >

                                            <Text style={styles.gridTitleStyle}> {item.title}</Text>

                                            <Text style={[styles.gridTitleStyle, { fontWeight: "bold" }]}> {item.type} </Text>

                                        </View>

                                        <View style={{ alignItems:"center", justifyContent:"center", width: "20%" }} >

                                            <Text style={styles.gridTitleStyle}> {item.growthTime} </Text>

                                            <Text style={[styles.gridTitleStyle, { fontWeight: "bold" }]}> Gün </Text>

                                        </View>



                                        <View style={{ width: "20%" }} >
                                            <View style={{ flexDirection: "row" }}>

                                                <Text style={styles.gridDateStyle}> {item.irrigationFrequency}</Text>
                                                <Icon name='water' size={20} />

                                            </View>
                                            <View style={{ flexDirection: "row" }}>

                                                <Text style={styles.gridDateStyle}> {item.collectionFrequency}</Text>
                                                <Icon name='hand-right' size={20} />

                                            </View>

                                            <View style={{ flexDirection: "row" }}>

                                                <Text style={styles.gridDateStyle}> {item.irrigationFrequency}</Text>
                                                <Icon name='bug' size={20} />

                                            </View>

                                        </View>



                                    </View>


                                </View>
                            </Pressable>
                        )


                    }


                />

                <View style={{
                    marginTop: 8,
                    borderBottomStartRadius: 20,
                    borderBottomEndRadius: 20,
                    borderBottomWidth: 3,
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                    borderTopWidth: 3,
                    justifyContent: "flex-end",
                    flexDirection: "row"
                }}>



                </View>





            </View>,
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalvisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');

                }}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={{ borderBottomWidth: 2, paddingBottom: 4, flexDirection: "row" }}>
                            <Icon style={{ marginHorizontal: 8 }} name='leaf' size={40} />

                            <Text style={{ flex: 1, fontSize: 25, alignSelf: "center", textAlign: "center" }} >{selectedItem?.type}</Text>
                            <Pressable
                                style={{ backgroundColor: "red", borderRadius: 12, alignSelf: "flex-end", marginTop: 12, marginRight: 12, padding: 4 }}
                                onPress={() => {
                                    setModalVisible(false);
                                }

                                }>
                                <Text style={styles.textStyle}>X</Text>
                            </Pressable>

                        </View>


                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 25, alignSelf: "center", textAlign: "center" }} >{selectedItem?.title}</Text>

                            <Text>Büyüme Zamanı (/GÜN)</Text>

                            <View style={{ flexDirection: "row" }}>

                                <TextInput style={styles.gridDateStyle}
                                    placeholder={selectedItem?.growthTime.toString()}
                                    onChangeText={(value) => {

                                        selectedItem!.growthTime = parseInt(value)
                                    }

                                    } />
                                <Icon name='leaf' size={20} />
                            </View>


                            <Text>Sulama Sıklığı (/GÜN)</Text>
                            <View style={{ flexDirection: "row" }}>

                                <TextInput style={styles.gridDateStyle}
                                    placeholder={selectedItem?.irrigationFrequency.toString()}
                                    onChangeText={(value) => {

                                        selectedItem!.irrigationFrequency = parseInt(value)
                                    }

                                    } />
                                <Icon name='water' size={20} />

                            </View>
                            <Text>Toplama Sıklığı (/GÜN)</Text>

                            <View style={{ flexDirection: "row" }}>

                                <TextInput style={styles.gridDateStyle}
                                    placeholder={selectedItem?.collectionFrequency.toString()}
                                    onChangeText={(value) => {

                                        selectedItem!.collectionFrequency = parseInt(value)
                                    }

                                    } />
                                <Icon name='hand-right' size={20} />
                            </View>

                            <Text>İlaçlama Sıklığı (/GÜN)</Text>


                            <View style={{ flexDirection: "row" }}>

                                <TextInput style={styles.gridDateStyle}
                                    placeholder={selectedItem?.irrigationFrequency.toString()}
                                    onChangeText={(value) => {

                                        selectedItem!.irrigationFrequency = parseInt(value)
                                    }

                                    } />
                                <Icon name='bug' size={20} />

                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <ImageButton 
                                styleView={styles.buttonStyle} 
                                variant='Left' 
                                iconName='close' 
                                iconSize={30} 
                                text='İptal'
                                onPress={()=>{
                                    setModalVisible(false)
                                }} />

                                <ImageButton
                                 styleView={styles.buttonStyle} 
                                 variant='Left' 
                                 iconName='save'
                                 iconSize={30} 
                                 text='Kaydet' 
                                 onPress={()=>{
                                    updateProductItem(selectedItem!)
                                    setModalVisible(false)

                                 }}
                                />
                            </View>

                        </View>



                    </View>
                </View>



            </Modal>]
        )
    }

export default ProductList

const styles = StyleSheet.create({
    gridIdStyle: {
        width: "10%",
        textAlign: "center",
        alignSelf: "center",
        color: "black"

    },
    gridTitleStyle: {
        marginVertical: 2,
        textAlign: "center",
        alignSelf: "center",
        color: "black"
    },
    gridDateStyle: {
        fontSize: 20,
        flex: 1,
        borderWidth: 1,
        marginVertical: 2,
        textAlign: "center",
        alignSelf: "center",
        color: "black"

    },
    gridIconStyle: {
        width: "10%",

        alignSelf: "stretch",

        color: "black"
    },
    gridCostStyle: {
        width: "20%",

        textAlign: "center",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    },

    textInputStyle: {
        borderWidth: 2,
        backgroundColor: "red",
        fontSize: 28,
        textAlign: "center"

    },
    flatListStyle: {
        backgroundColor: "cyan"
    },

    centeredView: {
        backgroundColor: "#ddda",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'gray',
        borderWidth: 1,
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
    textStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonStyle: {

        borderWidth: 1,
        borderRadius:20,
        margin: 4,
        flex: 1,
    }

})