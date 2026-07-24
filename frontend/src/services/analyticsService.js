import { db } from "../firebase/firebase";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";

const QUIZ_COLLECTION = "quizAttempts";

export const saveQuizAttempt = async (data) => {

    await addDoc(
        collection(db, QUIZ_COLLECTION),
        data
    );

};

export const getQuizAttempts = async (uid) => {

    const q = query(

        collection(db, QUIZ_COLLECTION),

        where("uid", "==", uid)

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

};

export const calculateStatistics = (quizzes) => {

    if (quizzes.length === 0) {

        return {

            quizCount: 0,

            averageScore: 0,

            averageAccuracy: 0

        };

    }

    let score = 0;

    let accuracy = 0;

    quizzes.forEach(q => {

        score += q.score;

        accuracy += q.accuracy;

    });

    return {

        quizCount: quizzes.length,

        averageScore: (
            score / quizzes.length
        ).toFixed(1),

        averageAccuracy: (
            accuracy / quizzes.length
        ).toFixed(1)

    };

};