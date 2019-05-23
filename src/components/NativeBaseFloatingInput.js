import React from 'react';
import { Item, Label, Input } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import { scale } from '../utils/dimensions';

import colors from '../constants/colors';

const NativeBaseFloatingInput = ({
  containerStyle,
  item,
  value,
  handleChange,
  handleBlur,
  isValid,
  placeholder,
  errorMessage,
}) => (
  <View style={[styles.inputContainer, containerStyle]}>
    <Item floatingLabel {...item}>
      <Label style={styles.inputLabel}>{placeholder}</Label>
      <Input style={styles.input} value={value} onChangeText={handleChange} onBlur={handleBlur} />
    </Item>
    {isValid && <Text style={styles.errorText}>{errorMessage}</Text>}
  </View>
);

const styles = StyleSheet.create({
  input: {
    maxHeight: scale(120),
  },
  inputLabel: {
    fontSize: scale(20),
    top: 0,
  },
  errorText: {
    position: 'absolute',
    bottom: -scale(25),
    width: '100%',
    textAlign: 'center',
    color: colors.danger,
  },
});

export default NativeBaseFloatingInput;
