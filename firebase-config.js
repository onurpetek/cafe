import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase konsolunda Proje ayarları > Web uygulaması bölümünden aldığın bilgileri buraya yapıştır
const firebaseConfig = {
  apiKey: "AIzaSyD9Ocp4dla9yBYU9TRInJrRtGH2kEbSA1w",
  authDomain: "hermes-cafe.firebaseapp.com",
  projectId: "hermes-cafe",
  appId: "1:5088035642:web:d4a160abfc4400a5a44603",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
