import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    paper: {
      padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
    },
    mapContainer: {
      height: '85vh', width: '100%',
    },
    markerContainer: {
      position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
    },
    pointer: {
      cursor: 'pointer',
    },
    '@global': {
        '.custom-placemark': {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
            '& .placemark-content': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'white',
                padding: '3px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            },
            '& .placemark-pointer': {
                width: '12px',
                height: '12px',
                background: '#ff0000',
                borderRadius: '50%',
                marginTop: '3px'
            },
            '& .place-name': {
                fontSize: '12px',
                whiteSpace: 'nowrap',
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        }
    }
}));