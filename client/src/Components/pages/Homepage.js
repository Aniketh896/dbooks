import React from 'react'

import Navcomponent from "../Navcomponent"
import Leftbar from "../Leftbar"
import Card from "../Card"


import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  content: {
  display: 'flex',
  paddingTop: '63.99px',
  height: '100vh',
  overflow: 'hidden',
},

leftbar: {
  position: 'fixed',
  overflowX: 'hidden',
},

books: {
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  marginLeft: 300,
  marginRight: 'auto',
  padding: "0 auto",
},

h3: {
  marginLeft: 20,
  marginBottom: 0,
},

bookcard: {
  display: 'flex',
  height: 350,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: 20,
},
})



const Homepage = () => {

const classes = useStyles();

    return (
        <div>
            <div className={classes.container} style={{display:"flex", flexDirection: "column"}}>
                <div className={classes.content}>
                    <div className={classes.leftbar}>
                        <Leftbar />
                    </div>
                    <div className={classes.books}>
                        <h3 className={classes.h3}>Latest Books</h3>
                        <hr style={{margin: "0 20px 10px 20px"}}/>
                        <div className={classes.Card}>
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                        <h3 className={classes.h3}>Explore Books</h3>
                        <hr style={{margin: "0 20px 10px 20px"}}/>
                        <div className={classes.Card}>
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
