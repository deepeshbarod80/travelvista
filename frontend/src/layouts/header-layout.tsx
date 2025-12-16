import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import LogOutIcon from '@/assets/svg/logout-icon.svg';
import LogInIcon from '@/assets/svg/login-icon.svg';
import AppIcon from '@/assets/svg/app-icon.svg';
import { useNavigate } from 'react-router-dom';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '@/helpers/axios-instance';
import Loader from '@/components/skeletons/loader';
import useAuthData from '@/hooks/useAuthData';
import userState from '@/utils/user-state';
import { Link } from 'react-router-dom';
import { Role } from '@/types/role-type.tsx';

function Header() {
  const navigate = useNavigate();
  const { token, loading } = useAuthData();
  const user = userState.getUser();

  const handleLogout = async () => {
    try {
      const response = axiosInstance.post('/api/auth/signout');
      toast.promise(response, {
        pending: 'Wait ...',
        success: {
          render({ data }) {
            userState.removeUser();
            navigate('/');
            return data?.data?.message;
          },
        },
        error: {
          render({ data }) {
            if (data instanceof AxiosError) {
              if (data?.response?.data?.message) {
                return data?.response?.data?.message;
              }
            }
            return 'Signout failed';
          },
        },
      });

      return (await response).data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message || 'An error occurred');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            >
              <img src={AppIcon} className="h-8 w-8" alt="Travelvista" />
              Travelvista
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {loading ? (
              <Loader />
            ) : token ? (
              <div className="flex items-center gap-2">
                {user?.role === Role.Admin && (
                  <button
                    className="hidden items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 md:inline-flex"
                    onClick={() => navigate('/admin/blogs')}
                  >
                    Dashboard
                  </button>
                )}

                <button
                  className="hidden items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 md:inline-flex"
                  onClick={() => navigate('/add-blog')}
                >
                  Create Post
                </button>

                <button
                  className="hidden items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-red-600 dark:text-gray-200 dark:hover:text-red-400 md:inline-flex"
                  onClick={handleLogout}
                >
                  Logout
                </button>

                <button
                  className="p-2 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 md:hidden"
                  onClick={() => navigate('/add-blog')}
                >
                  <img className="h-6 w-6" src={AddIcon} alt="Add" />
                </button>

                <button
                  className="p-2 text-gray-700 transition-colors hover:text-red-600 dark:text-gray-200 dark:hover:text-red-400 md:hidden"
                  onClick={handleLogout}
                >
                  <img className="h-6 w-6" src={LogOutIcon} alt="Logout" />
                </button>
              </div>
            ) : (
              <button
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                onClick={() => navigate('/signin')}
              >
                <span className="hidden md:inline">Login</span>
                <img className="h-6 w-6 md:hidden" src={LogInIcon} alt="Login" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
