import React from 'react'

const Member = (props) => {

    const {img, name, post} = props

    return (
        <div className="member">
            <img src={img} alt="Member" style={{width: '150px', borderRadius:'50%'}}/>
            <h2 style={{textAlign:'center'}}>{name}</h2>
            <h3 style={{textAlign:'center'}}>{post}</h3>
        </div>
    )
}

export default Member
