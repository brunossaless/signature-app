import { api } from 'network/api';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { Container } from './Container';
import { HomeScreen } from './HomeScreen';

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/user/login', {
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <HomeScreen />;
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <View className="mb-8 items-center">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <Text className="text-4xl font-bold text-blue-500">S</Text>
          </View>
          <Text className="mb-4 text-center text-4xl font-bold text-gray-800">Signature App</Text>
          <Text className="text-center text-gray-600">
            Gerencie suas assinaturas de forma simples
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
            <Controller
              control={control}
              rules={{
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 focus:border-blue-500"
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                  value={value}
                  editable={!isLoading}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Senha</Text>
            <Controller
              control={control}
              rules={{
                required: 'Senha é obrigatória',
                minLength: {
                  value: 3,
                  message: 'A senha deve ter no mínimo 3 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 focus:border-blue-500"
                  placeholder="Digite sua senha"
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                  value={value}
                  editable={!isLoading}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>
            )}
          </View>

          <TouchableOpacity
            className="mt-8 rounded-xl bg-blue-500 p-4 shadow-lg"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-4 w-full">
          <Text className="text-center text-sm text-gray-500">
            Não tem uma conta? <Text className="font-medium text-blue-500">Cadastre-se</Text>
          </Text>
        </View>
      </View>
    </Container>
  );
};
