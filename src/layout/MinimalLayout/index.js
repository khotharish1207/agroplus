import { Outlet } from 'react-router-dom';
import Alerts from 'components/Alerts';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
    </>
);

export default MinimalLayout;
