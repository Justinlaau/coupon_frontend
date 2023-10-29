import * as React from "react";
import {View, Text, StyleSheet, Touchable} from 'react-native';
import { Checkbox, NativeBaseProvider } from "native-base";
export const CheckBoxes = (props) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={style.container}>
            <NativeBaseProvider>
                <Checkbox value="test" shadow={props.shadow} color={props.color}>
                    <Text style={props.textStyle}>{ props.text}</Text>
                </Checkbox>
            </NativeBaseProvider>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: "100%",
        width: "39%",
    }
})
