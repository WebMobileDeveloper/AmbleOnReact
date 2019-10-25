
import React, { Fragment } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'native-base';
// import Video from 'react-native-video';
import Overlay from 'react-native-modal-overlay';
import img from '../../constants/images';
import images from '../../constants/images';
// import Player from '../../components/recorder/Player';
import { MyAirbnbRating } from '../../components/customElements';
import { styles, screenPropTypes, screenDefaultProps } from './ref';
const renderPrevImage = pins => {
    for (i = 0; i < pins.length; i++) {
        for (j = 0; j < pins[i].attachments.length; j++) {
            const attachment = pins[i].attachments[j];
            if (attachment.media_type == 1) {
                return attachment.uri;
            }
        }
    }
    return null;
}
const TourPreviewScreen = ({
    currTour, navigation, showOverlay, newRate,
    navigateStartTour, onShowFeedbackOverlay, onCloseOverlay, onGiveFeedback, ratingCompleted }) => {
    const tourImage = renderPrevImage(currTour.pins);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.closeButton} style={styles.img} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.titleHeaderText}>Lets start</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.tourTitle}>{currTour.title}</Text>
                    <MyAirbnbRating tour={currTour} onPress={onShowFeedbackOverlay} />
                    {tourImage && <Image
                        resizeMode="contain"
                        style={styles.tourImg}
                        source={{ uri: `${img.imageServiceUrl}${tourImage}` }}
                    />}
                    <Text style={styles.tourDescription}>{currTour.description}</Text>
                    <Text style={styles.tourTextPins}>{`Pins: ${currTour.pins.length}`}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={navigateStartTour}>
                        <Text style={styles.buttonText}>Start tour</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Overlay visible={showOverlay} animationType="zoomIn" containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                childrenWrapperStyle={{ backgroundColor: '#fff' }} animationDuration={500}>
                <Text style={styles.actionTitle}>Your Feedback</Text>
                <MyAirbnbRating isDisabled={false} defaultRating={newRate} onFinishRating={ratingCompleted} />
                <View style={styles.buttonFrame}>
                    <View style={styles.button_1}>
                        <Button style={styles.actionBtn} block onPress={onGiveFeedback} ><Text style={styles.buttonTitle}>O K</Text></Button>
                    </View>
                    <View style={styles.button_1}>
                        <Button style={styles.actionBtn} block onPress={onCloseOverlay} ><Text style={styles.buttonTitle}>Cancel</Text></Button>
                    </View>
                </View>
            </Overlay>
        </View>
    )
}
TourPreviewScreen.propTypes = screenPropTypes;
TourPreviewScreen.defaultProps = screenDefaultProps;
export default TourPreviewScreen;