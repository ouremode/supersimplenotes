import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { DEFAULT_ICON_SIZE } from '~/core/constants';
import { COLORS } from '~/core/theme/colors';

const Header = () => {
  return (
    <View className="my-4 mb-4 flex flex-row items-center px-4">
      <View className="flex flex-row items-center">
        <Ionicons name="albums" size={DEFAULT_ICON_SIZE} color={COLORS.primary} />
        <Text className="ml-4 text-3xl font-medium text-primary">Notes</Text>
      </View>
      <View className="ml-auto">
        <Ionicons name="notifications" size={DEFAULT_ICON_SIZE} color={COLORS.primary} />
      </View>
    </View>
  );
};

export default Header;
