import axiosInstance from '@/helpers/axios-instance';
import { AuthData } from '@/lib/types';
import userState from '@/utils/user-state';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAuthData = (): AuthData => {
  const location = useLocation();
  const user = userState.getUser();

  const [data, setData] = useState<AuthData>({
    _id: user?._id || '',
    role: user?.role || '',
    token: '',
    loading: true,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      _id: user?._id || '',
      role: user?.role || '',
      token: '',
    }));
  }, [user?._id, user?.role]);

  useEffect(() => {
    async function fetchToken() {
      if (!data._id) {
        setData((prevData) => ({ ...prevData, loading: false }));
        return;
      }
      try {
        const res = await axiosInstance.get(`/api/auth/check/${data._id}`);
        setData((prevData) => ({
          ...prevData,
          token: res.data?.data,
          loading: false,
        }));
      } catch (error) {
        console.error('Error fetching token:', error);
        setData((prevData) => ({
          ...prevData,
          token: '',
          loading: false,
        }));
      }
    }
    fetchToken();
  }, [data._id, location]);

  return data;
};

export default useAuthData;
