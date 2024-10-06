import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useUserStore, { UserType } from '../zustand/user';
import AuthPage from './AuthPage';
import OtherPage from './OtherPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import Page from '../screens/Page';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setEmail, setPassword } from '../redux1/userSlice';

const NavigationApp = () => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const userModel = useUserStore();

    const checkUserSession = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData !== null) {
                // Kullanıcı bilgileri mevcutsa, otomatik giriş yap
                const parsedUserData:UserType = JSON.parse(userData);

           useUserStore.setState(parsedUserData)
               
                // Kullanıcıyı otomatik olarak ana sayfaya yönlendir
                // Örnek: navigation.navigate('Home', { user: parsedUserData });
            } else {
                // Kullanıcı bilgisi yoksa, login ekranına yönlendir
                // navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Error checking user session', error);
        }
    };

    useEffect(() => {
  
        checkUserSession();
    }, [])

    return (
        <NavigationContainer>
            {/* <Stack.Navigator
        initialRouteName='page'
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name='Login' component={LoginPage} />
        <Stack.Screen name='SignUp' component={SignupPage} />
        <Stack.Screen name='MainPage' component={HomePage} />
        <Stack.Screen name='page' component={Page} />



      </Stack.Navigator> */}

            {userModel.isAuth ? <AuthPage /> : <OtherPage />}

            <Stack.Screen name='page' component={Page} />
            <Stack.Screen name='MainPage' component={HomePage} />

        </NavigationContainer>
    )
}

export default NavigationApp

const styles = StyleSheet.create({})