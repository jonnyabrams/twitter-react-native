import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

export type ProfilePictureProps = {
  image?: ImageSourcePropType;
  size?: number;
  style?: any
};

const ProfilePicture = ({ image, size = 50, style }: ProfilePictureProps) => {
  return (
      <Image
        source={image}
        style={{ width: size, height: size, borderRadius: size, ...style }}
      />
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({});
