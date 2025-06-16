import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { setAvatar, setEmail } from '@/store/slices/UserSlice.ts';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider } from '@/firebase.ts';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInWithPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        const email = user.email;

        dispatch(setEmail(email));
        dispatch(setAvatar('./default_avatar.jpg'));

        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signUpWithPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        const email = user.email;

        dispatch(setEmail(email));
        dispatch(setAvatar('./default_avatar.jpg'));

        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const avatar = result.user.photoURL;
        const email = result.user.email;

        sessionStorage.setItem('email', email || '');
        sessionStorage.setItem('avatar', avatar || '');

        dispatch(setAvatar(avatar));
        dispatch(setEmail(email));

        navigate('/');
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return {
    signInWithGoogle,
    signInWithPassword,
    signUpWithPassword,
  };
};
