import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Header from '../components/Header';

import { scale } from '../utils/dimensions';

import colors from '../constants/colors';
import images from '../constants/images';
import ToursListItem from '../components/ToursListItem';

const ToursListScreen = ({ toursList, onAddTourPress, onLogoutPress, navigation }) => {
  const renderToursList = ({ item }) => (
    <ToursListItem
      key={item.id}
      title={item.title}
      ownerId={item.ownerId}
      navigate={() => navigation.navigate('TourPreview', { item })}
    />
  );

  return (
    <View style={styles.container}>
      <Header containerStyle={styles.header} isNeedRight onLeftPress={onLogoutPress} />
      <FlatList keyExtractor={({ id }) => id} data={toursList} renderItem={renderToursList} />
      <TouchableOpacity style={styles.buttonContainer} onPress={onAddTourPress}>
        <Image style={styles.buttonImage} source={images.plus} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    marginBottom: scale(34),
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: scale(60),
    height: scale(60),
    position: 'absolute',
    right: scale(30),
    bottom: scale(50),
    backgroundColor: colors.orange,
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: scale(45),
    height: scale(45),
  },
});

ToursListScreen.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
  toursList: PropTypes.array,
  onAddTourPress: PropTypes.func,
  onLogoutPress: PropTypes.func,
};

ToursListScreen.defaultProps = {
  toursList: [],
  onAddTourPress: () => {},
  onLogoutPress: () => {},
};

export default ToursListScreen;
