import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { CloseOutlined } from '@ant-design/icons';

export default function Alerts({ severity, onClose, message }) {
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => setOpen(true), []);

    return (
        <Collapse in={open}>
            <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            onClose();
                            setOpen(false);
                        }}
                    >
                        <CloseOutlined />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Collapse>
    );
}

Alerts.defaultProps = {
    severity: 'info',
    onClose: () => null,
    message: ''
};
