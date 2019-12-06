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
import * as firebase from 'react-native-firebase';

class Signup extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: null,
        }
        
        this.handleSignup = this.handleSignup.bind(this);    
    }
        
    componentWillMount() {
        const firebaseConfig = {
            apiKey = 'AIzaSyDr9OQL4h12GAhCUffvzE-aD6gAykLoOuI',
            authDomain = 'oaubot1'
        }

        firebase.initialize(firebaseConfig);
    }
    handleSignup () {

        let {password, confirmPassword} = this.state;

        if (password ===  confirmPassword) {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        } else{
            console.log('your password is wrong');
        }
    }
   
        render() {
            const {navigate} = this.props.navigation;
            return(
                <View style = {styles.container}>
                    <View style = {styles.upper}>
                        <Text style = {styles.upperText}>WELCOME TO OAU</Text>
                        <Text style = {styles.upperText}>TRANS CHAT BOT</Text>
                        <Text style = {styles.notice}>Please, register to use this service</Text>
                    </View>
                    <View style = {styles.lower}>{this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}

                            <TextInput 
                            style={styles.textInput} 
                            placeholder="Please enter your full name"
                            placeholderTextColor={'#000'}
                            underlineColorAndroid='transparent'
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
                            />
                            <TextInput 
                            style={styles.textInput} 
                            placeholder="Please enter your email"
                            placeholderTextColor={'#000'}
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            />
                            
                            <TextInput 
                            style={styles.textInput} 
                            secureTextEntry
                            placeholder="Please enter your password"
                            placeholderTextColor={'#000'}
                            underlineColorAndroid='transparent'
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            />
                            <TextInput 
                            style={styles.textInput} 
                            placeholder="Please confirm your password"
                            placeholderTextColor={'#000'}
                            underlineColorAndroid='transparent'
                            onChangeText = {confirmPassword => this.setState({confirmPassword})}
                            />
                            
                            <TouchableOpacity style={styles.btn}
                            onPress = {this.handleSignup}
                            >
                                <Text style={styles.btnText}>Signup</Text>
                            </TouchableOpacity>
                            
                            <Text> Already have an account? </Text>
                            
                            <TouchableOpacity 

                            >
                                <Text style = {styles.login}>Login</Text>
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

    },
    lower: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    upperText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    notice: {
        color: '#fff',
        fontSize: 17,
        marginTop: 20,
    },

    btn:{
        backgroundColor: '#5a02ad',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,

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
    login: {
        marginTop: 15,
        color: '#5a02ad',
        fontSize: 16,
    }
});

export default Signup;