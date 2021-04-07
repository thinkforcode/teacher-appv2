import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, FlatList, Dimensions, TouchableOpacity, StatusBar,ScrollView } from 'react-native'
import { connect } from 'react-redux';
import Headers from '../../components/Headers';
import { userIntrestData } from '../../classData';
import Loader from '../../components/Loader';
import { onUserIntrest } from '../../redux/actions/authActions';

const width = Dimensions.get('window').width
const UserIntrest = (props) => {
    const [selectedData, setSelectedData] = useState([])
    const [selectCount, setSelectCount] = useState(1)

    const { authReducer, onUserIntrest } = props

    const [intrestData, setIntrestData] = useState(userIntrestData)


    const selectIntrests = (item, index) => {
        item.isSelect = !item.isSelect
        if (item.isSelect) {
            setSelectCount(selectCount - 1)
            selectedData[index] = item
        }
        else {
            setSelectedData(selectedData.splice(index, 1))
            setSelectCount(selectCount + 1)
        }
        intrestData[index] = item
        setSelectedData(selectedData)
        setIntrestData(intrestData)
    }

    const submitUserIntrest = () => {
        onUserIntrest(selectedData)
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#2B454E" }}>
            <StatusBar backgroundColor="#2B454E" barStyle="light-content" />
            <View style={styles.headerPart}>
                <Text style={styles.headerText}>Categories</Text>
                <Text style={styles.titleText}>Select from the options below & help us to get to know you better.</Text>
            </View>
            <ScrollView horizontal>
            <FlatList
                data={intrestData}
                contentContainerStyle={{ marginHorizontal: 15, }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (

                    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.isSelect ? '#FFF6E2' : '#426470' }
                    ]} onPress={() => { selectIntrests(item, index) }} >

                        <Text style={{ textAlign: 'center', color: item.isSelect ? '#263238' : '#8DB8C6', fontSize: 16 }}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                
                  numColumns={3}
                 />
                 </ScrollView>
            <View style={{ marginHorizontal: 45, marginBottom: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "#fff", alignItems: "center", justifyContent: "center", height: 50, borderRadius: 14, borderColor: '#707070' }}
                    onPress={submitUserIntrest}>
                    <Text style={{ color: '#263238', fontSize: 16 }}>Done</Text>
                </TouchableOpacity>
            </View>
            { authReducer.signUpLoading && <Loader />}

        </View>
    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { onUserIntrest })(UserIntrest);

const numColumns = 3;
const size = (Dimensions.get('window').width - 20) / numColumns;
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        borderRadius: 6,
        margin: 5,
        paddingHorizontal:15,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#426470",
        borderColor:"#707070"

    },

    headerPart: {
        backgroundColor: '#2B454E',
        width: '100%',
        height: Dimensions.get('window').height / 3,
        justifyContent: "center"
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff",
        paddingHorizontal: 15
    },
    titleText: {
        fontSize: 16,
        color: "#C6DBE2",
        paddingHorizontal: 15,
        paddingTop: 10
    },
    


})
