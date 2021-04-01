import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');

export default function Autoplace(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder={props.title}
      minLength={2}
      placeholderTextColor="#8F8FA6"
      autoFocus={false}
      returnKeyType={'search'}
      keyboardAppearance={'light'}
      listViewDisplayed='auto'
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(data, details = null) => { props.addAddress(data, details) }}
      getDefaultValue={() => ''}
      query={{
        key: 'AIzaSyCUBLpGN5gmfZFfhMhqPO4Hq_zDHBoIsXU',
        language: 'en',
      }}

      styles={{
        textInputContainer: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        },

        textInput: {
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#C1C6D0',
          marginVertical: 10,
          backgroundColor: 'transparent',
          color: '#94A1AC',
          borderRadius:10

        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch'
      GoogleReverseGeocodingQuery={{}}

      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      GooglePlacesDetailsQuery={{
        fields: 'formatted_address',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      debounce={200}
    />
  )
}
