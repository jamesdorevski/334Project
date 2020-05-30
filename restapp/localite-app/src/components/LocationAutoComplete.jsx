import React, {useState} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";

export const LocationAutoComplete = (props) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
    const [isGeocoding, setIsGeocoding] = React.useState(false);


    const handleChange = address => {
        props.setLocation(address);
        setLatitude(null);
        setLongitude(null);
        setErrorMessage('');

    };

    const handleSelect = selected => {
        props.setLocation(selected);
        setIsGeocoding(true);

        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then(({lat, lng}) => {
                setLatitude(lat);
                setLongitude(lng);
                setIsGeocoding(false);
            })
            .catch(error => {
                setIsGeocoding(false);
                console.log('error', error); // eslint-disable-line no-console
            });
    };

    const handleError = (status, clearSuggestions) => {
        console.log('Error fetching location from Google Maps API', status); // eslint-disable-line no-console
        setErrorMessage(status);
        clearSuggestions();
    };

    return (
        <div>
            <PlacesAutocomplete
                onChange={handleChange}
                value={props.address}
                onSelect={handleSelect}
                onError={handleError}
                shouldFetchSuggestions={props.address.length > 2}
            >
                {({getInputProps, suggestions, getSuggestionItemProps}) => {
                    return (
                        <div className="Location__search-bar-container" >
                            <input style={{height: "40px", width: "350px"}} {...getInputProps()} placeholder="Where are you going?"/>
                            <Paper className="Location__autocomplete-container">
                                {isGeocoding && <div>Loading...</div>}
                                {suggestions.map(suggestion => (
                                    <div {...getSuggestionItemProps(suggestion)}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                ))}
                            </Paper>
                        </div>
                    );
                }}
            </PlacesAutocomplete>
            {errorMessage.length > 0 && (
                <div className="Location__error-message">{errorMessage}</div>
            )}

            {((latitude && longitude) || isGeocoding) && (
                <div>
                    <h3 className="Location__geocode-result-header">Geocode result</h3>
                    {isGeocoding ? (
                        <div>
                            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Location__spinner"/>
                        </div>
                    ) : (
                        <div>
                            <div className="Location__geocode-result-item--lat">
                                <label>Latitude:</label>
                                <span>{latitude}</span>
                            </div>
                            <div className="Location__geocode-result-item--lng">
                                <label>Longitude:</label>
                                <span>{longitude}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default LocationAutoComplete;