import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, InputAdornment, IconButton, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './style';

const SUGGEST_URL = "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=" + process.env.REACT_APP_YANDEX_API_KEY;

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); 

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await fetch(`${SUGGEST_URL}&geocode=${searchQuery}`);
          const data = await response.json();
          const results = data.response.GeoObjectCollection.featureMember.map(
            (item) => item.GeoObject.name
          );
          setSuggestions(results);
        } catch (error) {
          console.error("Suggestion error:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${SUGGEST_URL}&geocode=${query}`);
      const data = await response.json();
      const firstGeoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
      
      if (firstGeoObject) {
        const coords = firstGeoObject.Point.pos.split(" ").map(Number).reverse();
        setCoordinates({ lat: coords[0], lng: coords[1] });
        setSearchQuery(query);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex" alignItems="center">
          <Autocomplete
            freeSolo
            options={suggestions}
            onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
            onChange={(event, newValue) => {
              if (newValue) handleSearch(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations..."
                variant="outlined"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  className: classes.input,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleSearch(searchQuery)} size="small">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
