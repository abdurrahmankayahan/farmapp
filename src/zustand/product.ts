import { collection, doc, Firestore, getDocs, query, setDoc } from "firebase/firestore";
import { Image } from "react-native";
import { create } from "zustand";
import { db } from "../../firebaseConfig";



export type ProductType = {

    id: number,
    icon: Image | null,
    title: string,
    irrigationFrequency: number,
    collectionFrequency: number,
    growthTime: number
    type: string

}

export type ProductOfFields = {
    product: ProductType
    irrigationTime: Date,
    collectionTime: Date,
    plantingDay: Date,
    readyToCollect: boolean,
}

type ProductActionType = {
    isReadyToCollect: () => void,


}
type Product = (ProductOfFields & ProductActionType);

export const getProductList = async () => {


    const qry = query(collection(db, "product"))
    try {
        // Sorguyu çalıştırıyoruz
        const querySnapshot = await getDocs(qry);
        // Sonuçları işliyoruz
        useProductStore.setState({ allProduct: querySnapshot.docs[0].data()["data"] })
    } catch (error) {

        console.error('Error getting documents: ', error);
    }

}
getProductList()

const useProductStore = create<(Product & { allProduct: ProductType[] })>((set) => ({
    product: {
        id: -1,
        icon: null,
        title: "",
        irrigationFrequency: 1,//new Date("1970-01-01T00:39:0.000Z"),
        collectionFrequency: 1,//new Date("1970-01-01T00:46:30.000Z"),
        growthTime: -1,
        type: "",
    },
    irrigationTime: new Date("2024-09-04T18:00:00"),
    collectionTime: new Date("2024-09-04T17:00:00"),
    plantingDay: new Date(),
    readyToCollect: false,

    allProduct: [],
    isReadyToCollect: () => (set(state => ({
        product: {
            ...state.product,
            id: 0
        }


    }))),


}))

export const deleteProductItem = async (id: number) => {

    useProductStore.setState({
        allProduct: await (useProductStore.getState().allProduct.filter(val => val.id != id)),
    })
    SaveProduct()
}
export const updateProductItem = async (prd: ProductType) => {

    useProductStore.setState({
        allProduct: await (useProductStore.getState().allProduct.map(
            (val) => {
                return (val.id === prd.id ? val = prd : val)!
    
            }))
    })
    SaveProduct()
}


export const SaveProduct = async () => {
    try {
        // await addDoc(collection(db,"fields"),field);// auto id ile  set doc ile isimlendirme yapabilirsin
        const docRef = await setDoc(doc(db, "product/Meyve-Sebze"),
            {
                "data":
                    useProductStore.getState().allProduct,

            }, { merge: true }
        );


        console.log("Document written with ID: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}





export default useProductStore

