import React from 'react'

const GroupPage = async({params}) => {

    const { id }= await params;
  return (
    <div> Grouppage: {id} </div>
  )
}

export default Group