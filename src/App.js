// project import
import React from 'react';
import { useSelector } from 'react-redux';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import Backdrop from 'components/Backdrop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    const { loading } = useSelector((state) => state.app);
    return (
        <ThemeCustomization>
            <Backdrop open={loading} />
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );
};

export default App;
