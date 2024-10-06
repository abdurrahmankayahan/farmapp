import { create } from "zustand";
import { ProductType } from "./product";

export type ActionButtonType = {
    isPlanting: boolean ,
    isIrrigation: boolean ,
    isCollection: boolean ,
isSpraying:boolean,
}

export type ActionElementType = {
    btnId: string,
    btnType: ActionButtonType,
    product: ProductType
}



// const useActionStore = () => ({
//     btnId: "",
//     btnType: {
//         isPlanting: false,
//         isCollection: false,
//         isIrrigation: false,
//         isSpraying:false
//     },
//     product: {
//         id: 0,
//         icon: null,
//         title: "",
//         irrigationFrequency: new Date("1970-01-01T00:39:0.000Z"),
//         collectionFrequency: new Date("1970-01-01T00:46:30.000Z"),
//         growthTime: 50,
//     }



// })

const useActionStore = create<ActionElementType>((set) => ({
    btnId: "",
    btnType: {
        isPlanting: false,
        isCollection: false,
        isIrrigation: false,
        isSpraying:false
    },
    product: {
        id: 0,
        icon: null,
        title: "",
        irrigationFrequency: 3,
        collectionFrequency: 2,
        growthTime: 50,
    }



}))

export default useActionStore;