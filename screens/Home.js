import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { doLogOut } from '../redux/actions/authActions'



const Home = (props) => {
    const {doLogOut} = props

    const listOfStudent =()=>
    {
        props.navigation.navigate('TotalStudent')
    }

    return (
        <View style = {{flex:1,margin:50}}>
            <TouchableOpacity onPress = {()=>{doLogOut()}}>
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{listOfStudent()}}>
                <Text style={{paddingTop:20}}>Camera</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { doLogOut })(Home);

