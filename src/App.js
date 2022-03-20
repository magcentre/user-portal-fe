
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    
    return (
        <StyledEngineProvider injectFirst>
            <SnackbarProvider >
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </SnackbarProvider>
        </StyledEngineProvider>
    );
};

export default App;
