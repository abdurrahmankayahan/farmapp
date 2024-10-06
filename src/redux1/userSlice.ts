import { CommonActions } from "@react-navigation/native";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const Login = createAsyncThunk("user/Login",
    async ({ email, password }) => {
        try {

            //const auth = getAuth();

            const userData = await signInWithEmailAndPassword(auth, email, password)


            //             const userInfo = userData.user
            //             const token = userInfo.uid;
            // console.log("ui:",userInfo)

            //             const data = {
            //                 token,
            //                 user: userInfo,
            //             }
            //             return data;
            return true

        } catch (error) {
            console.log("Login Hatası:", error)
            throw error
        }
    })





const initialState = {
    email: null,
    password: null,
    isLoading: false,

    user: null,
    token: null,
    isAuth: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;



            })
            .addCase(Login.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = false;

            })

    }
})

export const { setEmail, setPassword, setIsLoading, setIsAuth } = userSlice.actions;

export default userSlice.reducer;