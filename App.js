import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'



// import the different screens
import Loading from './src/screen/loading'
import SignUp from './src/screen/signup'
import Login from './src/screen/login'
import Main from './src/screen/main'



// create our app's navigation stack

const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App