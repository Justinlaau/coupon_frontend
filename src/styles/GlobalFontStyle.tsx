import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / SCREEN_HEIGHT;

function Normalize(size:any) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}


const FontStyles = StyleSheet.create({
    mini: {
        fontSize: Normalize(24),
    },
    small: {
        fontSize: Normalize(30),
    },
    medium: {
        fontSize: Normalize(42),
    },
    large: {
        fontSize: Normalize(56),
    },
    xlarge: {
        fontSize: Normalize(72),
    },
    bold: {
        fontWeight: "bold"
    },
    italic: {
        fontStyle: "italic"
    }
});

export default FontStyles;