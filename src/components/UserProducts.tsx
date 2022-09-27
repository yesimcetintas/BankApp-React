import React from 'react'

const UserProducts:any = (props: any) => {

  return (
    <>
      <button onClick={props.onClose}>Kapat</button>

      <ul>
        {
          props.userProduct
          .map((prod: any,i: any)=> 
            <li key={i} className="userProduct_product">
              <span>{prod.productName} {prod.price}</span>
            </li>
          )
          }
      </ul>
    
    </>

  )
}

export default UserProducts