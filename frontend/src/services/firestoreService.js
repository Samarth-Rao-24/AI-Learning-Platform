import { db } from "../firebase/firebase";

import {

doc,

setDoc,

getDoc

} from "firebase/firestore";

export const createUserProfile = async (user) => {

    await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,

        email: user.email,

        createdAt: new Date().toISOString()

    });

};

export const getUserProfile = async (uid) => {

    const document = await getDoc(doc(db, "users", uid));

    return document.data();

};