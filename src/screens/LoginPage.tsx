/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import LoginIndicator from '../components/LoginIndicator';
import useUserStore, { Login, UserType } from '../zustand/user';
import { getAllFields } from '../zustand/field';

// import { useDispatch, useSelector } from 'react-redux';
// import { setEmail, setPassword, setIsLoading } from '../redux/userSlice';
// import { Login } from '../redux/userSlice';




// console.log(user.deneme)

const LoginPage = ({ navigation, route }:any) => {




    // const user:UserType=useUserStore((state:any)=>state.user)

    const user: UserType = useUserStore()

    // const isLoading=useUserStore((state:any)=>state.isLoading)
    // const setIsLoading=useUserStore((state:any)=>state.setIsLoading)
    // const IsAuth=useUserStore((state:any)=>state.isAuth)


    //const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const { email, password, isLoading } = useSelector((state: any) => state.user)
    // const dispatch = useDispatch()


 
    return (

        <SafeAreaView style={{ backgroundColor:"lightblue", justifyContent: "center", flex: 1 }}>



            {user.isLoading ? <LoginIndicator name={email} /> : null}
            <Text style={styles.textStyle}> E Posta </Text>
            <TextInput style={[{}, styles.textInputStyle]}
                value={email}
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

            <Pressable style={
                ({ pressed }) => [
                    {
                        backgroundColor: pressed ? "lightblue" : "blue",

                    }, styles.loginButton]}

                onPress={async() => {
                    // (Login({email,password}))
                   await Login(email, password )
                    user.isAuth ? 
                    navigation.navigate("Map") 
                    : null

                }}
            >
                <Text style={styles.loginButtonText}>
                    Giriş Yap
                </Text>

            </Pressable>

            <Pressable style={({ pressed }) => [{
                backgroundColor: pressed ? "lightgray" : "gray",
            }, styles.signupButton]}
                onPress={() => {


                    navigation.navigate("SignUp")
                }}
            >
                <Text style={styles.signupButtonText}>
                    Kaydol
                </Text>

            </Pressable>

            <Pressable style={styles.forgotPasswordButton}
                onPress={() => {


                    navigation.navigate("ForgotPassword")
                }}
            >
                <Text style={styles.forgotPasswordButtonText}>
                    Parolamı unuttum...
                </Text>

            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginButtonText: {
        color: "white",
        fontSize: 20,


    },
    loginButton: {
        marginHorizontal: "15%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        //backgroundColor: "blue",
        marginTop: 5,

    },
    signupButtonText: {
        color: "white",
        fontSize: 20,


    },
    signupButton: {
        marginHorizontal: "20%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        //backgroundColor: "gray",
        marginTop: 5,

    },
    forgotPasswordButton:{
        marginHorizontal: "20%",
        alignItems: "center",
        justifyContent: "center",
   
        borderRadius: 15,
  
        //backgroundColor: "gray",
        marginTop: 5,
    },
    forgotPasswordButtonText:{
        color:"gray",
        fontSize:18,
    },
    textStyle: {
        marginVertical: 5,
        textAlign: "center",
        fontSize: 16
    },
    textInputStyle: {
        height: 40,
        marginHorizontal: "10%",
        textAlign: "center",
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
    }
});

export default LoginPage;

function state(state: unknown): unknown {
    throw new Error('Function not implemented.');
}
