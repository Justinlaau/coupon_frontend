import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Box, Input, NativeBaseProvider, Pressable, Icon, Stack, ArrowBackIcon} from "native-base";
import { Visibility } from '@mui/icons-material';

//     shadowColor: 'gray',
//     shadowOffset: { width: 100, height: -100 },
//     shadowOpacity: 0,
//     shadowRadius: 100,
export const InputBox = (props:any) => {
    return (
        <View style={[styles.container, props.shadowStyle, props.borderStyle, props.boxStyle]}>
            <TextInput
                style={styles.input}
                value={props.InputRes}
                placeholder={props.text}
                placeholderTextColor={props.textColor}
                onChangeText={props.Input}
                secureTextEntry={props.HideText}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        elevation: 5,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: "black",
        zIndex:10,
    },
});