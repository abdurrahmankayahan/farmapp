import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
// ];
const DATA = [
    <Pressable onPress={()=>{console.log("selectItems")}}>

   <Text>deneme</Text>
    </Pressable>,   
     <Pressable onPress={()=>{console.log("selectItems2")}}>

<Text>deneme2</Text>
 </Pressable>
];
type ItemProps = { title: string };
const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const SelectItems = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => item}
                //keyExtractor={item => item.id}
            />


            <Text>SelectItems</Text>
        </View>
    )
}

export default SelectItems

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "50%",
        backgroundColor: "red"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

})