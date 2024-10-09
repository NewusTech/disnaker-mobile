import React, { useState } from "react";
import { Pressable, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import View from "../view";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { Typography } from "../ui/typography";
import { IconPencilLine } from "../icons/IconPencilLine";

export default function SectionTentang({about}:{about:string}) {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentHeight = useSharedValue<number>(0);
  const animatedHeight = useSharedValue<number>(0);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
    animatedHeight.value = withTiming(isOpen ? 0 : contentHeight.value, {
      duration: 300,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    // opacity: animatedHeight.value === 0 ? 0 : 1,
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    contentHeight.value = height;
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: Colors["primary-50"],
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          paddingHorizontal: 20,
        }}
        onPress={toggleAccordion}
      >
        <Typography
          fontSize={17}
          fontFamily="Poppins-Medium"
          style={{ textAlign: "left" }}
          color="white"
        >
          Tentang Saya
        </Typography>
      </Pressable>

      {/* Animated Accordion Content */}
      <Animated.View
        style={[
          {
            borderWidth: 1,
            borderColor: Colors["line-stroke-30"],
            overflow: "scroll",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          },
          animatedStyle,
        ]}
      >
        {/* Measure the actual content height */}
        <View onLayout={onLayout} style={{ height: "auto" }}>
          <View style={{ padding: 10 }}>
            <Typography fontSize={15}>
             {about}
            </Typography>
            <Pressable
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: pressed
                    ? Colors["primary-60"]
                    : Colors["primary-50"],
                  padding: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                },
              ]}
              onPress={()=>router.push("/profile/editTentangSaya")}
            >
              {({ pressed }) => (
                <>
                  <IconPencilLine color="white" />
                  <Typography color={"white"}>Edit Data</Typography>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
