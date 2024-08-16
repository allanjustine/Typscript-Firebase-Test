import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import { User } from "../store/UseUserStore";

const usersCollectionRef = collection(db, "users");

// Validation function to check user data before creating or updating
const validateUser = (user: Omit<User, "id">): boolean => {
  if (
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.phone ||
    !user.position
  ) {
    console.error("Validation failed: All fields are required.");
    return false;
  }

  // Example email regex
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(user.email)) {
    console.error("Validation failed: Invalid email format.");
    return false;
  }

  return true;
};

export const createUser = async (
  user: Omit<User, "id">
): Promise<DocumentData> => {
  // Validate user data before sending it to Firestore
  if (!validateUser(user)) {
    throw new Error("Validation failed: User data is not valid.");
  }

  try {
    const docRef = await addDoc(usersCollectionRef, user);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to create user");
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await getDocs(usersCollectionRef);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as User;
      return { ...data, id: doc.id };
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw new Error("Failed to fetch users");
  }
};

export const updateUser = async (
  id: string,
  update: Partial<Omit<User, "id">>
): Promise<void> => {
  // Validate user data before updating it in Firestore
  if (!validateUser(update as Omit<User, "id">)) {
    throw new Error("Validation failed: User data is not valid.");
  }

  try {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, update);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw new Error("Failed to delete user");
  }
};
