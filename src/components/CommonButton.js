import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CommonButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ba0441',
    borderRadius: 8,
    marginTop: 20,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
});
