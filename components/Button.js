import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const Button = (props) =>{
    const { onPress, children } = props;

    return (
        <TouchableOpacity onPress = { onPress } style = {styles.button}>
            <Text style = {styles.text}>{ children }</Text>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 20,
        width: '100%',
        backgroundColor: '#3acbe8',
        borderRadius: 4,
        alignItems: 'center',

    },
    text: {
        color: '#f1f1f1',
        fontWeight: '700',
        fontSize: 18,

    }
});

export default Button;