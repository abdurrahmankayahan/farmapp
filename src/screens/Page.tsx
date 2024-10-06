import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageButton from '../components/ImageButton'
import ActionButtonList from '../components/ActionButtonList'




const Page = () => {


    return (
        <SafeAreaView>

            <ActionButtonList viewStyle={{ alignItems: "center" }}>

                <ImageButton
                    iconName='leaf'
                    iconSize={20}
                    iconColor='black'
                    text='Ekim' />
                <ImageButton
                    iconName='water'
                    iconSize={20}
                    iconColor='black'
                    text='Sulama' />
                <ImageButton
                    iconName='hand-right'
                    iconSize={20}
                    iconColor='black'
                    text='Toplama' />
                <ImageButton
                    iconName='bug'
                    iconSize={20}
                    iconColor='black'
                    text='İlaçlama' />

            </ActionButtonList>

        </SafeAreaView>
    )
}

export default Page

const styles = StyleSheet.create({})