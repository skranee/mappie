import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { setAvatar, setEmail } from '@/store/slices/UserSlice.ts';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase.ts';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  };
};
