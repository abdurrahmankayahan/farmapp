import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductList from '../components/ProductList'
import useProductStore, { SaveProduct } from '../zustand/product'
import ImageButton from '../components/ImageButton'
import uuid from "react-native-uuid"

const ProductPage = () => {
    const productModel = useProductStore()
    return (
        <SafeAreaView style={styles.container}>

            <ProductList data={productModel.allProduct}/>

            {/* <ImageButton variant='Left' iconName='home' text='deneme' iconSize={50} onPress={() => {
                productModel.allProduct.map((value) => {
                    value.id = parseInt((uuid.v4().toString()).split('-')[0], 16)
                })
             SaveProduct()
            }} /> */}

        </SafeAreaView>
    )
}

export default ProductPage

const styles = StyleSheet.create({
    container: {
    },
})