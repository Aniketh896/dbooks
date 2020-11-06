// Accordian
import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Accordiancomp = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><strong>My First Book</strong> {/* {title} Put your title Here */}  </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                <p>0#dai2eeqe2jdajda {/* {address} put your address here */} </p>
                <p><span><strong>Price: </strong>Rs. </span><span>500 {/* {price} put the price here */}</span></p>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><strong>My Second Book</strong> {/* {title} Put your title Here */}  </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                <p>0#2uihei2iuehihd2 {/* {address} put your address here */} </p>
                <p><span><strong>Price: </strong>Rs. </span><span>550 {/* {price} put the price here */}</span></p>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><strong>My Third Book</strong> {/* {title} Put your title Here */}  </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                <p>0#jsdhsk323kek23g {/* {address} put your address here */} </p>
                <p><span><strong>Price: </strong>Rs. </span><span>490 {/* {price} put the price here */}</span></p>
              </Typography>
            </AccordionDetails>
          </Accordion>
      
    </div>
    )
}



export const Accordiancomp2 = () => {
  const classes = useStyles();

    return (
        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><strong>My New Book</strong> {/* {title} Put your title Here */}  </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                <p>0#dai2edadadajda {/* {address} put your address here */} </p>
                <p><span><strong>Price: </strong>Rs. </span><span>700 {/* {price} put the price here */}</span></p>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><strong>My Old Book</strong> {/* {title} Put your title Here */}  </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                <p>0#2uihei2adadada2 {/* {address} put your address here */} </p>
                <p><span><strong>Price: </strong>Rs. </span><span>650 {/* {price} put the price here */}</span></p>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><strong>My Very Old Book</strong> {/* {title} Put your title Here */}  </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" gutterBottom>
                <p>0#jsdhsk3dadadadg {/* {address} put your address here */} </p>
                <p><span><strong>Price: </strong>Rs. </span><span>590 {/* {price} put the price here */}</span></p>
              </Typography>
            </AccordionDetails>
          </Accordion>
      
    </div>
    )
}

export default Accordiancomp
