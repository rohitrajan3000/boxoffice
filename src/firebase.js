import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmHMLSL2QoEHNmhWaizTo6gDO3-fGHrZw",
  authDomain: "boxoffice-dcdd8.firebaseapp.com",
  projectId: "boxoffice-dcdd8",
  storageBucket: "boxoffice-dcdd8.appspot.com",
  messagingSenderId: "355051391679",
  appId: "1:355051391679:web:99302f49c1819055c3d40a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)