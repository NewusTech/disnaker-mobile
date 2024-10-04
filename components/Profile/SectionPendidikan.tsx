import React, { useState } from "react";
import View from "../view";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { LayoutChangeEvent, Pressable, TouchableOpacity } from "react-native";
import { Typography } from "../ui/typography";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconPencilLine } from "../icons/IconPencilLine";
import { IconPlus } from "../icons/IconPlus";
import { IconDot } from "../icons/IconDot";
import Separator from "../ui/separator";

export default function SectionPendidikan() {
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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={toggleAccordion}
      >
        <Typography
          fontSize={17}
          fontFamily="Poppins-Medium"
          style={{ textAlign: "left" }}
          color="white"
        >
          Pendidikan
        </Typography>
        <TouchableOpacity>
          <IconPlus color="white" />
        </TouchableOpacity>
      </Pressable>
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
        <View onLayout={onLayout} style={{ height: "auto", padding: 15 }}>
          {/* item 1 */}
          <View>
            <Typography fontSize={15} style={{}}>
              Universitas Teknokrat Indonesia
            </Typography>
            <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
              Fakultas Teknik Ilmu Komputer - Sarjana S1
            </Typography>
            <View style={{ flexDirection: "row" }}>
              <Typography
                fontFamily="Poppins-Light"
                color="black-40"
                fontSize={15}
                style={{}}
              >
                Jul 2018 - Apr 2023
              </Typography>
              <IconDot color="black-80" />
              <Typography
                fontFamily="Poppins-Light"
                color="black-40"
                fontSize={15}
                style={{}}
              >
                3 Thn 7 Bulan
              </Typography>
            </View>
            <Typography fontSize={16} style={{}}>
              IPK 3,98
            </Typography>
            <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
              Selama menjalani pendidikan di Universitas Teknokrat Indonesia
              saya memiliki beberapa pengalaman mulai dari
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
            >
              {({ pressed }) => (
                <>
                  <IconPencilLine color="white" />
                  <Typography color={"white"}>Edit Data</Typography>
                </>
              )}
            </Pressable>
          </View>
          <Separator style={{ marginTop: 5, marginBottom: 10 }} />
          {/* item 2 */}
          <View>
            <Typography fontSize={15} style={{}}>
              Universitas Teknokrat Indonesia
            </Typography>
            <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
              Fakultas Teknik Ilmu Komputer - Sarjana S1
            </Typography>
            <View style={{ flexDirection: "row" }}>
              <Typography
                fontFamily="Poppins-Light"
                color="black-40"
                fontSize={15}
                style={{}}
              >
                Jul 2018 - Apr 2023
              </Typography>
              <IconDot color="black-80" />
              <Typography
                fontFamily="Poppins-Light"
                color="black-40"
                fontSize={15}
                style={{}}
              >
                3 Thn 7 Bulan
              </Typography>
            </View>
            <Typography fontSize={16} style={{}}>
              IPK 3,98
            </Typography>
            <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
              Selama menjalani pendidikan di Universitas Teknokrat Indonesia
              saya memiliki beberapa pengalaman mulai dari
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