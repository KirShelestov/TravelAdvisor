import axios from 'axios';

const apiKey = process.env.REACT_APP_YANDEX_API_KEY;
const script = document.createElement("script");
script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`;
script.type = "text/javascript";
document.head.appendChild(script);

export const getPlacesData = async (type = 'restaurants', bounds) => {
    try {
        console.log('Fetching data for type:', type, 'bounds:', bounds);
        
        if (!bounds?.sw || !bounds?.ne) {
            console.log('Missing bounds');
            return [];
        }

        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
                limit: '30',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
            }
        });

        return data || [];
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};