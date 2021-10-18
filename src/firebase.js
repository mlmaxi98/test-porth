import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ref, computed } from 'vue'

firebase.initializeApp({
  apiKey: "AIzaSyAovUnLKIhGIGxkHg4JFQj6SGeS7bsFPmI",
  authDomain: "porth-messages.firebaseapp.com",
  projectId: "porth-messages",
  storageBucket: "porth-messages.appspot.com",
  messagingSenderId: "703517586372",
  appId: "1:703517586372:web:50b13474a2f82f96d26a91"
})

console.log('firebase activo')

const auth = firebase.auth()

export function useAuth() {
  const user = ref(null)
  auth.onAuthStateChanged(usuario => (user.value = usuario))
  const isLogin = computed(() => user.value !== null)

  const logIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
  }
  const logOut = () => auth.signOut()

  return { user, isLogin, logIn, logOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(30)

export function useChat() {
  const messages = ref([])
  const messagesReady = ref(false)
  messagesQuery.onSnapshot(snapshot => {
    console.log('cargando mensaje')
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
    messagesReady.value = true
  })

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log('enviando mensaje')
  }
  return { messages, messagesReady, sendMessage }
}