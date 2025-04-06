import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { AuthProvider } from 'contexts/AuthContext';

import './global.css';

export default function App() {
  return (
    <AuthProvider>
      <ScreenContent title="Home" path="App.tsx" />
      <StatusBar style="auto" />
      <Toast />
    </AuthProvider>
  );
}
