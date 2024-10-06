import { Image, StyleSheet, Switch, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'

import useProductStore from '../zustand/product'


const productView: React.FC<{ title: string }> = ({ title }) => {



    const product = useProductStore();
    const [dateNow, setDateNow] = useState<Date>()
    useEffect(() => {
        const interval = setInterval(() => {
            setDateNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // {


    //     // İki tarih arasındaki farkı milisaniye cinsinden hesapla
    //     const timeDifference =  new Date()-product.irrigationTime;


    //     const differenceDate = new Date(timeDifference);
    //     // LOG  1969-12-02   T  04:36:30.102Z

    //   console.log(differenceDate)
    //   console.log(product.irrigationFrequency)




    //     // Şimdi bu differenceDate'i kullanarak farkı gün, saat, dakika ve saniye olarak hesaplayabilirsin
    //     const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //     const hours = differenceDate.getUTCHours();
    //     const minutes = differenceDate.getUTCMinutes();
    //     const seconds = differenceDate.getUTCSeconds();

    //     console.log(`Geçen süre: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`);

    // }

    return (
        [
            <Text>dd</Text>,
            <View style={[styles.container,{justifyContent:"space-between", alignItems:"center"}]} >
             
                <Text>
                    {title}
                </Text>

                <View style={{justifyContent:"center"}}>
                    <Text style={{fontSize:30,
                        color:
                            (new Date((dateNow - product.irrigationTime)) >= product.irrigationFrequency ? "white" : "green"

                            )
                    }}>S</Text>
                    <Text style={{
                        color:
                            (new Date((dateNow - product.collectionTime)) >= product.collectionFrequency ? "blue" : "green"

                            )
                    }}>T</Text>
                </View>

            </View>]
    )
}

export default productView

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flexDirection: "row",
    },
    iconStyle: {
        borderWidth: 1,
        width: 50,
        height: 50,
        margin: 5,
    }



})




// <View style={styles.container}  >


// <Icon style={styles.iconStyle} name="home-solid" />
// <View style={{ flex: 1 }}>

//     <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-evenly" }}>
//         <Text>BİBER</Text>
//         <Text>status: </Text>
//         <Text style={{
//             color:
//                 (new Date((dateNow - product.irrigationTime)) >= product.irrigationFrequency ? "blue" : "green"

//                 )
//         }}>S</Text>
//         <Text style={{
//             color:
//                 (new Date((dateNow - product.collectionTime)) >= product.collectionFrequency ? "blue" : "green"

//                 )
//         }}>T</Text>
//     </View>
//     <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-evenly" }}>
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//             <Text>Sulama: </Text>
//             <Text>{product.irrigationTime.toLocaleString()}</Text>

//         </View>
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//             <Text>Toplama: </Text>
//             <Text> {product.collectionTime.toLocaleString()}</Text>
//         </View>
//     </View>
// </View>
// </View>,