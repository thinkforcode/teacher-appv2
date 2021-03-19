import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, FlatList, Dimensions, TouchableOpacity, Image, StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import { onUserIntrest } from '../../redux/actions/userAction';
// import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import Headers from '../../components/Headers';
import { userIntrestData } from '../../classData';

const UserIntrest = (props) => {
    const [selectedData, setSelectedData] = useState([])
    const [selectCount, setSelectCount] = useState(1)
    const SlideInLeft = useRef(new Animated.Value(0)).current;

    const { userReducer, onUserIntrest } = props

    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })


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

   const submitUserIntrest = () =>{
        onUserIntrest(selectedData, userReducer.loginData.parentId)
    }



    return (
        <View style={{ flex:1 }}>
          <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            <Headers {...props} title="Your Intrest"  title = "Intrest" screen = "UserIntrest" btnText = "Done" item = {selectedData} _doAction = {submitUserIntrest} />
            <View style = {{marginTop:15}}>
                <Text style={{ textAlign: 'center', color: '#ACB9C4', fontSize: 16 }}> Choose from the options below & help us get to {"\n"} know you better</Text>
            </View>
            <Animated.View style={{
                 flex:1,
                transform: [
                    {
                        translateX: SlideInLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [600, 0]
                        })
                    }
                ],
            }}>

            <FlatList
                data={intrestData}
                contentContainerStyle={{ marginBottom:50, marginHorizontal: 15, marginTop: 10 }}
                renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.itemContainer, {borderColor:item.isSelect ? '#E53563':'#C1C6D0'}]} onPress={() => { selectIntrests(item, index) }} >
                            <Text style = {{textAlign:'center', color:item.isSelect?'#E53563':'#35365F', fontSize:16}}>{item.title}</Text>
                            { item.isSelect &&
                                <View style={{ position: 'absolute', top: 5, right: 10 }}>
                                    <AntDesign name="checkcircleo" color="#E53563" size={20} />
                                </View>
                            }
                        </TouchableOpacity>


                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3} />
            </Animated.View>

            {/* { userReducer.signUpLoading && <Loader />} */}

        </View>
    )
}

// const mapStateToProps = (state) => ({
//     userReducer: state.userReducer,
// })

// export default connect(mapStateToProps, { onUserIntrest })(UserIntrest);
export default UserIntrest

const numColumns = 3;
const size = (Dimensions.get('window').width - 20) / numColumns;
const styles = StyleSheet.create({
    itemContainer: {
        borderRadius:10,
        margin: 5,
        width: size - 15,
        height: 104,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderWidth:1,
       
    },

})
