import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom'
import { ReactComponent as StoreLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { signOutStart } from '../../store/user/user.action'
import { selectCurrentUser } from '../../store/user/user.selector'


import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'

const Navigation = (props) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    
    const signOutUser = () => dispatch(signOutStart())
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
                currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>
                    SIGN IN
                </NavLink>)
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
