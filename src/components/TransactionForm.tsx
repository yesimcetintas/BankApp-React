import React, { useState } from 'react'
import UserSelectList from './UserSelectList'

type TransactionInputType = {
  transactionBakiye: string,
  sender: string,
  receiver: string,
}

const TransactionForm : any = (props: any) => {
  const [transactionInput, setTransactionInput] = useState<TransactionInputType>({
    transactionBakiye: '',
    sender: '',
    receiver: '',
  })

  const handleChange = (event: any) => {
    const key = event.currentTarget.name
    const value = event.currentTarget.value
    const newInput = { ...transactionInput, [key]: value }
    setTransactionInput(newInput)
  }

  return (
    <form>
      <UserSelectList
        placeholder="Gönderen seçiniz"
        name="sender"
        userList={props.userListData}
        value={transactionInput.sender}
        onChange={handleChange}
      >
      </UserSelectList>
      <input 
        onChange={handleChange}
        name="transactionBakiye"
        value={transactionInput.transactionBakiye}
        type="text"
        placeholder='Miktar' />
      <UserSelectList
        name="receiver" 
        placeholder="Alıcı seçiniz"
        value={transactionInput.receiver}
        userList={props.userListData}
        onChange={handleChange}
      >
      </UserSelectList>
      <button 
      type='button' 
      onClick={() => {
        props.onTransaction(transactionInput)
        setTransactionInput({ transactionBakiye: '', sender: '', receiver: ''})
      }}
      >Gönder</button>
    </form>
  
  )
}

export default TransactionForm