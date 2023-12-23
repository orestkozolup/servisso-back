const { collection, getDocs, getDoc, doc, setDoc, addDoc, deleteDoc } = require('firebase/firestore/lite');
const db = require("../firebase_init");

async function getCar(id) {
    const snap = await getDoc(doc(db, 'cars', id))
    return snap.exists() ? snap.data() : {}
  }
  
  async function createCar(data) {
    const docRef = await addDoc(collection(db, "cars"), data);
    return {...(await getDoc(docRef)).data(), id: docRef.id};
  }
  
  async function updateCar(id, data) {
    const docRef = doc(db, "cars", id);
    await setDoc(docRef, data);
    return {...(await getDoc(docRef)).data(), id: docRef.id};
  }
  
  async function deleteCar(id){
    await deleteDoc(doc(db, "cars", id));
  }
  
  async function getCars() {
    const carsCol = collection(db, 'cars');
    const carSnapshot = await getDocs(carsCol);
    const carList = carSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return carList;
  }

module.exports = {
    getCar, createCar, deleteCar, updateCar
}