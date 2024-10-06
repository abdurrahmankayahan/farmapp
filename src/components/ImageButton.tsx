import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import React from 'react'



const ImageButton: React.FC<{
  variant?: ("Top" | "Bottom" | "Right" | "Left"),
  iconSize?: number,
  iconName: string,
  iconColor?:string,
  styleView?: ViewStyle|ViewStyle[],
  styleText?:TextStyle,
  text?: string,
  onPress?:()=>void

}> = ({
  variant,
  styleView,
  styleText,
  text,
  iconSize,
  iconName,
  iconColor,
  
  
  onPress,


}) => {


    return (
      <View style={[{},styleView]} >

        <Pressable
          onPress={onPress}>
          <View style={[
            
            {justifyContent: "center", alignItems: "center", flexDirection: variant == "Right" || variant == "Left" ? "row" : "column" }
            
          ]}>

            {variant == "Right" || variant == "Bottom" ? null : <Icon name={iconName} size={iconSize} color={iconColor} />}
            
            <Text style={styleText}>{text}</Text>

            {variant == "Right" || variant == "Bottom" ? <Icon name={iconName} size={iconSize} color={iconColor} /> : null}


          </View>
        </Pressable>
      </View>
    )
  }

export default ImageButton

const styles = StyleSheet.create({})