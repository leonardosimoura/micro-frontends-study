import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { serviceComunication } from "./servicesComunication";
import { nanoid } from 'nanoid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ListItemApps from "./listItemApps"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Host
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: '42%',
    },
}));


function loadComponent(scope, module) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__("default");

        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        const Module = factory();
        return Module;
    };
}

const useDynamicScript = (args) => {
    const [ready, setReady] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        if (!args.url) {
            return;
        }

        const element = document.createElement("script");

        element.src = args.url;
        element.type = "text/javascript";
        element.async = true;

        setReady(false);
        setFailed(false);

        element.onload = () => {
            console.log(`Dynamic Script Loaded: ${args.url}`);
            setReady(true);
        };

        element.onerror = () => {
            console.error(`Dynamic Script Error: ${args.url}`);
            setReady(false);
            setFailed(true);
        };

        document.head.appendChild(element);

        return () => {
            console.log(`Dynamic Script Removed: ${args.url}`);
            document.head.removeChild(element);
        };
    }, [args.url]);

    return {
        ready,
        failed,
    };
};

function System(props) {
    const { ready, failed } = useDynamicScript({
        url: props.system && props.system.url,
    });

    if (!props.system) {
        return <h2>Please select one app</h2>;
    }

    if (!ready) {
        return <h2>Loading dynamic script: {props.system.url}</h2>;
    }

    if (failed) {
        return <h2>Failed to load dynamic script: {props.system.url}</h2>;
    }

    const Component = React.lazy(
        loadComponent(props.system.scope, props.system.module)
    );

    return (
        <React.Suspense fallback="Loading System">
            <Component serviceComunication={serviceComunication} />
        </React.Suspense>
    );
}

const Notifications = () => {
    serviceComunication.send.subscribe(data => {
        setNotification([
            ...notification,
            data
        ]);
    });

    const [notification, setNotification] = React.useState([]);

    const renderNotification = (notification) => {
        return <li key={notification.id}>{notification.id} - {notification.app} - {notification.title}</li>
    }

    function newNotification() {
        serviceComunication.receive.next({
            id: nanoid(),
            app: 'App1',
            title: 'New Notification From Host',
            data: {}
        });
    }
    return (
        <>
            <h1>Notifications</h1>
            <Button onClick={newNotification} variant="contained" color="primary">New Notification To App</Button>
            <ul>{notification.map(renderNotification)}</ul>
        </>
    );
}

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [apps, setApps] = React.useState([
        {
            source: "http://localhost:3002/1.0.0.remoteEntry.js",
            id: "app1",
            version: "1.0.0",
            name: "App1"
        },
        {
            source: "http://localhost:3002/1.1.0.remoteEntry.js",
            id: "app1",
            version: "1.1.0",
            name: "App1"
        },
        {
            source: "http://localhost:3002/1.2.0.remoteEntry.js",
            id: "app1",
            version: "1.2.0",
            name: "App1"
        },

        {
            source: "http://localhost:3003/1.0.0.remoteEntry.js",
            id: "app2",
            version: "1.0.0",
            name: "App2"
        }
    ]);

    React.useEffect(() => {
        getApps();
    }, []);

    const getApps = () => {
        // if (apps.length == 0)
        //     axios.get('https://localhost:5001/api/Module/host')
        //         .then(function (response) {
        //             setApps(response.data.applications)

        //         })
        //         .catch(function (error) {
        //             console.error(error);
        //         })
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [system, setSystem] = React.useState(undefined);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Host
                    </Typography>
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !true && classes.drawerPaperClose),
                }}
                open={true}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {
                        apps.map(item => {
                            return <ListItemApps key={item.id} app={item} fn={setSystem}></ListItemApps>
                        })
                    }
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <Paper className={fixedHeightPaper}>
                        <System system={system} />
                    </Paper>
                    <hr></hr>
                    <Paper className={fixedHeightPaper}>
                        <Notifications></Notifications>
                    </Paper>
                </Container>
            </main>
        </div >
    );
}