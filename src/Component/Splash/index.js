import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Img from '@img/Splash';

const Splash = () => {

    return(
        <View style={ style.root }>
            <ImageBackground 
                style={ style.image }
                source= { Img }/>
        </View>
    )
}

const style = StyleSheet.create({
    root : {
        flex: 1
    },
    image : {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Splash