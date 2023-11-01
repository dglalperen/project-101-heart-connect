import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function LoginForm() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Form</Text>
        </View>
    );
}

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
