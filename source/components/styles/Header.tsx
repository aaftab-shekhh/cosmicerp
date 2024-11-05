import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {colors} from '../../constants/colors';
import {Font500} from '../fonts/Fonts';

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({title}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: 12 + top,
        },
      ]}>
      <View style={styles.userImageContainer}>
        <Image
          source={{
            uri: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
          }}
          style={styles.userImage}
          resizeMode="contain"
        />
      </View>
      <Font500 style={styles.title}>{title}</Font500>
      <Image
        source={images.search}
        resizeMode="contain"
        style={styles.searchIcon}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    backgroundColor: colors.color_22534F,
  },
  userImageContainer: {
    width: 43,
    height: 43,
    borderRadius: 22,
    overflow: 'hidden',
  },
  userImage: {
    width: 43,
    height: 43,
  },
  title: {
    fontSize: 20,
    color: colors.white,
  },
  searchIcon: {
    width: 28,
    height: 28,
  },
});