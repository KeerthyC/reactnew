import firebase from '../firebase'; // Import your Firebase configuration

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // User is signed in
      // You can get the user info from result.user 
      localStorage.setItem('CName', result.user.displayName);
      localStorage.setItem('CEmail', result.user.email);
      localStorage.setItem('CPhoto', result.user.photoURL);     
      return result.user;
   
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);
      throw error;
    });
};
