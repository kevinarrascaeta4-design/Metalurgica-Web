import { createContext, useContext, useState, type ReactNode } from 'react';
import { authStorage, type StoredUser } from '@/utils/authStorage';

interface AuthContextValue {
  usuario: StoredUser | null;
  isAuthenticated: boolean;
  login: (token: string, usuario: StoredUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<StoredUser | null>(authStorage.getUser());

  const login = (token: string, nuevoUsuario: StoredUser) => {
    authStorage.save(token, nuevoUsuario);
    setUsuario(nuevoUsuario);
  };

  const logout = () => {
    authStorage.clear();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, isAuthenticated: !!usuario, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}