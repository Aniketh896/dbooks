import React from 'react'

const Member = (props) => {

    const {img, name, post} = props

    return (
        <div className="member">
            <img src={img} alt="Member" style={{width: '120px', borderRadius:'50%'}}/>
            <h3 style={{textAlign:'center'}}>{name}</h3>
            <h4 style={{textAlign:'center'}}>{post}</h4>
        </div>
    )
}

export default Member
