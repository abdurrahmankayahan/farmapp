import { Alert, FlatList, ListRenderItem, Pressable, StyleProp, StyleSheet, Switch, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteFinanceItem } from '../zustand/finance'

const FinanceList:
    React.FC<{
        data: any,
        renderItem?: ListRenderItem<any> | null | undefined,
        style?: StyleProp<ViewStyle>

    }> = ({ data, renderItem, style }) => {


        const [seacrhText, setSeacrhText] = useState("")
        const [sum, setSum] = useState(0)
        const filteredData = data.filter((item: any) =>
            item.title.toLowerCase().includes(seacrhText.toLowerCase())
        );

        const d = [{
            id: 0,
            title: "Salatalık 20kg",
            date: new Date(),
            cost: 100,

        }, {
            id: 1,
            title: "Domatesdeededd 100kg",
            date: new Date(),
            cost: 100,

        }, {
            id: 2,
            title: "Salatalık 20kg",
            date: new Date(),
            cost: 100,

        },]

        useEffect(() => {
           
          let tmp=0
            data.map( (value: any) => {
                 tmp+=value.cost
            })
            setSum(tmp)
            
        }, [data])

        return (
            <View style={style}>
                {/* <TextInput style={styles.textInputStyle} placeholder='Ara'
                onChangeText={setSeacrhText}
            /> */}
                <View style={{ marginTop: 8, borderBottomStartRadius: 20, borderBottomEndRadius: 20, borderBottomWidth: 3, justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={[styles.gridIdStyle, { fontWeight: "900" }]}> ID</Text>
                    <Text style={[styles.gridTitleStyle, { fontWeight: "900" }]}> AÇIKLAMA</Text>
                    <Text style={[styles.gridDateStyle, { fontWeight: "900" }]}> TARİH</Text>
                    <Text style={[styles.gridCostStyle, { fontWeight: "900" }]}>  ₺</Text>

                </View>
                <FlatList

                    style={styles.flatListStyle}
                    data={filteredData}
                    renderItem={renderItem ? renderItem :
                        ({ item, index }) =>
                        (

                            <Pressable onLongPress={() => {

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
                                            deleteFinanceItem(item.id)
                                        },
                                        style: "destructive",
                                    }
                                ])

                            }} >

                                <View key={index} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderTopWidth: 1, paddingVertical: 4 }}>

                                    <Text style={styles.gridIdStyle}> {item.id}</Text>
                                    <Text style={styles.gridTitleStyle}> {item.title}</Text>
                                    <Text style={styles.gridDateStyle}> {item.date != "" ? new Date(item.date).toDateString() : ""}</Text>
                                    <Text style={styles.gridCostStyle}> {item.cost} ₺</Text>

                                </View>
                            </Pressable>
                        )


                    }


                />
                <View style={{ marginTop: 8,
                     borderBottomStartRadius: 20, 
                     borderBottomEndRadius: 20, 
                     borderBottomWidth: 3, 
                     borderTopStartRadius: 20, 
                     borderTopEndRadius: 20,
                      borderTopWidth: 3,
                     justifyContent: "flex-end", 
                     flexDirection: "row" }}>

                    <Text style={[styles.gridCostStyle, { fontWeight: "900" }]}> {sum} ₺</Text>

                </View>

            </View>
        )
    }

export default FinanceList

const styles = StyleSheet.create({
    gridIdStyle: {
        width: "10%",
        textAlign: "center",
        alignSelf: "center",
        color: "black"

    },
    gridTitleStyle: {
        width: "40%",
        textAlign: "center",
        alignSelf: "center",
        color: "black"
    },
    gridDateStyle: {
        width: "25%",
        textAlign: "center",
        alignSelf: "center",
        color: "black"

    },
    gridCostStyle: {
        width: "15%",
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
    }
})