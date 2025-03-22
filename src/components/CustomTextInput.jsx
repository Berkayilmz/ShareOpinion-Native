import { StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'

const { width: screenWidth } = Dimensions.get("window");

const CustomTextInput = ({ placeholder, backgroundColor, borderColor, onChangeText, isPassword, height, width }) => {
  return (
    <TextInput 
      style={[
        styles.textInput,
        {
          width: width || screenWidth * 0.8,
          height: height || 50,
          backgroundColor: backgroundColor || 'lightgrey',
          borderColor: borderColor || 'grey',
        }
      ]} 
      placeholder={placeholder}
      onChangeText={onChangeText}   
      secureTextEntry={isPassword || false}
      keyboardType="default"
    />
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 10, 
  }
})
