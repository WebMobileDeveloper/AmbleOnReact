import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import images from '../constants/images';
import { scale } from '../utils/dimensions';
import colors from '../constants/colors';

const ToursListItem = ({ title, imageSource, navigate }) => {
  const source = typeof imageSource === 'string' ? { uri: imageSource } : imageSource;

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigate()}>
      <Image style={styles.image} source={source} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

ToursListItem.propTypes = {
  navigate: PropTypes.func,
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ToursListItem.defaultProps = {
  imageSource: images.tour_image_placeholder,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    marginBottom: scale(15),
    backgroundColor: colors.blackOpacity,
  },
  image: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(15),
    backgroundColor: colors.white,
    marginRight: scale(15),
  },
  title: {
    fontSize: scale(20),
    color: colors.white,
    flex: 1,
  },
});

export default ToursListItem;
