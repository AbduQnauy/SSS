import { useState } from "react"
import { useDispatch } from "react-redux";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import FormInput from '../form-input/form-input.component'

import { SignInConatiner, ButtonsContainer} from './sign-in-form.styles.jsx'

const defaultFormFields = {
    email: '',
    password: ''
}


const SignInForm = (props) => {
  const dispatch = useDispatch()

  const signInWithGoogle = async () => dispatch(googleSignInStart())   
  


    const [formFields, setFormFields] = useState(defaultFormFields) 

    const { email,password } = formFields

    const resetFormFields = () =>{
        setFormFields(defaultFormFields)
    }

   const handleSubmit = async(event) =>{
    event.preventDefault()

    try{
      dispatch(emailSignInStart(email, password))
      resetFormFields()
    }
    catch(error){
      switch(error.code){
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email')
          break;

          default: console.log(error);
      }
    }

   }
  



  const changeHandler = ({target:{name, value}}) => setFormFields({...formFields, [name]: value})
  return (
    <SignInConatiner>
        <h2>Already have an account</h2>
      <span>Sign in With Your Email and Password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label='Email' type='email' required onChange={changeHandler} name='email' value={email}/>

        <FormInput label='Password' type='password' required onChange={changeHandler} name='password' value={password}/>
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES['google']} onClick={signInWithGoogle}>Google Sign in</Button>
        </ButtonsContainer>
      </form>
    </SignInConatiner>
  )
};

export default SignInForm;
