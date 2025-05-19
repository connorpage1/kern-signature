// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
        500: '#7030a0',
        600: '#5a2781',
        },
    },
    components: {
        Button: {
        baseStyle: {
            fontWeight: 'medium',
        },
        },
    },
});

export default theme;
