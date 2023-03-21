import { useSelector } from 'react-redux'
import Button from "../button/button.component";
import CartItem from '../cart-item/cart-item.component'
import {CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx'
import { useNavigate } from "react-router-dom";
import { selectCartItems } from '../../store/cart/cart.selector'


const CartDropDown = (props) => {
  const  cartItems = useSelector(selectCartItems)
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
