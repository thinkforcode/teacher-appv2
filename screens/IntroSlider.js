import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { onDoneIntroSlider } from '../redux/actions/authActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width
    const Height = Dimensions.get('window').height

const IntroSlider = (props) => {
    const { authReducer, onDoneIntroSlider } = props
    

    const onDone = () => {
        onDoneIntroSlider();
    };


    const _renderNextButton = () => {
        return (
            <TouchableOpacity style={styles.buttonCircle}>
                <Text style={styles.btnText}>
                    <MaterialCommunityIcons name="chevron-right" size={18} color="#fff" />
                </Text>
            </TouchableOpacity>
        );
    };

    const _renderDoneButton = () => {
        return (

            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
        );
    };

    const RenderItem = ({ item, index }) => {
        console.log("item", item, index)
        return (

            <ScrollView>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={{ backgroundColor: item.backgroundColor, width: width, height:Height/2, alignItems: "center" }}>
                   <Image source={item.image} style={styles.imageStyle} />

                </View>

                <View style={styles.titleStyle}>
                    <Text style={styles.introTitleStyle}>
                        {item.title}
                    </Text>
                    <Text style={styles.introTextStyle}>
                        {item.text}
                    </Text>
                </View>
            </ScrollView>
     );
    };

    return (
        <View style={{ flex: 1 }}>
            <AppIntroSlider
                data={slides}
                renderItem={RenderItem}
                onDone={onDone}
                activeDotStyle={styles.activeDot}
                dotStyle={styles.dotStyleText}
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

    headerPart: {
        backgroundColor: '#2B454E',
        width: '100%',
        height: Dimensions.get('window').height / 3,
        justifyContent: "center"
    },

    buttonCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#263238'
    },

    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "500"

    },


    introTextStyle: {
        fontSize: 14,
        color: '#A3A4A7',
        textAlign: 'center',
        paddingTop: 10
    },

    introTitleStyle: {
        fontSize: 25,
        fontWeight: 500,
        color: '#263238',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    nextButton: {
        width: 145,
        height: 45,
        backgroundColor: "#263238",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    imageStyle:{
        alignItems: "center",
        height: Height / 2.5,
        resizeMode: "contain",
        marginTop: Height / 5,
    },

    activeDot:{
        backgroundColor: '#FFC800',
        width: 20,
        height: 5
    },

    titleStyle:{
        marginTop: Height / 7
    },

    dotStyleText:
    {
        backgroundColor: "#A3A4A7",
        height: 5
    },
    

});


const slides = [
    {
        key: 'key1',
        image: require('../assets/images/attendance.png'),
        title: "Attendance Management \n System",
        text: 'Enabling a face recognition attendance \n process for quick roll calling ',
        backgroundColor: '#FFF6E2',
    },
    {
        key: 'key2',
        image: require('../assets/images/notification.png'),
        title: "Get Notified Instantly",
        text: 'Know when an event takes place  \n at your institute premises',
        backgroundColor: '#E4F8FE',
    },
    {
        key: 'key3',
        image: require('../assets/images/talent.png'),
        title: "Showcase Your Talent",
        text: 'Upload your recent research result in a closed \n social media platform',
        backgroundColor: '#FFEFEC',

    },

    {
        key: 'key4',
        image: require('../assets/images/student.png'),
        title: "Smartly Manage Your \n Students ",
        text: 'Integrating all your regular management \n efforts',
        backgroundColor: '#D9FDEA',
    },

    {
        key: 'key5',
        image: require('../assets/images/management.png'),
        title: "Enhanced Class Management",
        text: 'Looking into automating and recording your \n class activities',
        backgroundColor: '#EAE4FC',

    },

];