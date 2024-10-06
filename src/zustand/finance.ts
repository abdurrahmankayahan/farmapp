import { collection, doc, Firestore, getDocs, query, setDoc } from "firebase/firestore";
import { Image } from "react-native";
import { create } from "zustand";
import { convertTimestampsToDate, db } from "../../firebaseConfig";
import useUserStore from "./user";
import uuid from "react-native-uuid"
import { useEffect } from "react";

export type FinanceType = {

    id: number,
    title: string,
    date: Date,
    cost: number

}


type FinanceTypeAction = {



}
type Finance = (FinanceType & FinanceTypeAction);

export const getFinanceList = async () => {

    const qry = query(collection(db, "fields"))
    try {
        // Sorguyu çalıştırıyoruz
        const querySnapshot = (await getDocs(qry)).docs.filter(val => val.id === useUserStore.getState().token)[0];
        // Sonuçları işliyoruz
        const dateConvert = convertTimestampsToDate(querySnapshot.data()["finance"])

        // Sonuçları işliyoruz
        useFinanceStore.setState({ incomeList: dateConvert["income"] })
        useFinanceStore.setState({ expenseList: dateConvert["expense"]! })

    } catch (error) {

        console.error('Error getting documents: ', error);
    }

}

export const deleteFinanceItem=async(id:number)=>{

    useFinanceStore.setState({
        expenseList:await(useFinanceStore.getState().expenseList.filter(val=>val.id!=id)),
        incomeList:await(useFinanceStore.getState().incomeList.filter(val=>val.id!=id))
    })
console.log(useFinanceStore.getState().incomeList)
console.log(useFinanceStore.getState().expenseList)

}


const useFinanceStore = create<({ data: FinanceType, incomeList: FinanceType[], expenseList: FinanceType[] })>((set) => ({

    data: {
        id: parseInt((uuid.v4().toString()).split('-')[0], 16),
        title: "",
        date: new Date(),
        cost: 0
    },
    incomeList: [],
    expenseList: [],


}))

export const SaveFinance = async () => {
    try {
        // await addDoc(collection(db,"fields"),field);// auto id ile  set doc ile isimlendirme yapabilirsin
        const docRef = await setDoc(doc(db, "fields", useUserStore.getState().token),
            {
                "finance": {
                    "expense": useFinanceStore.getState().expenseList,
                    "income": useFinanceStore.getState().incomeList,

                }
            }, { merge: true }
        );


        console.log("Document written with ID: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}



export default useFinanceStore


