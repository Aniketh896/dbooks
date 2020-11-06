

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { members } from '../data/members'
import Member from '../data/Member'




const DevTeam = () => {

  // const classes = useStyles();

  return (
    <div className="devteam" style={{display: 'flex'}}>
      {members.map((members) => {
        return <div style={{marginLeft:'30px', marginRight:'30px'}}><Member key={members.id} {...members}></Member></div>
      })}
    </div>
  )
}

export default DevTeam

