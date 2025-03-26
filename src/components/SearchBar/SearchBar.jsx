import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ setCoordinates }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            try {
                const ymaps = window.ymaps;
                if (!ymaps) return;

                const results = await ymaps.geocode(searchQuery);
                const firstGeoObject = results.geoObjects.get(0);
                
                if (firstGeoObject) {
                    const coords = firstGeoObject.geometry.getCoordinates();
                    setCoordinates({ lat: coords[0], lng: coords[1] });
                }
            } catch (error) {
                console.error('Geocoding error:', error);
            }
        }
    };

    return (
        <Box position="absolute" 
             top={20} 
             left="50%" 
             style={{ transform: 'translateX(-50%)', zIndex: 1 }}>
            <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="Search locations..."
                variant="outlined"
                size="small"
                sx={{ 
                    bgcolor: 'white', 
                    borderRadius: 1,
                    width: '300px'
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;