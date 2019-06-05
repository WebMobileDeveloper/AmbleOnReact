import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, AirbnbRating } from 'react-native-elements';
import PropTypes from 'prop-types';

// export const MyAirbnbRating = props => <AirbnbRating {...props} />;
// MyAirbnbRating.propTypes = {
//     ...AirbnbRating.propTypes,
//     test: PropTypes.string.isRequired
// }
export class MyAirbnbRating extends Component {
    static defaultProps = {
        count: 5,
        type: 'custom',
        reviews: ['Terrible', 'Bad', 'Okay', 'Good', 'Amazing'],
        showRating: false,
        defaultRating: 0,
        size: 20,
        isDisabled: true,
        tour: {},
        onPress: () => { }
    }
    static propTypes = {
        ...AirbnbRating.propTypes,
        tour: PropTypes.object,
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { tour: { ratings }, onPress } = this.props;
        let defaultRating = this.props.defaultRating;
        if (ratings && ratings.length) {
            defaultRating = 0;
            ratings.forEach(rating => {
                defaultRating += rating.rate;
            });
            defaultRating = Math.round(defaultRating / ratings.length);
        }
        return (
            <TouchableOpacity onPress={onPress}>
                <AirbnbRating {...this.props} defaultRating={defaultRating} />
            </TouchableOpacity>
        )

    }
}