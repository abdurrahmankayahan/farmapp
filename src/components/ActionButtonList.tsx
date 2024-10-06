import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode, useState } from 'react'
import ImageButton from './ImageButton'

const ActionButtonList: React.FC<{
    children?: ReactNode,
    viewStyle?:ViewStyle,
}> = ({
    children,
    viewStyle


}
) => {


        const [isVisible, setIsVisible] = useState(false)


        return (
            <View style={[styles.container,viewStyle]}>


                {isVisible ? (
                    <View style={{ flexDirection: "row" }}>
                        {children}
                    </View>




                ) : null}





                <View style={{ flexDirection: "row" }}>

                    <ImageButton
                        iconName={isVisible ? "chevron-down" : "chevron-up"}
                        iconColor='black'
                        iconSize={isVisible ? 15 : 25}
                        onPress={() => {
                            setIsVisible(!isVisible)
                        }}
                    ></ImageButton>



                </View>
            </View>





        )
    }

export default ActionButtonList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "aqua",
        alignItems: "center",
        justifyContent: "center",
    }
})