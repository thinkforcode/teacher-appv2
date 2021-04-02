import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { doLogOut } from '../redux/actions/authActions'



const Home = (props) => {
    const {doLogOut} = props

    const Assignment =()=>
    {
       props.navigation.navigate("Assignment")
    }

    const Gallery =()=>
    {
       props.navigation.navigate("Gallery")
    }
    

    return (
        <View style = {{flex:1,margin:50}}>
            <TouchableOpacity onPress = {()=>{doLogOut()}}>
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{Assignment()}}>
                <Text style={{paddingTop:20}}>Assignment</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{Gallery()}}>
                <Text style={{paddingTop:20}}>Gallery</Text>
            </TouchableOpacity>

            
        </View>
    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { doLogOut })(Home);

