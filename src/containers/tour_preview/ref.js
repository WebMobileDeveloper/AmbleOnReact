
import { StyleSheet } from 'react-native';
import { width } from 'react-native-dimension';
import PropTypes from 'prop-types';

import colors from '../../constants/colors';
import { scale } from '../../utils/dimensions';
import { navigationPropTypes, navigationDefaultProps } from '../../constants/propTypes';


export const propTypes = {
    currTour: PropTypes.object,
    currTourId: PropTypes.string,
    navigation: navigationPropTypes,
    create_feedback: PropTypes.func,
    update_feedback: PropTypes.func,
};
export const defalutProps = {
    currTour: {},
    currTourId: '',
    navigation: navigationDefaultProps,
    create_feedback: () => { },
    update_feedback: () => { },
};
export const screenPropTypes = {
    currTour: PropTypes.object,
    navigation: navigationPropTypes,
    newRate: PropTypes.number,
    showOverlay: PropTypes.bool,
    navigateStartTour: PropTypes.func,
    onShowFeedbackOverlay: PropTypes.func,
    onCloseOverlay: PropTypes.func,
    onGiveFeedback: PropTypes.func,
    ratingCompleted: PropTypes.func,

}
export const screenDefaultProps = {
    currTour: {},
    navigation: navigationDefaultProps,
    newRate: 0,
    showOverlay: false,
    navigateStartTour: () => { },
    onShowFeedbackOverlay: () => { },
    onCloseOverlay: () => { },
    onGiveFeedback: () => { },
    ratingCompleted: () => { },
}
export const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#000485'
    },
    headerTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 5,
        borderBottomWidth: 1,
        borderColor: colors.black,
    },
    headerButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRightWidth: 1,
        borderColor: colors.white,
    },
    img: {
        height: 30,
        width: 30,
    },
    titleHeaderText: {
        fontSize: 18,
        color: colors.white,
    },
    contentContainer: {
        backgroundColor: '#5B5CFF',
        paddingHorizontal: width(8),
        flex: 9,
    },
    tourImg: {
        marginTop: 20,
        width: width(84),
        height: width(50),
    },
    tourTitle: {
        fontSize: 22,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 10,
        color: colors.white,
    },
    tourDescription: {
        color: colors.white,
        fontSize: 14,
        fontStyle: 'italic',
    },
    tourTextPins: {
        fontSize: 28,
        color: colors.white,
    },
    button: {
        backgroundColor: colors.green,
        alignItems: 'center',
        bottom: 0,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 25,
        paddingVertical: 5,
    },
    infoContainer: {
        flex: 4,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    videoContainer: { flex: 1, justifyContent: "center" },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    actionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(10),
        marginBottom: scale(10),
        marginLeft: scale(10),
        marginRight: scale(10),
        borderRadius: 5,
        padding: scale(10),
        width: width(30),
    },
    buttonTitle: {
        color: colors.white,
        fontSize: scale(20),
    },
    actionTitle: {
        color: colors.primary,
        fontSize: scale(20),
        marginBottom: scale(20),
    },
    buttonFrame: {
        flexDirection: 'row',
        marginTop: scale(20),
    }
});
