import { useAuth } from 'contexts/AuthContext';
import { View } from 'react-native';

import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <View className={styles.container}>{isAuthenticated ? <HomeScreen /> : <LoginScreen />}</View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
};
