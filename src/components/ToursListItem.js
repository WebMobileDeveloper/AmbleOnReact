import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { ListItem } from 'react-native-elements';
import images from '../constants/images';
import { scale } from '../utils/dimensions';
import colors from '../constants/colors';
import { MyAirbnbRating } from './customElements';

const ToursListItem = ({ item, showTourPreview }) => {
  return (
    <ListItem
      key={item.id}
      title={item.title}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.subtitleStyle}>{item.description}</Text>
          <View style={styles.ratingContainer}>
            <MyAirbnbRating size={15} tour={item} />
          </View>
        </View>
      }
      leftAvatar={{
        source: item.avata ? { uri: item.avata } : images.tour_avata,
        containerStyle: styles.avatarContainerStyle,
        overlayContainerStyle: styles.avataOverlayStyle,
        imageProps: { style: styles.avataImageStyle },
      }}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
      onPress={() => showTourPreview(item)}
    />
  );
};

ToursListItem.propTypes = {
  item: PropTypes.object.isRequired,
  showTourPreview: PropTypes.func,
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    marginBottom: scale(5),
    backgroundColor: colors.blackOpacity,
  },
  avatarContainerStyle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(10),
    marginRight: scale(15),
    backgroundColor: colors.white,
  },
  avataOverlayStyle: {
    backgroundColor: 'transparent'
  },
  avataImageStyle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(10),
  },
  titleStyle: {
    fontSize: scale(20),
    color: colors.white,
    flex: 1,
  },
  subtitleStyle: {
    color: colors.white,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
});

export default ToursListItem;
