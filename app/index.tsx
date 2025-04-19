import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '~/components/home/header';
import Note from '~/components/home/note';
import AddNoteModal from '~/components/modal';
import Separator from '~/components/separator';
import { COLORS } from '~/core/theme/colors';
import useNotesStore from '~/store/store';

export default function Home() {
  /**
   * [INFO] cursor animation enabled
   */

  const { notes } = useNotesStore();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openModal = () => {
    if (isModalVisible === true) {
      /**
       * Testing multiline comments
       *
       * ! [INFO] cleaner version
       * * [DEBUG] legible
       *
       */
    }
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <View className="flex-1 p-4">
        <FlatList
          data={notes}
          renderItem={({ item }) => <Note item={item} />}
          keyExtractor={(item: Note) => item.id}
          ItemSeparatorComponent={Separator}
        />
      </View>

      <AddNoteModal visible={isModalVisible} setVisible={setIsModalVisible} />

      <SquircleButton
        style={styles.addNoteButton}
        borderRadius={16}
        preserveSmoothing={true}
        cornerSmoothing={100}
        onPress={openModal}>
        <Ionicons name="add" size={32} color="pink" />
      </SquircleButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  addNoteButton: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    right: 24,
    bottom: 40,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
