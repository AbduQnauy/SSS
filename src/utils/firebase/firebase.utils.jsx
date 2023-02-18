// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc, 
    collection,
    writeBatch,
     query,
     getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7VTuE98wm56yhjIj_yNiZKa00qAiz2ug",
  authDomain: "online-store-db-758df.firebaseapp.com",
  projectId: "online-store-db-758df",
  storageBucket: "online-store-db-758df.appspot.com",
  messagingSenderId: "375134585038",
  appId: "1:375134585038:web:b2cf66903e1f30e5d0509f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})


export const auth = getAuth()
export const signInWithGooglePopup = async () => await signInWithPopup(auth, provider)

export const db = getFirestore() 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach( object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })
    await batch.commit()
    console.log('Done');
}

export const getCategoriesAndDocuments = async () =>{
    const  collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const querySnapShot = await getDocs(q)
    const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) =>{
        const {title, items } = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})
    return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword =  async (email, password) =>{
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword =  async (email, password) =>{
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const  signOutUser =  async() => await signOut(auth) 

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)