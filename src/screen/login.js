import React from 'react';
import {
    View,
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

import firebase from 'react-native-firebase';



class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: null,
        }
        
        this.handleLogin = this.handleLogin.bind(this);    
    }
        
    
    handleLogin () {

        let {password, confirmPassword} = this.state;

        if (password ===  confirmPassword) {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        } else {
            console.log('your password is wrong');
        }
    }
        render() {
            const { navigate } = this.props.navigation;
             return(
                <View style = {styles.container}>
                    <View style = {styles.upper}>
                        <Text style = {styles.upperText}>WELCOME TO OAU</Text>
                        <Text style = {styles.upperText}>TRANS CHAT BOT</Text>
                    </View>
                    <View style = {styles.lower}>
                        {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                        </Text>}
                            <TextInput 
                            style={styles.textInput} 
                            placeholder="Please enter your email"
                            placeholderTextColor={'#000'}
                            underlineColorAndroid='transparent'
                            />
                            
                            <TextInput 
                            style={styles.textInput} 
                            placeholder="Please enter your password"
                            placeholderTextColor={'#000'}
                            underlineColorAndroid='transparent'
                            />


                            
                            <TouchableOpacity >
                                <Text style = {styles.forgetPass}>Forgot your password?</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.btn}
                            onPress={this.handleLogin}
                            >
                                <Text style={styles.btnText}>Login</Text>
                            </TouchableOpacity>
                            
                            <Text> Don't have an account? </Text>
                            
                            <TouchableOpacity>
                                <Text style = {styles.register}>Register</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            ); 
        }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upper:{
        flex: 1,
        flexDirection: 'column',
       // height: Dimensions.get('window').height/2,
        backgroundColor: '#5a02ad',   
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 10, height: 10},
        shadowColor: '#000',
        shadowOpacity: 1.0,
        borderBottomLeftRadius: 50,

    },
    lower: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    upperText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },

    btn:{
        backgroundColor: '#5a02ad',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        borderRadius: 15,

    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#5a02ad",
        width: '95%',
        paddingLeft: 20,
        paddingBottom: 4,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 25,
    },

    btnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    forgetPass: {
        marginLeft: 150,
        color: '#5a02ad',
        marginBottom: 15,
    },
    register: {
        marginTop: 15,
        color: '#5a02ad',
        fontSize: 16,
    }
}); 

export default Login;