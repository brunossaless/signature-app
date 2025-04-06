import { api } from 'network/api';
import { createContext, useContext, useState, ReactNode } from 'react';
import Toast from 'react-native-toast-message';

type User = {
  email: string;
};

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });
      setUser({ email });
      Toast.show({
        type: 'success',
        text1: 'Login realizado com sucesso!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        position: 'bottom',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email: string, password: string) {
    setIsLoading(true);
    try {
      await api.post('/user/register', {
        email,
        password,
      });
      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao realizar cadastro',
        position: 'bottom',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
