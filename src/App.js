import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

import { getPlacesData } from "./api";

import Header from "./components/Header/Header";
import List from "./components/List/List";  
import Map from "./components/Map/Map";

const theme = createTheme();

const App = () => {
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        if (bounds) {
            setIsLoading(true);
            getPlacesData(type, bounds)
                .then((data) => {
                    console.log('Places data:', data);
                    const validPlaces = data?.filter(place => place.name && place.num_reviews > 0);
                    setPlaces(validPlaces);
                    setFilteredPlaces(validPlaces);
                    setIsLoading(false);
                });
        }
    }, [type, bounds]);

    useEffect(() => {
        const filtered = places.filter((place) => {
            return place.rating && (!rating || Number(place.rating) >= Number(rating));
        });
        setFilteredPlaces(filtered);
    }, [rating, places]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header setCoordinates={setCoordinates}/>
                <Grid container spacing={0} style={{ width: '100%' }}>
                    <Grid item xs={12} md={4}>
                        <List 
                            places={filteredPlaces}
                            childClicked={childClicked}
                            isLoading={isLoading}
                            type={type}
                            setType={setType}
                            rating={rating}
                            setRating={setRating}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces}
                            setChildClicked={setChildClicked}
                        />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;