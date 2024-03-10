import { useLocation } from 'react-router';
import { useApi } from './useApi';

export const useParam = () => {
   const location = useLocation();
   const page = location.pathname.split('/')[1];
   const postId = location.pathname.split(`${page}/`)[1].replace(/[^0-9]/g, '');
   const { get } = useApi();

   return {
      postId,
      get,
   };
};
