import {
  Dimensions,
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export type PromoItemProps = {
  imgUrl: ImageProps["source"];
  height?: any;
  width?: any;
  borderRadius?: any;
} & TouchableOpacityProps;
export default function PromoItem(props: PromoItemProps) {
  // const { imgUrl, height = 187, width = 326, ...rest } = props;
  const {
    imgUrl,
    height = 140,
    width = Dimensions.get("window").width,
    borderRadius = 0,
    ...rest
  } = props;

  return (
    <TouchableOpacity {...rest} style={{borderRadius,width:width/2}}>
      <Image
        source={imgUrl}
        style={[
          styles.container,
          { height, width, resizeMode: "stretch", borderRadius },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    // borderRadius: 10,
  },
});
