import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { onDoneIntroSlider } from '../redux/actions/authActions';



const IntroSlider = (props) => {
    const { authReducer, onDoneIntroSlider  } = props

    const onDone = () => {
        onDoneIntroSlider();
    };


    const _renderNextButton = () => {
        return (
            <TouchableOpacity style={styles.buttonCircle}>
                <Text style={styles.btnText}>Next</Text>
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

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.image} />
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
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            <AppIntroSlider
                data={slides}
                renderItem={RenderItem}
                onDone={onDone}
                activeDotStyle={{ backgroundColor: '#FE4984' }}
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
        width: 147,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#E53563'
    },

    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16
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
        image: require('../assets/images/notification.png'),
        title: "iNotify",
        text: 'Enabling a real time \n notifying service',
    },
    {
        key: 'key2',
        image: require('../assets/images/attendance.png'),
        title: "Attendance",
        text: 'Simplyfying your roll \n calling process',
    },
    {
        key: 'key3',
        image: require('../assets/images/chat.png'),
        title: "Chat",
        text: 'Stay in conversion with \n your teachers'

    },

    {
        key: 'key4',
        image: require('../assets/images/story.png'),
        title: "Story",
        text: 'Tell your friends about \n your learning',
    },
    {
        key: 'key5',
        image: require('../assets/images/curricullam.png'),
        title: "Curriculum Record",
        text: 'Recording the circular performance \n of the students',

    },

];