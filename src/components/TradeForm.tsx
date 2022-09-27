import { format } from 'path'
import React, { useState } from 'react'
import ProductSelectList from './ProductSelectList'
import UserSelectList from './UserSelectList'

type TradeInputType = {
  tradeProduct: string,
  sender: string,
  buyer: string,
}

const TradeForm: any= (props: any) => {

  const [tradeInput, setTradeInput] = useState<TradeInputType>({
    tradeProduct: '',
    sender: '',
    buyer: '',
  })

  const handleChange = (event: any) => {
    const key = event.currentTarget.name
    const value = event.currentTarget.value
    const newInput = { ...tradeInput, [key]: value }
    setTradeInput(newInput)
  }

  const sellerProducts = props.userListData.find(
    (elm: any) => elm.id === tradeInput.sender
  )?.products 


  return (
    <form>
      <UserSelectList
        placeholder="Satıcı seçiniz"
        onChange={handleChange}
        name="sender"
        value={tradeInput.sender}
        userList={props.userListData}
        >
      </UserSelectList>
      <ProductSelectList
        placeholder="Ürün seçiniz"
        sellerProducts={sellerProducts}
        value={tradeInput.tradeProduct}
        onChange={handleChange}
        name="tradeProduct"
      >
      </ProductSelectList>
      <UserSelectList
        placeholder="Alıcı seçiniz"
        onChange={handleChange}
        name="buyer"
        value={tradeInput.buyer}
        userList={props.userListData}
      >
      </UserSelectList>
      <button 
        type='button'
        onClick={() => {
          props.onTrade(tradeInput)
          setTradeInput({ tradeProduct: '', sender: '', buyer: ''})
        }}
        >Gönder</button>
    </form>
  )
}

export default TradeForm