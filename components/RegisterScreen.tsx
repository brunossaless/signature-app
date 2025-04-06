import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Container } from './Container';
import { LoginScreen } from './LoginScreen';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterScreen = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { signUp, isLoading: isAuthLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.email, data.password);
      setShowLogin(true);
    } catch (_) {
      // Error is handled by the auth context
    }
  };

  if (showLogin) {
    return <LoginScreen />;
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <View className="mb-8 items-center">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <Text className="text-4xl font-bold text-blue-500">S</Text>
          </View>
          <Text className="mb-4 text-center text-4xl font-bold text-gray-800">Signature App</Text>
          <Text className="text-center text-gray-600">Crie sua conta para começar</Text>
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
                  editable={!isAuthLoading}
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
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres',
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
                  editable={!isAuthLoading}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Confirmar Senha</Text>
            <Controller
              control={control}
              rules={{
                required: 'Confirmação de senha é obrigatória',
                validate: (value) => value === password || 'As senhas não coincidem',
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 focus:border-blue-500"
                  placeholder="Confirme sua senha"
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                  value={value}
                  editable={!isAuthLoading}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</Text>
            )}
          </View>

          <TouchableOpacity
            className="mt-8 rounded-xl bg-blue-500 p-4 shadow-lg"
            onPress={handleSubmit(onSubmit)}
            disabled={isAuthLoading}>
            {isAuthLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-4 w-full">
          <Text className="text-center text-sm text-gray-500">
            Já tem uma conta?{' '}
            <Text className="font-medium text-blue-500" onPress={() => setShowLogin(true)}>
              Faça login
            </Text>
          </Text>
        </View>
      </View>
    </Container>
  );
};
