/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {  useState } from 'react';
import {
    Pressable,
    SafeAreaView,

    StyleSheet,
    Text,
    TextInput,

} from 'react-native';

import useUserStore, { Login, UserType } from '../zustand/user';
import {getAuth, sendPasswordResetEmail} from "firebase/auth"

// import { useDispatch, useSelector } from 'react-redux';
// import { setEmail, setPassword, setIsLoading } from '../redux/userSlice';
// import { Login } from '../redux/userSlice';




// console.log(user.deneme)

const ForgotPasswordPage = ({ navigation, route }:any) => {




    // const user:UserType=useUserStore((state:any)=>state.user)

    const user: UserType = useUserStore()


    const [email, setEmail] = useState("")

    const auth = getAuth();


   
    return (
        <SafeAreaView style={{backgroundColor:"lightblue", justifyContent: "center", flex: 1 }}>

           
            <Text style={styles.textStyle}> E Posta </Text>
            <TextInput style={[{}, styles.textInputStyle]}
                value={email}
                onChangeText={(value) => {
                    (setEmail(value))

                }}
                placeholder='E-Posta Giriniz ...'
            />
        

            <Pressable style={
                ({ pressed }) => [
                    {
                        backgroundColor: pressed ? "lightblue" : "blue",

                    }, styles.sendPasswordButton]}

                onPress={() => {
                    sendPasswordResetEmail(auth, email)
                    .then(() => {
                      alert('Password reset email sent!');
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      alert(errorMessage);
                    });
                  navigation.navigate("Login")
                }}
            >
                <Text style={styles.sendPasswordButtonText}>
                    Şifre Gönder
                </Text>

            </Pressable>

          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sendPasswordButtonText: {
        color: "white",
        fontSize: 20,


    },
    sendPasswordButton: {
        marginHorizontal: "15%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        //backgroundColor: "blue",
        marginTop: 5,

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

export default ForgotPasswordPage;

function state(state: unknown): unknown {
    throw new Error('Function not implemented.');
}
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

