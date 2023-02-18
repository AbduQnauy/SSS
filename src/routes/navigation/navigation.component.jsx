import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom'
import { ReactComponent as StoreLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'


import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'

const Navigation = (props) => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
            <StoreLogo className='logo'/>
        </LogoContainer>
        <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
                currentUser ? <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>                           :                   
                <NavLink to='/auth'>
                    SIGN IN
                </NavLink>
            }
            <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;
