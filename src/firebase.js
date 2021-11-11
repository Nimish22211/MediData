import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//     appId: process.env.REACT_APP_APIID
// };
const firebaseConfig = {
    apiKey: "AIzaSyC1F3ns7_SgQJ0ZsqFJBZWetq6MbRziQrA",
    authDomain: "medidata-project.firebaseapp.com",
    projectId: "medidata-project",
    storageBucket: "medidata-project.appspot.com",
    messagingSenderId: "1073452875203",
    appId: "1:1073452875203:web:de0785fd446dc173be5176"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };