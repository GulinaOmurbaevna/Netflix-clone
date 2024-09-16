 
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc,collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 
const firebaseConfig = {
  apiKey: "AIzaSyDpUdH7Ls3Mz59ndVf9ejxCZfl7-KTVsvs",
  authDomain: "netflix-clone-29069.firebaseapp.com",
  projectId: "netflix-clone-29069",
  storageBucket: "netflix-clone-29069.appspot.com",
  messagingSenderId: "953205814049",
  appId: "1:953205814049:web:0039a1bc7cbcd4ecf00460"
};

  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) => {
   try {
    await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user 
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
    })
    }catch (error) {
       console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }
   
}

const login = async (email, password) => {
    try {
      await  signInWithEmailAndPassword(auth, email, password)
    }catch(error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout};