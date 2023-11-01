import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function MatchesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Matches Screen</Text>
        </View>
    );
}

export default MatchesScreen;

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
});
