import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import useUserStore from '../zustand/user';
import { getAllFields } from '../zustand/field';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';
import ForgotPasswordPage from '../screens/ForgotPasswordPage';

const OtherPage = () => {
    const Tab = createBottomTabNavigator();
    const userModel = useUserStore()
    return (
        <Tab.Navigator screenOptions={({ route }) => ({

            tabBarIcon: ({ focused, color, size }) => {
                let iconName: string = "";
                if (route.name === 'Login') {
                    iconName = focused
                        ? 'log-in'
                        : 'log-in-outline';
                } else if (route.name === 'SignUp') {
                    iconName = focused ? 'person-add' : 'person-add-outline';
                }
                else if (route.name === 'ForgotPassword') {
                    iconName = focused ? 'key' : 'key-outline';
                }


                return <Icon name={iconName} size={30} color={color} />
                // <ion-icon name="log-in-outline"></ion-icon>
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })} >


            <Tab.Screen name='Login' component={LoginPage} />


            <Tab.Screen name='SignUp' component={SignupPage} />
            <Tab.Screen name='ForgotPassword' component={ForgotPasswordPage} />




        </Tab.Navigator>
    )
}

export default OtherPage

const styles = StyleSheet.create({})