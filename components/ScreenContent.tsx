import { View } from 'react-native';

import { LoginScreen } from './LoginScreen';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <LoginScreen />
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
};
