import { View, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default LoginScreenStyle;