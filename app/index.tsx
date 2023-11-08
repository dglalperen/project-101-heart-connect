import { Redirect } from 'expo-router';
import React from 'react';

function RootScreen() {
    return <Redirect href="/verify" />;
}

export default RootScreen;
