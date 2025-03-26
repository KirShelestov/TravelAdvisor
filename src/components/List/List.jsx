import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import useStyles from "./style";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => createRef());
        setElRefs(refs);
    }, [places]);

    useEffect(() => {
        if (childClicked !== null && elRefs[childClicked]?.current) {
            elRefs[childClicked].current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [childClicked, elRefs]);

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        console.log('Changing type to:', newType);
        setType(newType);
    };

    const handleRatingChange = (e) => {
        const value = e.target.value;
        console.log('Changing rating to:', value);
        setRating(value);
    };

    return (
        <div className={classes.container}>
            <Typography variant="h4">
                {type.charAt(0).toUpperCase() + type.slice(1)} around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={handleTypeChange}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={handleRatingChange}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {Array.isArray(places) && places.length > 0 ? (
                            places.map((place, i) => (
                                <Grid item key={i} xs={12}>
                                    <PlaceDetails 
                                        place={place} 
                                        selected={Number(childClicked) === i}
                                        refProp={elRefs[i]}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" align="center">
                                    No places found
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default List;