import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Screen</Text>
            <Link
                href="/login"
                style={styles.link}>
                <Text style={styles.linkText}>Logout</Text>
            </Link>
        </View>
    );
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
