import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import './global.css';

export default function App() {
  return (
    <>
      <ScreenContent title="Home" path="App.tsx" />
      <StatusBar style="auto" />
      <Toast />
    </>
  );
}
