// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

import MainCard from 'components/MainCard';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const Home = (props) => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Home</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 2.5,
                        bgcolor: 'success.light',
                        borderRadius: '8px'
                    }}
                >
                    <Typography variant="h4">Krishna Farm</Typography>
                    <br />
                    <Typography variant="h5">A/P: Pargaon, Tal: Junnar, Dist: Pune 410504</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AnalyticEcommerce title="Receivable" count="3690.70" percentage={300.2} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AnalyticEcommerce title="Payable" count="6340.70" percentage={342.2} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AnalyticEcommerce title="Cash" count="8990.70" percentage={1008.2} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AnalyticEcommerce title="Bank" count="8990.70" percentage={1008.2} isLoss color="warning" extra="$20,395" />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Crop Reminder">
                    <Stack></Stack>
                </MainCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Reports">
                    <Stack></Stack>
                </MainCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Latest Transactions">
                    <Stack></Stack>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Home;
