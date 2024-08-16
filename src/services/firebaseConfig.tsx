import { initializeApp, FirebaseApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU8C54W1DJ2uZvdPpYS91Jjx1t-PbtnpY",
  authDomain: "my-project-b4cc7.firebaseapp.com",
  projectId: "my-project-b4cc7",
  storageBucket: "my-project-b4cc7.appspot.com",
  messagingSenderId: "143686264023",
  appId: "1:143686264023:web:59b94f1f82a59ed8a43c92",
  measurementId: "G-JTMB3Q0LGN"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
// const analytics = getAnalytics(app);