
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { nanoid } from 'nanoid';
export default function ListItemApps(props) {
    console.log(props);
    const app = props.app;
    const onClick = () => {
        const data = {
            url: app.source,
            scope: app.id + "_" + app.version.split(".").join("_"),
            module: "./" + app.name,
        };
        props.fn(data);
    }

    return <ListItem button key={app.id + "-" + app.version} onClick={onClick} >
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={app.id + "-" + app.version} />
    </ListItem>
}