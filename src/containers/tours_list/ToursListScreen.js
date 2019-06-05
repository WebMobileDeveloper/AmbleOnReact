import React from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Header from '../../components/Header';
import images from '../../constants/images';
import ToursListItem from '../../components/ToursListItem';
import { styles, screenDefaultProps, screenPropTypes } from './ref';


const ToursListScreen = ({ searchText, renderItems, navigate, onLogoutPress, onUpdateSearch, onShowTourPreview }) => {
    const renderToursList = ({ item }) => {
        return <ToursListItem item={item} showTourPreview={() => onShowTourPreview(item)} />
    };

    return (
        <View style={styles.container}>
            <Header containerStyle={styles.headerContainerStyle} textStyle={styles.headerTextStyle} isNeedRight onLeftPress={onLogoutPress} />
            <SearchBar
                placeholder="Search Here..."
                onChangeText={onUpdateSearch}
                value={searchText}
                platform={'ios'}
                lightTheme={false}
                searchBarContainerStyle={styles.searchBarContainerStyle}
            />
            <FlatList keyExtractor={({ id }) => id} data={renderItems} renderItem={renderToursList} />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('CreateTour')}>
                <Image style={styles.buttonImage} source={images.plus} />
            </TouchableOpacity>
        </View>
    );
};
ToursListScreen.propTypes = screenPropTypes;
ToursListScreen.defaultProps = screenDefaultProps;
export default ToursListScreen;