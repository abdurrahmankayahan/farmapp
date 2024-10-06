import { FlatList, ListRenderItem, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'

const SearchList: React.FC<{ data: any ,renderItem:ListRenderItem<any> | null | undefined ,style?:StyleProp<ViewStyle> }> = ({ data,renderItem,style}) => {


    const [seacrhText, setSeacrhText] = useState("")

    const filteredData = data.filter((item:any) =>
        item.title.toLowerCase().includes(seacrhText.toLowerCase())
      );
    return (
        <View style={style}>
            <TextInput style={styles.textInputStyle} placeholder='Ara'
                onChangeText={setSeacrhText}
            />
            <FlatList
            
                style={styles.flatListStyle}
                data={filteredData}
                renderItem={renderItem}


            />
        </View>
    )
}

export default SearchList

const styles = StyleSheet.create({
    textInputStyle: {
        borderWidth:2,
        backgroundColor: "tomato",
        fontSize:20,
        textAlign: "center"

    },
    flatListStyle: {
        backgroundColor: "lightgray"
    }
})