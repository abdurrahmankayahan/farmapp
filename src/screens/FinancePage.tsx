import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import FinanceList from '../components/FinanceList'
import useFinanceStore, { FinanceType, getFinanceList, SaveFinance } from '../zustand/finance'
import DatePicker from 'react-native-date-picker'
import uuid from 'react-native-uuid';

const FinancePage = () => {

    const [isIncome, setIsIncome] = useState(false)
    const [isExpense, setIsExpense] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const financeModel = useFinanceStore()
    
    const [isLoading, setIsLoading] = useState(false)
   
    useEffect(() => {
        setIsLoading(true)
        const getFinance=async()=>{
            await getFinanceList()
            setIsLoading(false)
        }
        getFinance();

        return () => {
            console.log("saveFİnance")
         //   SaveFinance()
        }
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.buttonContainer}>

                <Pressable style={[styles.button, isIncome ? styles.buttonSelected : null]}
                    onPress={() => {
                        setIsIncome(!isIncome)
                        setIsExpense(false)
                    }}>
                    <Icon name="arrow-back" size={20} />
                    <Text>Gelir</Text>

                </Pressable>

                <View style={{ borderWidth: 1 }} />

                <Pressable style={[styles.button, isExpense ? styles.buttonSelected : null]}

                    onPress={() => {
                        setIsExpense(!isExpense)
                        setIsIncome(false)
                    }}>
                    <Text>Gider</Text>
                    <Icon name="arrow-forward" size={20} />
                </Pressable>


            </View>



            <View style={styles.contentView}>

                {isIncome ?

                    <View style={styles.content}>
                        <FinanceList
                            data={financeModel.incomeList}
                        />

                    </View>

                    : isExpense ?

                        <View style={styles.content}>
                            <FinanceList
                                data={financeModel.expenseList}
                            />

                        </View>

                        :

                        <View style={styles.content}>
                            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "500" }}>ÖZET</Text>
                            <FinanceList
                                data={[...financeModel.incomeList, ...financeModel.expenseList]}
                            />

                        </View>

                }

            </View>
            <View>

            </View>

            {
                !isExpense && !isIncome ? null : (<View style={styles.floatButtonView} >
                    <Pressable style={styles.floatButton}
                        onPress={() => {
                            setIsVisible(true)
                        }}>
                        <Icon name='add' size={40} color={"black"}/>
                    </Pressable>
                </View>)
            }



            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');

                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>

                        <View style={styles.modalContent}>


                            <Text style={styles.modalText} >{isIncome ? "Gelir Açıklama" : isExpense ? "Gider Açıklama" : "Gelir/Gider Açıklama"}</Text>

                            <TextInput style={styles.modalTextInput}

                                multiline={true}
                                maxLength={45}
                                placeholder='Açıklama Ekleyin'
                                onChangeText={v => financeModel.data.title = v}
                            />

                            <Text style={styles.modalText} >{isIncome ? "Gelir Miktar" : isExpense ? "Gider Miktar" : "Gelir/Gider Miktar"}</Text>

                            <TextInput style={styles.modalTextInput}

                                placeholder='MİKTAR (₺) Giriniz '
                                inputMode="numeric"
                                onChangeText={v => financeModel.data.cost = Number.parseInt(v)}
                            />

                            <DatePicker date={financeModel.data.date! ? financeModel.data.date : new Date()} onDateChange={v => financeModel.data.date = v} />



                        </View>



                        <View style={styles.modalButtonContainer}>

                            <Pressable style={styles.modalButton}
                                onPress={() => {
                                    setIsVisible(false)
                                }} >
                                <Icon name="close" size={30} color={"black"}/>
                                <Text>Close</Text>
                            </Pressable>

                            <Pressable style={styles.modalButton}
                                onPress={() => {
                                    const data = financeModel.data;
                                    useFinanceStore.setState(state => ({

                                        expenseList: isExpense ? [
                                            ...state.expenseList, {
                                                ...data,
                                                cost: -1 * data.cost,
                                            }] : [...state.expenseList],

                                        incomeList: isIncome ? [
                                            ...state.incomeList,
                                            { ...data }
                                        ] : [...state.incomeList]
                                    }
                                    ))

                                    useFinanceStore.setState({
                                        data:
                                        {
                                            id: parseInt((uuid.v4().toString()).split('-')[0], 16),
                                            title: "",
                                            date: new Date(),
                                            cost: 0
                                        }
                                    })


                                    setIsVisible(false);


                                }}>
                                <Icon name="save" size={30} color={"black"}/>
                                <Text>Save</Text>
                            </Pressable>




                        </View>

                    </View>

                </View>

            </Modal>


            {isLoading ? <View style={styles.loadingContainer}>
                <ActivityIndicator color={"red"} size={"large"}></ActivityIndicator>
            </View> : null
            }


        </View>
    )
}

export default FinancePage

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
    content: {
        flex: 1,
        backgroundColor: "tomato"
    },
    contentView: {
        flex: 1,
        backgroundColor: "tomato"
    },
    buttonContainer: {
        justifyContent: "space-between",
        marginHorizontal: 8,
        flexDirection: "row",
        borderBottomWidth: 2,
        padding: 4,
    },
    button: {
        flexDirection: "row",
        minHeight: 30,
        borderWidth: 1,
        marginHorizontal: 8,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#aaa"
    },
    buttonSelected: {
        backgroundColor: "#888"
    },
    floatButtonView: {

        pointerEvents: "box-none",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 16,
        right: 16

    },
    floatButton: {
        backgroundColor: "aqua",
        borderWidth: 2,
        borderRadius: 50,
    },
    modalContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,


    },
    modalView: {
        margin: 20,
        backgroundColor: '#ddd',
        borderRadius: 20,
        width: "90%",
        height: "80%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, modalContent: {
        margin: 8,
        borderRadius: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#999",


    }, modalText: {
        margin: 4,
        fontSize: 20,

    },
    modalTextInput: {
        width: "100%",
        textAlign: "center",
        margin: 4,
        fontSize: 30,
        backgroundColor: "aqua"
    },
    modalButtonContainer: {

        marginVertical: 8,
        marginHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    modalButton: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "aqua",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 8

    }


})