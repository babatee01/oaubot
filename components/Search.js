import React from 'react';
import { 
    Dimensions, 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Form,
    Keyboard,
    TouchableWithoutFeedback,
 } from 'react-native';
import {Icon} from 'native-base';
import { API_URL } from '../config';
import { handleResponse } from '../helper';
import bckImage from '../images/ixon.jpg';
//import { Platform } from '@unimodules/core';

const {width: WIDTH} = Dimensions.get('window');

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            loading: true,
            locationQuery: '',
            message: '',
            isAdmin: true,
           
        }

        this.handleChange = this.handleChange.bind(this);
        this.displayUserInput = this.displayUserInput.bind(this);
        this.checkIfMessageIsSysOrUser = this.checkIfMessageIsSysOrUser.bind(this);
        this.displayAminInput = this.displayAminInput.bind(this);
    }

    componentDidMount () {
        const {whereLat, whereLong} = this.props;
        let location = `${whereLat}, ${whereLong}`;
        //geocode/json?latlng=${location}&key=AIzaSyCCbrgZ--_QCVwdowo635Hxb7fkJTlM_fM
        //directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY
        fetch(`${API_URL}/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCCbrgZ--_QCVwdowo635Hxb7fkJTlM_fM`)
        .then(handleResponse)
        .then((result) => {
            console.log(result)
            this.setState({
                locationQuery: result.results[0].name,
                loading: false
            })
        })

        .catch((error) => {
            this.setState({
                loading: false,
                error: 'not fetched',
            })
        })

        this.displayAminInput();
        
    }

    
    checkIfMessageIsSysOrUser(chat) {
        const isSysChat = chat => (
            <View key = {Math.random()*10}style={styles.messageBox}>
                <Text>
                    {chat}
                </Text>
            </View>
        );

        const isUserChat = chat => (
            <View key = {Math.random()*10} style={styles.messageBox}>
                <Text>
                    {chat}
                </Text>
            </View>
        );

        if(this.state.isAdmin) {
            return isSysChat(chat);
        } else{
            return isUserChat(chat);
        }
    }

    handleChange (newText) {
        let message  = newText;
       this.setState({message})
      }
    

    displayUserInput() {

        const newChat = this.state.message;


        // console.log(newChat);

        this.setState({ 
            chats: [...this.state.chats, newChat],
            isAdmin: false
        });


    }

    displayAminInput() {
        
        

        const newChat = 'Sorry, we cannot process your current location!!! Ensure you are connected to the internet and your location is ON.';


        // console.log(newChat);

        this.setState({ 
            chats: [...this.state.chats, newChat],
            isAdmin: true
        });


    }


    
    render() {

        const {whereLat, whereLong} = this.props;
        let { chats } = this.state;
        console.log(chats);

        return(
            <ImageBackground source={bckImage} style={{width: '100%', height: '100%'}}>

            <View style={{position: 'relative', flex: 1}}>

                <View>

                {this.state.loading && (
                    <Text> Fetching your current location </Text>
                )}

                {!this.state.loading && !this.state.error && (

                <Text >Your current location is {this.state.locationQuery}</Text>

                )}

                { this.state.error && (
                   
                    <View >    
                        {/* { this.setState({message: `Sorry, we cannot process your current location!!! <br /> Ensure you are connected to the internet and your location is ON.`})} */}
                    
                    </View>
                )}
                { chats.length < 1 ? null : chats.map(chat => this.checkIfMessageIsSysOrUser(chat))}
                </View>

                <View style={styles.inputPane}>
                   
                    <TextInput 
                    style={styles.textInput} 
                    placeholder="Where would you like to go to?"
                    placeholderTextColor={'#000'}
                    underlineColorAndroid='transparent'
                    onChangeText = {this.handleChange}
                    value = {this.state.message}
                    onSubmitEditing = {this.displayUserInput}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress = {this.displayUserInput}
                       
                    >
                        <Text style={styles.buttonText}>SEND</Text>
                    </TouchableOpacity>
                   
                </View>  
    
                
            </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    messageBox: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 12,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        marginBottom: 3,
        shadowOffset: { width: 10, height: 10},
        shadowColor: '#000',
        shadowOpacity: 1.0,
        shadowRadius: 2,
    },

    messageBoxUser: {
        backgroundColor: '#5a02ad',
        margin: 5,
        padding: 12,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        marginBottom: 3,
        textAlign: 'right',
        color: '#fff'
    },
    button: {
        alignItems: 'center',
        height: 40,
        borderRadius: 25,
        backgroundColor: '#5a02ad',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    textInput: {
        borderRadius: 25, 
        borderWidth: 1, 
        padding: 5, 
        backgroundColor: '#fff', 
        marginRight: 5,
        flex: 3,
        height: 40,
        fontSize: 16, 
        paddingLeft: 12, 
    },
    inputPane: {
        flex: 1, 
        flexDirection: 'row', 
        position: 'absolute',
        top: 272,
        left: 0,
        margin:5,
    }

});

export default Search;