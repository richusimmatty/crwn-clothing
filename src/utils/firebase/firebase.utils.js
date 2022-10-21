import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyDqZ5Xn4yq2as5gm7VOKrx7ZyGzz-9FhzA",
  
    authDomain: "crwn-clothing-db-a63fe.firebaseapp.com",
  
    projectId: "crwn-clothing-db-a63fe",
  
    storageBucket: "crwn-clothing-db-a63fe.appspot.com",
  
    messagingSenderId: "168440421066",
  
    appId: "1:168440421066:web:e7db90ba6be04d4fe83233"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };