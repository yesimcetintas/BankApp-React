import React from 'react'

const ProductSelectList: any = (props: any) => {

  return (
    <select onChange={props.onChange} value={props.value} name={props.name}>
      <option>{props.placeholder}</option>
      {
        props.sellerProducts
        ?.map(
          (product: any) =>
          <option key={product.id} value={product.id}>{product.productName}</option> 
        )
      }

    </select>
  )
}

export default ProductSelectList