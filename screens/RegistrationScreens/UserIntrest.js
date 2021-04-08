import React, { useState} from 'react'
import { View, Text, StyleSheet,  Dimensions, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux';
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
            <ScrollView>
                <View style={styles.headerPart}>
                    <Text style={styles.headerText}>Categories</Text>
                    <Text style={styles.titleText}>Select from the options below & help us to get to know you better.</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
                    {intrestData &&
                        intrestData.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => { selectIntrests(item, index) }} style={[styles.itemContainer, { backgroundColor: item.isSelect ? '#FFF6E2' : '#426470' }]}>
                                <Text style={{ textAlign: 'center', color: item.isSelect ? '#263238' : '#8DB8C6', fontSize: 16 }}>{item.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <View>
                    <TouchableOpacity style={{ backgroundColor: "#fff", alignItems: "center", justifyContent: "center", height: 50, borderRadius: 14, borderColor: '#707070' }}
                        onPress={submitUserIntrest}>
                        <Text style={{ color: '#263238', fontSize: 16 }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            { authReducer.signUpLoading && <Loader />}

        </View>
    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { onUserIntrest })(UserIntrest);

const styles = StyleSheet.create({

    itemContainer: {
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: "#707070",
        margin: 5

    },

    headerPart: {
        backgroundColor: '#2B454E',
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
