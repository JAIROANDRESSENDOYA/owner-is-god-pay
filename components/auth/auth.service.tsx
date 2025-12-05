"use client"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, firestore } from "@/firebase/client"

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    console.error("LOGIN ERROR:", error)
    return { user: null, error: error.message }
  }
}

export async function registerUser(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await updateProfile(user, { displayName })

    await setDoc(doc(firestore, "users", user.uid), {
      email,
      displayName,
      createdAt: new Date().toISOString(),
    })

    return { user, error: null }
  } catch (error: any) {
    console.error("REGISTER ERROR:", error)
    return { user: null, error: error.message }
  }
}

export async function getUserProfile(uid: string) {
  try {
    const ref = doc(firestore, "users", uid)
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    return snap.data()
  } catch (error) {
    console.error("PROFILE ERROR:", error)
    return null
  }
}
