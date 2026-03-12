import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6U44WFu3-5I6ib3A95h0y6AzyBcUHEw8",
  authDomain: "localrate-32dd1.firebaseapp.com",
  projectId: "localrate-32dd1",
  storageBucket: "localrate-32dd1.firebasestorage.app",
  messagingSenderId: "47633459496",
  appId: "1:47633459496:web:1b4dd6174129d37cd9081d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);