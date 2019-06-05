import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

export const scale = size => size * (width / 375);
