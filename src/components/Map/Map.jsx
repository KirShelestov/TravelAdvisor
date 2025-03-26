import React from "react";
import { YMaps, Map as YandexMap, SearchControl, Placemark } from '@pbe/react-yandex-maps';
import useStyles from "./style";


const Map = ({ setCoordinates, setBounds, coordinates, places = [], setChildClicked }) => {
    const classes = useStyles();

    const defaultImageUrl = 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';

    const handleBoundsChange = (event) => {
        try {
            const mapInstance = event.get('target');
            if (!mapInstance) return;

            const bounds = mapInstance.getBounds();
            const center = mapInstance.getCenter();

            setCoordinates({ lat: center[0], lng: center[1] });
            setBounds({
                sw: { lat: bounds[0][0], lng: bounds[0][1] },
                ne: { lat: bounds[1][0], lng: bounds[1][1] }
            });
        } catch (error) {
            console.error('Error updating bounds:', error);
        }
    };

    const mapState = React.useMemo(() => ({
        center: [coordinates.lat, coordinates.lng],
        zoom: 14,
        controls: ['zoomControl']
    }), [coordinates]);

    return (
        <div className={classes.mapContainer}>
            <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY }}>
                <YandexMap
                    state={mapState}
                    style={{ width: '100%', height: '100%' }}
                    onBoundsChange={handleBoundsChange}
                    modules={['control.SearchControl', 'control.ZoomControl']}
                >
                    <SearchControl 
                        options={{
                            float: 'right',
                            provider: 'yandex#search',
                            size: 'large'
                        }}
                    />
                    {places?.map((place, i) => (
                        place.latitude && place.longitude ? (
                            <Placemark
                                key={i}
                                geometry={[Number(place.latitude), Number(place.longitude)]}
                                onClick={() => setChildClicked(i)}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: place.photo?.images?.small?.url || defaultImageUrl,
                                    iconImageSize: [35, 35],
                                    iconImageOffset: [-17, -17]
                                }}
                                properties={{
                                    hintContent: place.name,
                                    balloonContent: `
                                        <div style="text-align: center;">
                                            <h3>${place.name}</h3>
                                            <img src="${place.photo?.images?.small?.url || defaultImageUrl}" 
                                                 style="width: 150px; height: auto; border-radius: 8px; margin: 8px 0;"/>
                                            <p>Rating: ${place.rating || 'No rating'}</p>
                                        </div>
                                    `
                                }}
                            />
                        ) : null
                    ))}
                </YandexMap>
            </YMaps>
        </div>
    );
};

export default Map;
