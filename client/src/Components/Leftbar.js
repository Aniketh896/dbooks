// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '300px'
//     },
//     topsec: {
//         backgroundColor: '#B8B6D9',
//         height: '348px'
//     },
//     bottomsec: {
//         backgroundColor: '#4E2C5F',
//         color: 'white',
//         height: '500px'
//     },
//     h2: {
//         marginTop: 0,
//     },

  
// });

// export default function ClippedDrawer() {
//   const classes = useStyles();

//   return (
//     <div className={classes.container}>
//         <div className={classes.topsec}>
//             <h2 className={classes.h2}>Top sec</h2>
//         </div>
//         <div className={classes.bottomsec}>
//             <h2>Bottom sec</h2>
//         </div>
//     </div>
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function Leftbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Horror', 'Comedy', 'Romance', 'Thriller'].map((text, index) => (
              <ListItem button key={text}>
                
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

