import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    },
    topsec: {
        backgroundColor: '#B8B6D9',
        height: '348px'
    },
    bottomsec: {
        backgroundColor: '#4E2C5F',
        color: 'white',
        height: '500px'
    },
    h2: {
        marginTop: 0,
    },
    //   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: 'auto',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
 
  
});

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <div className={classes.topsec}>
            <h2 className={classes.h2}>Top sec</h2>
        </div>
        <div className={classes.bottomsec}>
            <h2>Bottom sec</h2>
        </div>
    </div>
  );
}
