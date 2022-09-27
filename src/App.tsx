import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import AddUserForm from './components/AddUserForm'
import UserList from './components/UserList'
import TransactionForm from './components/TransactionForm'
import TradeForm from './components/TradeForm'
import UserProducts from './components/UserProducts'
import UserExtre from './components/UserExtre'
import AddProductFrom from './components/AddProductForm'
import ProductList from './components/ProductList'

type Mode = 'products' | 'extre'
type UserProduct = {
  id: string
  productName: string
  price: number
}
type User = {
  id: string
  adSoyad: string
  bakiye: number
  products: Array<UserProduct>
  extre: Array<string>
}
type Product = UserProduct & { quantity: number }

function App() {
  const [userList, setUserList] = useState<Array<User>>([
    { id: '1', adSoyad: 'Hakan Özoğlu', bakiye: 1000, products: [], extre: [] },
    {
      id: '2',
      adSoyad: 'Pelin Hangişi',
      bakiye: 2000,
      products: [],
      extre: [],
    },
    { id: '3', adSoyad: 'Burcu Yılmaz', bakiye: 500, products: [], extre: [] },
    {
      id: '4',
      adSoyad: 'İlayda Yurttakalan',
      bakiye: 1500,
      products: [],
      extre: [],
    },
  ])

  const [productList, setProductList] = useState<Array<Product>>([
    { id: '1', productName: 'Laptop', quantity: 4, price: 100 },
  ])

  let [currentUser, setCurrentUser] = useState<string>()
  const [currentMode, setCurrentMode] = useState<Mode>()

  const handleChangeCurrentUser = (userId: string, mode: Mode) => {
    setCurrentUser(userId)
    setCurrentMode(mode)
  }

  const handleAddUser = (user: any) => {
    const values = {
      adSoyad: user.adSoyad,
      bakiye: Number(user.bakiye),
      id: String(Math.round(Math.random() * 5000)),
      products: [],
      extre: [],
    }
    setUserList([...userList, values])
  }

  const handleAddProduct = (prod: any) => {
    const values = {
      productName: prod.productName,
      quantity: Number(prod.quantity),
      id: String(Math.round(Math.random() * 5000)),
      price: Number(prod.price),
    }
    setProductList([...productList, values])
  }

  const handleSellProduct = (prod: any) => {

    const prodCurrent: any = productList.find((elm)=>elm.id === String(prod))

    const buyerObj: any = userList.find((user)=>user.id === currentUser)
    if(buyerObj.bakiye>=prodCurrent.price && prodCurrent.quantity>0){
      buyerObj.bakiye = buyerObj.bakiye - prodCurrent.price
      prodCurrent.quantity = prodCurrent.quantity -1
      buyerObj.products.push({ ...prodCurrent, quantity: undefined })
      buyerObj.extre.push(`Mağazadan ${prodCurrent.productName} ürünü ${prodCurrent.price} fiyatına satın alındı.`)
    }else{
      alert("Yeterli bakiyen olmadığı için veya ürünün stoğu bittiği için ürünü satın alamazsın.")
      return
    }
    
    setProductList([...productList])
    setUserList([...userList])
  }

  const handleTransaction = (transaction: any) => {
    
    const sender: any = userList.find((user)=>  user.id ===transaction.sender)
    const receiver: any = userList.find((user)=> user.id===transaction.receiver)
    
    if (sender.bakiye < Number(transaction.transactionBakiye)) {
      alert('adamda o kadar para yok')
      return
    }
    sender.bakiye = sender.bakiye - Number(transaction.transactionBakiye)

    setUserList([...userList])

    receiver.bakiye = receiver.bakiye + Number(transaction.transactionBakiye)
    sender.extre.push(
      `${receiver.adSoyad} kişisine ${transaction.transactionBakiye} tutarında para gönderildi`
    )
    receiver.extre.push(
      `${sender.adSoyad} kişisinden ${transaction.transactionBakiye} tutarında para geldi`
    )

  }

  const handleTrade = (trade: any) => {
    const seller: any = userList.find((user)=>user.id===trade.sender)
    const buyer: any = userList.find((user)=>user.id===trade.buyer)
    const tradeProduct: any = productList.find((product)=>product.id=== trade.tradeProduct)

    seller.bakiye = seller.bakiye + tradeProduct.price
    buyer.bakiye = buyer.bakiye - tradeProduct.price

    buyer.products.push({ ...tradeProduct, quantity: undefined })
    const idx = seller.products.indexOf(tradeProduct)
    seller.products.splice(idx, 1)

    seller.extre.push(
      `${buyer.adSoyad} kişisine ${tradeProduct.productName} ürünü ${tradeProduct.price} fiyatına satıldı`
    )
    buyer.extre.push(
      `${seller.adSoyad} kişisinden ${tradeProduct.productName} ürünü ${tradeProduct.price} fiyatına satın alındı`
    )

    setUserList([...userList])

  }

  const userProducts = userList.find((user)=>user.id === currentUser)?.products
  const userExtre = userList.find((user)=>user.id === currentUser)?.extre

  const handleUnselectCurrentUser = () => {
    currentUser=""
    setCurrentUser(currentUser)
  }

  return (
    <div className="container">
      <div className="left">
        <div className="addUserForm">
          <AddUserForm onAddUser={handleAddUser} />
        </div>
        <div className="userList">
          <UserList
            currentUser={currentUser}
            userListData={userList}
            onChangeCurrentUser={handleChangeCurrentUser}
          />
        </div>
      </div>
      <div className="center">
        <div className="transactionForm">
          <TransactionForm
            userListData={userList}
            onTransaction={handleTransaction}
          />
        </div>
        <div className="tradeForm">
          <TradeForm
            userListData={userList}
            onTrade={handleTrade}
          />
        </div>
        {currentUser ? (
          currentMode === 'products' ? (
            <div>
              <UserProducts onClose={handleUnselectCurrentUser} userId={currentUser} userProduct={userProducts}/>
            </div>
          ) : currentMode === 'extre' ? (
            <div>
              <UserExtre onClose={handleUnselectCurrentUser} userId={currentUser} userExtre={userExtre} />
            </div>
          ) : null
        ) : null}
      </div>
      <div className="right">
        <div className="addProductForm">
          <AddProductFrom onAddProduct={handleAddProduct} />
        </div>
        <div className="productList">
          <ProductList
            isSellVisible={Boolean(currentUser)}
            onSellProduct={handleSellProduct}
            productListData={productList}
          />
        </div>
      </div>
    </div>
  )
}

export default App
