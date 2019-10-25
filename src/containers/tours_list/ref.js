
import { StyleSheet } from 'react-native';
import { scale } from '../../utils/dimensions';
import colors from '../../constants/colors';
import { navigationPropTypes, navigationDefaultProps } from '../../constants/propTypes';

import PropTypes from 'prop-types';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    headerContainerStyle: {
        marginBottom: scale(0),
        justifyContent: 'space-between',
    },
    headerTextStyle: {
        paddingLeft: scale(30),
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
    searchBarContainerStyle: {
        backgroundColor: colors.searchBoxBack
    }
});

export const containerPropTypes = {
    navigation: navigationPropTypes,
    toursList: PropTypes.array,
    getTours: PropTypes.func,
    logout: PropTypes.func,
    request_tour: PropTypes.func,
};

export const containerDefaultProps = {
    navigation: navigationDefaultProps,
    toursList: [],
    getTours: () => { },
    logout: () => { },
    request_tour: () => { }
};

export const screenPropTypes = {
    searchText: PropTypes.string,
    renderItems: PropTypes.array,
    navigate: PropTypes.func,
    onLogoutPress: PropTypes.func,
    onUpdateSearch: PropTypes.func,
    onShowTourPreview: PropTypes.func
}
export const screenDefaultProps = {
    searchText: '',
    renderItems: [],
    navigate: () => { },
    onLogoutPress: () => { },
    onUpdateSearch: () => { },
    onShowTourPreview: () => { }
}