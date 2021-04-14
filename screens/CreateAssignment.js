import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, SafeAreaView, Dimensions, Image, ImageBackground,TextInput } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, getOnlineClass, selectClass, selectSection } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { curricullumData } from '../classData.js'
import { deletePost, getStory, like, createStories, retreiveMore, gotoStory } from '../redux/actions/storyActions'


const CreateAssignment = (props) => {
    const [isClassModal, setIsClassModal] = useState(false)
    const [isSectionModal, setIsSectionModal] = useState(false)

    const [curricullumSize, setCurricullumSize] = useState(4)
    const [curricullum, setCurricullum] = useState(curricullumData)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');




    const { getClass, selectClass, loginData, standard, sections, selectedClass, selectSection, getStory, stories, onlineClass, getOnlineClass } = props

    useEffect(() => {
        if (loginData != null) {
            getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])


    

   


    const _selectClassAndSection = (standardStatus, sectionStatus, item) => {
        _closeModal()
        if (standardStatus) {
            selectClass(item.standard)
        }
        else {
            selectSection(item.section)
        }
    }

    const _closeModal = () => {
        setIsClassModal(false)
        setIsSectionModal(false)
    }


    const _openClassAndSectionModal = (standardStatus, sectionStatus) => {
        setIsClassModal(standardStatus)
        setIsSectionModal(sectionStatus)
    }


    

    // console.log("online class", onlineClass)




    const renderHeader = () => {
        return (
            <View style={{marginHorizontal:15}}>
                <View style={styles.titleSpace}>
                   <Text style={styles.titleText}>Subject</Text>
                   <View style={styles.inputStyle}>
                        <TextInput
                            style={{ color:"#2B454E" }}
                             placeholder="Enter Subject"
                             value={title}
                             placeholderTextColor="#2B454E"
                            onChangeText={(value) => setTitle(value)} />
                    </View>
                </View>

                <View style={styles.space}>
                   <Text style={styles.titleText}>Description</Text>
                   <View style={styles.inputStyle}>
                        <TextInput
                            style={{ color:"#2B454E" }}
                             multiline
                             placeholder="Enter Description"
                             value={description}
                             placeholderTextColor="#2B454E"
                            onChangeText={(value) => setDescription(value)} />
                    </View>
                </View>
                <View style={styles.space}>
                   <Text style={styles.titleText}>Deadlines</Text>
                   <View style={styles.deadlineStyle}>
                        <TextInput
                            style={{ color:"#2B454E" }}
                             placeholder=" Enter Deadline"
                             value={deadline}
                             placeholderTextColor="#2B454E"
                            onChangeText={(value) => setDeadline(value)} />
                            <TouchableOpacity ><MaterialCommunityIcons name="calendar-month-outline" size={18} color="#2B454E" /></TouchableOpacity>
                    </View>
                </View>
                
                <View style={{marginTop:20}}>
                   <Text style={styles.titleText}>Attachment</Text>
                   <View style={{flexDirection:"row",alignItems:"center"}}>
                   <View style={styles.pdfStyle}>
                        <MaterialCommunityIcons name="file-pdf" size={50} color="#2B454E" />
                   </View>
                   <TouchableOpacity style={{paddingLeft:20,marginTop:15}}><MaterialCommunityIcons name="plus-circle-outline" size={30} color="#2B454E" /></TouchableOpacity>
                   </View>
                   <Text style={{marginTop:5,color:"#707070",fontSize:12}}>Document.pdf</Text>
                </View>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                <TouchableOpacity style={styles.buttonStyle}>
                     <Text style={styles.buttonText}>Create Assignment</Text>
                </TouchableOpacity>
                </View>




            </View>

        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <HomeHeader
                {...props}
                title="Create a new Assignment" screen="Assignment"
                selectClassAndSection={_selectClassAndSection}
                closeModal={_closeModal}
                isClassModal={isClassModal}
                isSectionModal={isSectionModal}
                classesArr={standard}
                openClassSectionModal={_openClassAndSectionModal}
                isSelect={true}
                sectionsArr={sections}
                selectedClass={selectedClass}
                loginData={loginData} />

            <FlatList
                style={{ paddingBottom: 20 }}
                contentContainerStyle={{ backgroundColor: '#fff', }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"

                ListHeaderComponent={renderHeader}
                refreshing={true}
                keyExtractor={(item, index) => { index.toString() }}
            />

           

        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    authReducer: state.authReducer,
    standard: state.mainReducer.allStandard,
    sections: state.mainReducer.allSections,
    selectedClass: state.mainReducer.selectedClass,



})

export default connect(mapStateToProps, { getClass, selectClass, getStory, doLogOut, selectSection, getOnlineClass })(CreateAssignment);

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
inputBox: {
        flex: 1,
        height: 45,
        borderBottomWidth: 0.5,
        borderColor: '#A3A4A7',
        fontWeight: "500"
},
titleText:{
    fontSize:14,
    color:"#707070"
},
inputStyle:{
    borderBottomWidth: 0.5, 
     borderColor: "#A3A4A7"
},
deadlineStyle:{
    borderBottomWidth: 0.5,
      borderColor: "#A3A4A7",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center" 
},
pdfStyle:{
    backgroundColor:"#f2f2f2",
    width:107,height:90,
    alignItems:"center",
    justifyContent:"center",
    marginTop:15,
    borderRadius:10
},
buttonStyle:{
    marginTop:100 ,
    width:250,
    height:50,
    backgroundColor:"#2B454E",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:30,
    borderRadius:10
},
buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:'500'
},
titleSpace:{
    marginVertical:15
},
space:{
    marginVertical:20
}

})
