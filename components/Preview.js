import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import Headers from './Headers'
import PDFView from 'react-native-view-pdf';
import ImageZoom from 'react-native-image-pan-zoom';
import RNFetchBlob from 'rn-fetch-blob'
// import { downloadImage } from '../redux/actions/dashboardAction';
// import { connect } from 'react-redux';
import { shareImage } from '../functions/commonfunction';


const Preview = (props) => {
    // const [previewData, setpreviewData] = useState(null)
    // const {dashboardReducer, downloadImage} = props

    // useEffect(() => {
    //     const paramsData = props.route.params.data;
    //     setpreviewData(paramsData)
    //     return () => {}
    // }, [])

     


    const [previewData, setpreviewData] = useState({
        type: "image", imageUrl: "https://wallpapercave.com/wp/wp3190622.jpg"
    })

    const downloadData = () => {
        const img = previewData.imageUrl ? previewData.imageUrl : previewData.resourceUrl
        downloadImage(img)
    }


    const shareData = () => {
        shareImage(previewData)
    }


    return (
        <View style={{ flex: 1 }}>
            {/* { previewData && */}
            <View style={{ flex: 1 }}>
                {previewData.type == 'image' &&
                    <View style={{ backgroundColor: '#000' }}>
                        <ImageZoom cropWidth={Dimensions.get('window').width}
                            cropHeight={Dimensions.get('window').height-80}
                            imageWidth={Dimensions.get('window').width}
                            imageHeight={Dimensions.get('window').height}>
                            <Image style={{ height:null , width: null, flex: 1, resizeMode: 'contain' }}
                                source={{ uri: previewData.imageUrl ? previewData.imageUrl : previewData.resourceUrl }} />
                        </ImageZoom>
                    </View>


                }


                {(previewData.type == 'pdf' || previewData.type == 'application') &&
                    <View style={{ flex: 1 }}>
                        <PDFView
                            style={{ flex: 1, zIndex: -999 }}
                            onError={(error) => console.log('onError', error)}
                            onError={(err) => { alert("Error to View documents", err); props.navigation.goBack(); }}
                            resource={previewData.imageUrl ? previewData.imageUrl : previewData.resourceUrl}
                            resourceType="url"
                        />
                    </View>
                }
            </View>
            {/* } */}


        </View>
    )
}

// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, { downloadImage })(Preview);

export default Preview