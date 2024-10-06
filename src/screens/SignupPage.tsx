import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context'
import useUserStore, { SignUp, UserType } from '../zustand/user'
//import { useDispatch, useSelector } from 'react-redux'
//import { setEmail,setPassword } from '../redux/userSlice'
const SignupPage = ({navigation}:any) => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSame, setIsSame] = useState(false)

    // const {email,password}=useSelector((state:any)=>state.user)
// const dispatch=useDispatch()

  return (
    <SafeAreaView style={{backgroundColor:"lightblue", justifyContent: "center", flex: 1 }}>

   <Text style={styles.textStyle}> E Posta </Text>
   <TextInput style={[{}, styles.textInputStyle]}
          onChangeText={(value) => {setEmail(value)}}
       placeholder='E-Posta Giriniz ...'
   />
   <Text style={styles.textStyle}> Şifre </Text>
   <TextInput style={[{}, styles.textInputStyle]}

       onChangeText={(value) => {setPassword(value) }}
       placeholder='Şifre Giriniz ...'
       secureTextEntry={true}


   />
   <Text style={styles.textStyle}> Şifre Tekrar </Text>
   <TextInput style={[{
    backgroundColor:!isSame?"red":"white"
   }, styles.textInputStyle]}

       onChangeText={(value) => {
       password!=value? setIsSame(false): setIsSame(true)

        }}
       placeholder='Şifrenizi Tekrar Giriniz ...'
       secureTextEntry={true}


   />



   <Pressable style={({pressed})=>[{
       backgroundColor: pressed? "lightgray":"gray",
   },styles.signupButton]}
    onPress={()=>{

       isSame?SignUp(email,password):null
           navigation.navigate("Login")



   }}
   >
       <Text style={styles.signupButtonText}>
           Sign Up
       </Text>

   </Pressable>
  
</SafeAreaView>
  )
}

export default SignupPage


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