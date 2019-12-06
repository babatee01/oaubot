import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native'

const Geolocation = (props) => {
    const { message } = props;
    return (
        <View style = {styles.container}>
            <Text style = {{
                marginLeft: 10,
                marginTop: 5,
                
            }}>{ message }</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default Geolocation;