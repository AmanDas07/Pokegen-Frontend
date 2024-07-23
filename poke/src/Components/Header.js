import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import BattleIcon from '@mui/icons-material/SportsKabaddi';
import AboutIcon from '@mui/icons-material/Info';
import GenerateIcon from '@mui/icons-material/Build';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Box } from '@mui/material';

const PREFIX = 'Header';

const classes = {
    root: `${PREFIX}-root`,
    button: `${PREFIX}-button`,
    toolbar: `${PREFIX}-toolbar`
};

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        flexGrow: 1,
    },
    [`& .${classes.button}`]: {
        marginLeft: theme.spacing(2),
        fontSize: '1.25rem',
    },
    [`& .MuiSvgIcon-root`]: {
        fontSize: '1.5rem',
    },
    [`& .${classes.toolbar}`]: {
        minHeight: '128px',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    }
}));

function Header() {
    return (
        <Root className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: '#18121c', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Toolbar className={classes.toolbar}>
                    <Box display="flex" alignItems="center">
                        <img src="https://i.ibb.co/cgJzxdC/41acc10d-609a-4b8c-96e7-a0b851a531a8-1.jpg" title='POKEGEN' style={{ width: '50%', maxWidth: '150px', marginRight: '16px' }} />
                    </Box>
                    <Box>
                        <Button color="inherit" startIcon={<BattleIcon />} className={classes.button}>Battle</Button>
                        <Button color="inherit" startIcon={<AboutIcon />} className={classes.button}>About</Button>
                        <Button color="inherit" startIcon={<GenerateIcon />} className={classes.button}>Generate Now</Button>
                        <Button color="inherit" startIcon={<CollectionsIcon />} className={classes.button}>Collections</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Root>
    );
}

export default Header;
