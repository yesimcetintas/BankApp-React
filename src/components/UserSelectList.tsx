import React from 'react'

const UserSelectList = (props: any) => {
  return (
    <select onChange={props.onChange} name={props.name} value={props.value}>
      <option>{ props.placeholder }</option>
      {
        props.userList
        .filter((user: any) => user.id !== props.hidden)
        .map(
          (user: any) =>
          <option key={user.id} value={user.id}>{user.adSoyad}</option> 
        )
      }
    </select>
  )
}

export default UserSelectList