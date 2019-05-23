import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import { scale } from '../utils/dimensions';
import images from '../constants/images';

const Header = ({
  title,
  backgroundColor,
  containerStyle,
  isNeedLeft,
  isNeedRight,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <View style={[styles.container, containerStyle, { backgroundColor }]}>
      {isNeedLeft && (
        <TouchableOpacity style={styles.leftBtnContainer} onPress={onLeftPress}>
          <Image style={styles.leftBtnImage} source={images.arrow_left} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {isNeedRight && (
        <TouchableOpacity style={styles.rightBtnContainer} onPress={onLeftPress}>
          <Text style={styles.buttonTitle}>Log out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(30),
    paddingVertical: scale(10),
  },
  title: {
    fontSize: scale(28),
    color: colors.white,
  },
  leftBtnContainer: {
    width: scale(15),
    height: scale(25),
    position: 'absolute',
    left: scale(30),
  },
  leftBtnImage: {
    width: '100%',
    height: '100%',
  },
  rightBtnContainer: {
    width: scale(70),
    height: scale(25),
    backgroundColor: colors.white,
    borderRadius: scale(10),
    justifyContent: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
  },
});

Header.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  containerStyle: PropTypes.object,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
};

Header.defaultProps = {
  title: 'Tours',
  backgroundColor: colors.primary,
  containerStyle: {},
  onLeftPress: () => {},
  onRightPress: () => {},
};

export default Header;
