import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    // inicialización de storage
    this.storage = app.storage();

    // subida de imagen
    this.uploadFile = async function uploadFile(archivo) {
      return await this.storage.ref(`${archivo}`).put(archivo);
    };
  }
}

const firebase = new Firebase();
export default firebase;
