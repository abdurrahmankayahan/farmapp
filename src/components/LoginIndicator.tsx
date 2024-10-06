import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const LoginIndicator = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>" {props.name} " Lütfen Bekleyin... </Text>
            <ActivityIndicator size={"large"} color={"blue"} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "15%",
        backgroundColor: "lightblue"


    },
    textStyle: {
        fontSize: 20,
        textAlign: "center",

    }


})

export default LoginIndicator;
