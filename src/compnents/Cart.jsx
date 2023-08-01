import CartItem from "./CartItem"

const Cart = ({items}) => {

  return (
    <div className="pl-10 pr-10 pb-10 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden h-auto" id="scroll">
        <p className="text-2xl font-black leading-10 text-gray-800 dark:text-white pt-3">Cart</p>
        <div className="p-5">
          {items?.map(item => <CartItem item={item}/>)}
        </div>
    </div>
  )
}

export default Cart