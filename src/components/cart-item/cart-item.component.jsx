import {CartItemContainer, ItemDetails } from './cart-item.styles.jsx'
 import React from "react"
 
 const CartItem = ({cartItem: {name,imageUrl, price, quantity}}) => (<CartItemContainer>
        <img src={imageUrl} alt={name}/>
        <ItemDetails>
            <span className='name'>{name}</span>
            <span>{quantity} x ${price}</span>
        </ItemDetails>
        <h2>{name}</h2>
     </CartItemContainer>
   
 );
 
 export default CartItem;
 