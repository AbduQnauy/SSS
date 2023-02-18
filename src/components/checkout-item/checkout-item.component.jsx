import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context';

import { BaseSpan, Arrow, Value, Quantity, ImageContainer, CheckoutItemContainer, RemoveButton} from './checkout-item.styles.jsx'

const CheckoutItem = ({cartItem}) => {
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem

    const clearIremHandler = () => clearItemFromCart(cartItem)
    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemFromCart(cartItem)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name}/>
      </ImageContainer>
        <BaseSpan>{name}</BaseSpan>
        <Quantity>
          <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
            <Value>{quantity}</Value>
          <Arrow onClick={addItemHandler}>&#10095;</Arrow>
        </Quantity>
        <BaseSpan>{price}</BaseSpan>
        <RemoveButton onClick={clearIremHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
  )
};

export default CheckoutItem;
