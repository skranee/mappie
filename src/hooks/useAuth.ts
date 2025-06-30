import { useNavigate } from 'react-router-dom';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { auth, provider } from '@/firebase.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setAvatar, setEmail } from '@/store/slices/UserSlice.ts';

export const useAuth = () => {
  const email = useAppSelector(state => state.user.email);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = Boolean(email);

  const signInWithPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        const email = user.email;

        dispatch(setEmail(email));
        dispatch(setAvatar('./default_avatar.jpg'));

        navigate('/');
      })
      .catch(error => {
        throw error;
      });
  };

  const signUpWithPassword = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        const email = user.email;

        dispatch(setEmail(email));
        dispatch(setAvatar('./default_avatar.jpg'));

        navigate('/');
      })
      .catch(error => {
        throw error;
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const avatar = result.user.photoURL;
        const email = result.user.email;

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
    isAuthenticated,
  };
};
