import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'

const { width: screenWidth } = Dimensions.get("window");

const CustomButton = ({ title, backgroundColor, borderColor, textColor, height, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: screenWidth * 0.8, 
          backgroundColor: backgroundColor || '#3498db', 
          borderColor: borderColor || '#2980b9', 
          height: height || 50, 
        }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor || '#fff' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})