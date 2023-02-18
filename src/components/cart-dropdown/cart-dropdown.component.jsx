import { useContext,  } from "react";
import Button from "../button/button.component";
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from "../../contexts/cart.context";
import {CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx'
import { useNavigate } from "react-router-dom";


const CartDropDown = (props) => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const goToCheckoutHandler = () => navigate('/checkout')
  return (
    <CartDropDownContainer>
        {cartItems.length ? <CartItems>
         {cartItems.map((item, id) => <CartItem key={id} cartItem={item}/>)}
        </CartItems> : <EmptyMessage>Your cart is empty</EmptyMessage>}
        
        {cartItems.length ? <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button> : null}
    </CartDropDownContainer>
  )
};

export default CartDropDown;
