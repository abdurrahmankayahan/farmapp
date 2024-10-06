
import { create } from "zustand";
import { auth, convertTimestampsToDate, db } from '../../firebaseConfig';
import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import useUserStore from "./user";
import { ProductOfFields, ProductType } from "./product";
import useActionStore, { ActionButtonType, ActionElementType } from "./action";
import { LatLng } from "react-native-maps";
import { firebase } from "@react-native-firebase/database";






export type FieldType = {
    id: number,
    parentId: number,
    location: { row: number, column: number },
    maps: {
        color: string,
        cordinats: LatLng[]
    }
    product: ProductOfFields,

}
type FieldActionType = {
    addFields: (field: FieldType) => void,

    updateFieldProduct: (pId: number) => void

}
type Field = (FieldType & FieldActionType)
export const SaveFields = async () => {


    try {
        // await addDoc(collection(db,"fields"),field);// auto id ile  set doc ile isimlendirme yapabilirsin
        const docRef = await setDoc(doc(db, "fields", useUserStore.getState().token),
            {
                "UID": useUserStore.getState().token,
                "allFields": useFieldStore.getState().allFields,
            }, { merge: true }
        );


        console.log("Fields Document written with ID: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }


}

export const deleteFieldsItem=(id:number)=>{
    useFieldStore.setState({ allFields:(useFieldStore.getState().allFields.filter(val=>val.id!=id))})
}

export const getAllFields = async () => {


    const qry = query(collection(db, "fields"))

    try {
        // Sorguyu çalıştırıyoruz
        const querySnapshot = (await getDocs(qry)).docs.filter(val => val.id === useUserStore.getState().token)[0];
        // Sonuçları işliyoruz
        const dateConvert = convertTimestampsToDate(querySnapshot.data()["allFields"])


        useFieldStore.setState({ allFields: dateConvert })
    } catch (error) {

        console.error('Error getting documents: ', error);
    }
}




const useFieldStore = create<Field & { allFields: FieldType[] }>((set, get) => ({

    id: 0,
    parentId: 0,
    location: { row: 0, column: 0 },
    maps: {
        color: "",
        cordinats: [],
    },
    product: <ProductOfFields>{
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

    }

    ,
    allFields: [

        // {
        //     id: 1,
        //     parentId: 0,
        //     title: "",
        //     location: { row: 0, column: 0 },
        //     maps:{
        //         color:"",
        //         cordinats: [],
        //     },
        //     product: {
        //         product: {

        //             id: -1,
        //             icon: null,
        //             title: "BOS",
        //             irrigationFrequency: 0,//new Date("1970-01-01T00:00:10"),
        //             collectionFrequency:  0,//new Date("1970-01-01T00:46:30"),
        //             growthTime: -1,
        //         },

        //         irrigationTime: new Date("2024-09-04T20:00:00"),
        //         collectionTime: new Date("2024-09-04T17:00:00"),
        //         plantingDay: new Date(),
        //         readyToCollect: false,

        //     },

        // }

    ],




    addFields: (field: FieldType) => set(state => ({ allFields: [...state.allFields, field] })),



    updateFieldProduct: (pId: number) => {
        const btnType = useActionStore.getState().btnType;
        const product = useActionStore.getState().product;
        const tmp = get().allFields.map((field) =>
            field.id === pId
                ? {
                    ...field,
                    product: {
                        ...field.product,
                        product: {
                            ...(
                                btnType.isPlanting
                                    ? product
                                    : field.product.product
                            ),
                        },


                        irrigationTime: btnType.isIrrigation ? new Date() : field.product?.irrigationTime,
                        collectionTime: btnType.isCollection ? new Date("2024-09-18T04:00:00") : field.product?.collectionTime,

                    },
                }
                : field
        );
        console.log(tmp)
        set((state) => ({

            allFields: [...tmp]
        }));
    },


    // prd:  (pId: number) => {

    //     const action = useActionStore.getState().btnType;
    //     const prd = useActionStore.getState().product;

    //     if (action.isPlanting) {


    //         useFieldStore.setState((state) => ({
    //             allFields: state.allFields.map((field) =>
    //                 field.id === pId
    //                     ? { ...field, product: prd }
    //                     : field
    //             ),
    //         }));

    //     }
    //     if (action.isIrrigation) {


    //         useFieldStore.setState((state) => ({
    //             allFields: state.allFields.map((field) =>
    //                 field.id === pId
    //                     ? {
    //                         ...field, product: {
    //                             ...state.product,
    //                             irrigationTime: new Date(),
    //                         }
    //                     }
    //                     : field
    //             ),
    //         }));
    //     }
    //     if (action.isCollection) {

    //         useFieldStore.setState((state) => ({
    //             allFields: state.allFields.map((field) =>
    //                 field.id === pId
    //                     ? {
    //                         ...field, product: {
    //                             ...state.product,
    //                             collectionTime: new Date(),
    //                         }
    //                     }
    //                     : field
    //             ),
    //         }));
    //     }
    //     if (action.isSpraying) {

    //     }

    //     console.log(useFieldStore.getState().allFields)
    // }


    //     (

    //     get().fields.filter(element=>element.id===field.parentId).at(0)?.fields
    // )

}))




export default useFieldStore;





