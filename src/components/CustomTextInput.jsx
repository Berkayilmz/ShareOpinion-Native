import { StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'

const { width: screenWidth } = Dimensions.get("window");

const CustomTextInput = ({ placeholder, backgroundColor, borderColor, onChangeText, isPassword, height }) => {
  return (
    <TextInput 
      style={[
        styles.textInput,
        {
          width: screenWidth * 0.8,
          height: height || 50,
          backgroundColor: backgroundColor || 'white',
          borderColor: borderColor || 'black',
        }
      ]} 
      placeholder={placeholder}
      onChangeText={onChangeText}   
      secureTextEntry={isPassword}
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
