import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from '../screens/HomePage';
import FinancePage from '../screens/FinancePage';
import useUserStore from '../zustand/user';
import { getAllFields, SaveFields } from '../zustand/field';
import { SaveFinance } from '../zustand/finance';
import OtherPage from './OtherPage';
import MapsPage from '../screens/MapsPage';
import Page from '../screens/Page';
import ImageButton from '../components/ImageButton';
import ProfilePage from '../screens/ProfilePage';
import ProductPage from '../screens/ProductPage';
import { SaveProduct } from '../zustand/product';

const AuthPage = () => {
    const Tab = createBottomTabNavigator();
    const userModel = useUserStore();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: string = "";
                if (route.name === 'MainPage') {
                    iconName = focused ? 'home' : 'home-outline';
                }
                else if (route.name === 'Finance') {
                    iconName = focused ? 'card' : 'cash-outline';
                    //!focused&&userModel.isAuth ? SaveFinance() : null;
                }

                else if (route.name === 'Map') {
                    iconName = focused ? 'map' : 'map-outline';
                    // !focused&&userModel.isAuth ? SaveFields() : null;

                }
                else if (route.name === 'Product') {
                    iconName = focused ? 'basket' : 'basket-outline';
                }
                else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                }


                return <Icon name={iconName} size={30} color={color} />
                // <ion-icon name="log-in-outline"></ion-icon>
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            //tabBarBackground:()=>(<View style={{flex:1, backgroundColor:"lightgray"}}/>)
        })}   >




            <Tab.Screen name='MainPage' component={HomePage} options={{
                headerRightContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 15,
                    margin: 4,
                    alignItems: "center",

                },
                headerLeftContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 15,
                    margin: 4,
                    alignItems: "center",

                },
                headerRight: () => (
                    <Pressable style={{ flexDirection: "row" }} onPress={() => {
                        SaveFields();
                        console.log("Save All Fields")
                    }}>
                        <Text style={{ marginEnd: 8, fontSize: 20, color: "black" }} >Kaydet</Text>
                        <Icon name='save' size={25} color={"black"} />
                    </Pressable>
                ),


            }
            } />
            <Tab.Screen name='Finance' component={FinancePage}
                options={{
                    headerRightContainerStyle: {
                        borderWidth: 1,
                        borderRadius: 15,
                        margin: 4,
                        alignItems: "center",

                    },

                    headerRight: () => (
                        <Pressable style={{ flexDirection: "row" }} onPress={() => {
                            SaveFinance();
                            console.log("Save All Finance")
                        }}>
                            <Text style={{ marginEnd: 8, fontSize: 20, color: "black" }} >Kaydet</Text>
                            <Icon name='save' size={25} color={"black"} />
                        </Pressable>
                    )
                }} />

            <Tab.Screen name='Map' component={MapsPage} options={{
                headerRightContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 15,
                    margin: 4,
                    alignItems: "center",

                },

                headerRight: () => (
                    <Pressable style={{ flexDirection: "row" }} onPress={() => {
                        SaveFields();
                        console.log("Save All Fields")
                    }}>
                        <Text style={{ marginEnd: 8, fontSize: 20, color: "black" }} >Kaydet</Text>
                        <Icon name='save' size={25} color={"black"} />
                    </Pressable>
                )
            }} />
             <Tab.Screen name='Product' component={ProductPage}
              options={{
                headerRightContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 15,
                    margin: 4,
                    alignItems: "center",

                },

                headerRight: () => (
                    <Pressable style={{ flexDirection: "row" }} onPress={() => {
                        SaveProduct();
                        console.log("Save All Product")
                    }}>
                        <Text style={{ marginEnd: 8, fontSize: 20, color: "black" }} >Kaydet</Text>
                        <Icon name='save' size={25} color={"black"} />
                    </Pressable>
                )
            }} />
            <Tab.Screen name='Profile' component={ProfilePage} />

        </Tab.Navigator>
    )
}

export default AuthPage

const styles = StyleSheet.create({})