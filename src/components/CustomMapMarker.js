import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import images from '../constants/images';
import colors from '../constants/colors';
import { scale } from '../utils/dimensions';

class CustomMapMarker extends PureComponent {
  render() {
    const { source, order } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={source} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{order}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: {
    width: scale(60),
    height: scale(65),
  },
  textContainer: {
    position: 'absolute',
    width: scale(18),
    height: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    top: '14%',
    backgroundColor: colors.white,
  },
  text: {
    textAlign: 'center',
  },
});

CustomMapMarker.propTypes = {
  source: PropTypes.number,
  order: PropTypes.number.isRequired,
};

CustomMapMarker.defaultProps = {
  source: images.map_marker,
};

export default CustomMapMarker;
