import { User } from "firebase/auth";
import { create } from "zustand";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";



export type UserType = {
    email: string | null,
    password: string | null,
    isLoading: boolean | false,
    user: string | null,
    token: string | "",
    isAuth: boolean,
}




const useUserStore = create<UserType>((set) => ({

    email: null,
    password: null,
    isLoading: false,
    user: null,
    token: "",//"3lj3PlSeSnMNjraiQbIBMfQkLk13",//"v4130ubwH5YKvcFINsGuayUCVny2",
    isAuth: false,

}))

export default useUserStore;


const storeUserData = async (userData: UserType) => {
    console.log("store......")
    try {
        console.log("usr:", JSON.stringify(userData)),
            await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        console.error('Error storing user data', error);
    }
};

export const Login = async (email: string, password: string) => {
    try {

        //const auth = getAuth();
        console.log("login....")
        useUserStore.setState({ isLoading: true, email, password })


        const userData = await signInWithEmailAndPassword(auth, email, password)

        const userInfo = userData.user
        const token = userInfo.uid;
        console.log("ui:", userInfo)

        const data = {
            token,
            user: userInfo,
        }

        console.log("Login Başarılı")

        useUserStore.setState({ isLoading: false, token: token, isAuth: true })

        await storeUserData(
            {
                email: email,
                password: password,
                isLoading: false,
                user: null,
                token: token,
                isAuth: true
            })


        return true

    } catch (error) {
        useUserStore.setState({ isLoading: false, isAuth: false })



        console.log("Login Hatası:", error)

        throw error
    }
}


export const SignUp = async (email: string, password: string) => {
    try {

        //const auth = getAuth();
        console.log("signUp....")

        useUserStore.setState({ isLoading: true });

        const userData = await createUserWithEmailAndPassword(auth, email, password)

        //             const userInfo = userData.user
        //             const token = userInfo.uid;
        // console.log("ui:",userInfo)

        //             const data = {
        //                 token,
        //                 user: userInfo,
        //             }
        //             return data;
        console.log("Signup Başarılı")
        useUserStore.setState({ isLoading: false });




        return true

    } catch (error) {
        useUserStore.setState({ isLoading: false });





        console.log("Login Hatası:", error)

        throw error

    }
}





