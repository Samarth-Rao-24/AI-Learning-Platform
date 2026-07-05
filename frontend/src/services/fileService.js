import { db } from "../firebase/firebase";

import {

collection,

addDoc,

getDocs,

query,

where,

deleteDoc,

doc

} from "firebase/firestore";

const COLLECTION = "uploads";

export const saveFileMetadata = async(data)=>{

    return await addDoc(

        collection(db,COLLECTION),

        data

    );

};

export const getUserFiles = async(uid)=>{

    const q=query(

        collection(db,COLLECTION),

        where("uid","==",uid)

    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

};

export const deleteFileMetadata=async(id)=>{

    await deleteDoc(doc(db,COLLECTION,id));

};