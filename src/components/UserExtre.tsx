import React from 'react'

const UserExtre :any = (props: any) => {

  return (
    <>
      <button onClick={props.onClose}>Kapat</button>
      <ul>
        {
          props.userExtre.map((info:any,i:any)=>
            <li key={i} className='userProduct_product'>
              
              <span>{info}</span>
            </li>
          )
          
        }
      </ul>
    </>
  )
}

export default UserExtre