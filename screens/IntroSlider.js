import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { onDoneIntroSlider } from '../redux/actions/authActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IntroSlider = (props) => {
    const { authReducer, onDoneIntroSlider } = props
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    const onDone = () => {
        onDoneIntroSlider();
    };


    const _renderNextButton = () => {
        return (
            <TouchableOpacity style={styles.buttonCircle}>
                <Text style={styles.btnText}>
                    <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
                </Text>
            </TouchableOpacity>
        );
    };

    const _renderDoneButton = () => {
        return (

            <TouchableOpacity style={styles.buttonCircle}>
                <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
        );
    };

    const RenderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={item.image} style={{ height: 300, resizeMode: 'contain' }} />
                <Text style={styles.introTitleStyle}>
                    {item.title}
                </Text>
                <Text style={styles.introTextStyle}>
                    {item.text}
                </Text>

            </View>
        );
    };

    return (
        <View style={{ flex: 1, }}>
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            <AppIntroSlider
                data={slides}
                renderItem={RenderItem}
                onDone={onDone}
                activeDotStyle={{ backgroundColor: '#263238', width: 20, height:5 }}
                dotStyle = {{backgroundColor:'grey'}}
                bottomButton={true}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
            />
        </View>
    );
};



const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { onDoneIntroSlider })(IntroSlider);


const styles = StyleSheet.create({

    buttonCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFC800'
    },

    btnText: {
        color: '#fff',
        textAlign: 'center',

    },

    introTextStyle: {
        fontSize: 16,
        color: '#84859B',
        textAlign: 'center',
        paddingTop: 10
    },

    introTitleStyle: {
        fontSize: 20,
        color: '#35365F',
        textAlign: 'center',
        fontWeight: 'bold',
    },

});


const slides = [
    {
        key: 'key1',
        image: require('../assets/images/attendance.png'),
        title: "Attendance management \n system",
        text: 'Enabling a real time \n notifying service',
        backgroundColor: '#FFF6E2',
    },
    {
        key: 'key2',
        image: require('../assets/images/notification.png'),
        title: "Attendance",
        text: 'Simplyfying your roll \n calling process',
        backgroundColor: '#FFF6E2',
    },
    {
        key: 'key3',
        image: require('../assets/images/talent.png'),
        title: "Chat",
        text: 'Stay in conversion with \n your teachers',
        backgroundColor: '#FFF6E2',

    },

    {
        key: 'key4',
        image: require('../assets/images/student.png'),
        title: "Story",
        text: 'Tell your friends about \n your learning',
        backgroundColor: '#FFF6E2',
    },

    {
        key: 'key5',
        image: require('../assets/images/management.png'),
        title: "Curriculum Record",
        text: 'Recording the circular performance \n of the students',
        backgroundColor: '#FFF6E2',

    },

];