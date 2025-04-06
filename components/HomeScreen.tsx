import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Container } from './Container';

export const HomeScreen = () => {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSignatureImage(result.assets[0].uri);
    }
  };

  return (
    <Container>
      <View className="flex-1 justify-center p-6">
        <View className="mb-8 items-center">
          <Text className="mb-4 text-center text-4xl font-bold text-gray-800">Signature App</Text>
          <Text className="text-center text-gray-600">
            Gerencie suas assinaturas de forma simples
          </Text>
        </View>

        <View className="gap-5 space-y-6">
          <TouchableOpacity className="rounded-xl bg-blue-500 p-4 shadow-lg" onPress={pickImage}>
            <Text className="text-center text-lg font-semibold text-white">
              Upload de Assinatura
            </Text>
          </TouchableOpacity>

          {signatureImage && (
            <View className="mt-4 items-center">
              <Image
                source={{ uri: signatureImage }}
                className="h-32 w-32 rounded-lg"
                resizeMode="contain"
              />
            </View>
          )}

          <TouchableOpacity className="rounded-xl bg-green-500 p-4 shadow-lg">
            <Text className="text-center text-lg font-semibold text-white">Assinar Documento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
