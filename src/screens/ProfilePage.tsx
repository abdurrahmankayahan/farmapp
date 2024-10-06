import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import ImageButton from '../components/ImageButton'
import useUserStore from '../zustand/user'
import AsyncStorage from '@react-native-async-storage/async-storage'






const ProfilePage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    const userModel = useUserStore()
    useEffect(() => {
        setEmail(userModel.email!);
        setPassword(userModel.password!);
        setToken(userModel.token!)
    }, [userModel])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Icon style={styles.imageStyle} name='person' size={50} />

            </View>
            <View style={styles.content}>

                <Text style={styles.textStyle}> Token </Text>
                <TextInput style={[{}, styles.textInputStyle]}
                    value={token}
                    editable={false}
                    placeholder='Kullanıcı token bilgisi  ...'
                />




                <Text style={styles.textStyle}> E Posta </Text>
                <TextInput style={[{}, styles.textInputStyle]}
                    value={email}
                    editable={false}

                    onChangeText={(value) => {
                        (setEmail(value))

                    }}
                    placeholder='E-Posta Giriniz ...'
                />
                <Text style={styles.textStyle}> Şifre </Text>
                <TextInput style={[{}, styles.textInputStyle]}
                    value={password}

                    onChangeText={(value) => {
                        setPassword(value)

                    }}
                    placeholder='Şifre Giriniz ...'
                    secureTextEntry={true}


                />

                <View style={styles.buttonContainer}>
                    <ImageButton
                        styleView={[{ backgroundColor: "aqua" }, styles.buttonStyle]}
                        variant='Left'
                        iconName='save'
                        text='Bilgilerimi Kaydet'
                        styleText={{color:"black"}}

                        onPress={() => {

                        }}
                        iconSize={25}
                        iconColor='black' />

                    <ImageButton
                        styleView={[{ backgroundColor: "orangered" }, styles.buttonStyle]}
                        variant='Left'
                        iconName='close'
                        iconColor='white'
                        text='Çıkış Yap'
                        styleText={{color:"black"}}
                        onPress={async () => {
                            try {
                                await AsyncStorage.removeItem('user');
                                useUserStore.setState({ isAuth: false, password: "", email: "", token: "" })
                            } catch (error) {
                                console.error('Error logging out', error);
                            }
                        }}
                        iconSize={25} />

                </View>
            </View>



        </View>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato"
    },
    imageContainer: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        marginBottom: 8,
    },
    imageStyle: {
        margin: 8,
        borderWidth: 1,
        borderRadius: 40,
        padding: 16,

    },
    content: {

        flex: 1,
        justifyContent: "center"

    },
    contentItem: {

    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",

    },
    buttonStyle: {
        flex: 0,
        borderWidth: 1,
        borderRadius: 20,
        margin: 4,
        padding: 8,
    },
    textStyle: {
        marginVertical: 5,
        textAlign: "center",
        fontSize: 16
    },
    textInputStyle: {
        color: "black",
        height: 40,
        marginHorizontal: "10%",
        textAlign: "center",
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
    }

})