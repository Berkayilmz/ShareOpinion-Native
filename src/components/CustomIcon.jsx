import { Image, StyleSheet } from 'react-native'
import React from 'react'

const CustomIcon = ({ source, height, width }) => {
  if (!source) {
    return null; // Eğer `source` boşsa hata almamak için boş bir return yapıyoruz
  }

  return (
    <Image
      source={source} 
      style={[styles.image, { height: height, width: width }]}
    />
  )
}

export default CustomIcon

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
})