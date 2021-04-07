import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, selectClass } from '../redux/actions/mainActions';


const Home = (props) => {
    const {doLogOut} = props

    const { getClass,  selectClass, loginData, standard, sections, selectedClass } = props

    useEffect(() => {
        if(loginData!= null){
             getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])

    const _selectClass = (item) => {
        console.log("_selectClass", item)
        // selectClass(item)
    }
    const _selectSection = (item) =>{
        console.log("item is", item)
    }

    console.log("classes", standard, sections , selectedClass)
    

    return (
        <View style = {{flex:1}}>
            <HomeHeader {...props} classesArr = {standard} sectionsArr = {sections} selectedClass = {selectedClass} loginData = {loginData} selectStandard = {_selectClass} selectSection = {_selectSection} />
            {/* <TouchableOpacity onPress = {()=>{doLogOut()}}>
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{Assignment()}}>
                <Text style={{paddingTop:20}}>Assignment</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{Gallery()}}>
                <Text style={{paddingTop:20}}>Gallery</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress = {()=>{UserIntrest()}}>
                <Text style={{paddingTop:20}}>UserIntrest</Text>
            </TouchableOpacity>

            
        </View>
    )
}


const mapStateToProps = (state) => ({
    loginData:state.mainReducer.loginData,
    classes: state.mainReducer.classes,
    authReducer: state.authReducer,
    standard:state.mainReducer.standard,
    sections:state.mainReducer.sections,
    selectedClass:state.mainReducer.selectedClass
})

export default connect(mapStateToProps, { getClass, selectClass, doLogOut })(Home);


