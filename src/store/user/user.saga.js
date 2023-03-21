import { takeLatest, put, all, call } from 'redux-saga/effects'

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutFailed, signOutSuccess } from './user.action'

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from '../../utils/firebase/firebase.utils'

function* signOut() {
    try{
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch(error){
        yield put(signOutFailed(error))
    }
}
 
function* signUp({payload: {email, password, displayName} }) {
    try{
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, { displayName }))
    } catch(error){
        yield put(signUpFailed(error))
        alert(`There is some Error:  ${error.code.split('/')[1]}`)
    }
}


function* signInAfterSignUp({payload: {user, additionalDetails}}){
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))        
    } catch(error){
        yield put(signInFailed(error))
    }
}  

function* signInWithGoogle(){
    try{
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user)
    } catch(error){
        yield put(signInFailed(error))
    }
}

function* signInWithEmail(action){
    try{
        const { email, password } = action.payload
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user)
    } 
    catch(error){ 
        yield put(signInFailed(error))
    }
}

function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser) 
        if(!userAuth) return
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch(error){
        yield put(signInFailed(error))
    }
}

 function* onGoogleSignInStart() {
    yield takeLatest('GOOGLE_SIGN_IN_START', signInWithGoogle)
}

 function* onCheckUserSession() {
    yield takeLatest('CHECK_USER_SESSION', isUserAuthenticated)
}

 function* onEmailSignInStart() {
    yield takeLatest('EMAIL_SIGN_IN_START', signInWithEmail)
}  

 function* onSignUpStart() {
    yield takeLatest('SIGN_UP_START', signUp)
}

 function* onSignUpSuccess() {
    yield takeLatest('SIGN_UP_SUCCESS', signInAfterSignUp)
}

function* onSignOutStart() {
    yield takeLatest('SIGN_OUT_START', signOut)
}

export function* userSagas(){
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}