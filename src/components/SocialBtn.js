import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../utils/dimensions';

import colors from '../constants/colors';

const SocialBtn = ({ title, containerStyle, image, imageStyle, disabled, onPress }) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    disabled={disabled}
    onPress={onPress}
  >
    <Image style={[styles.image, imageStyle]} source={image} />
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteOpacity,
    width: scale(200),
    height: scale(45),
    borderRadius: scale(15),
  },
  image: {
    width: scale(60),
    height: scale(60),
  },
  text: {
    fontSize: 20,
    color: colors.white,
  },
});

SocialBtn.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.instanceOf(Object),
  image: PropTypes.number.isRequired,
  imageStyle: PropTypes.instanceOf(Object),
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
};

SocialBtn.defaultProps = {
  containerStyle: {},
  imageStyle: {},
  onPress: () => {},
};

export default SocialBtn;
