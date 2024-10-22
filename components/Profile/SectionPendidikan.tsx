import React, { useCallback, useEffect, useState } from "react";
import View from "../view";
import { useFocusEffect, useRouter } from "expo-router";
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
import { educationHistoryResponseSuccess } from "@/api";
import { calculateDateDifference, formatDate } from "@/constants/dateTime";

export default function SectionPendidikan({
  education,
}: {
  education: educationHistoryResponseSuccess["data"];
}) {
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

  // useFocusEffect(
  //   useCallback(() => {
  //     if (isOpen && contentHeight.value != animatedHeight.value) {
  //       animatedHeight.value = withTiming(contentHeight.value, {
  //         duration: 300,
  //       });
  //       console.log("content != animate");
  //     }
  //     return () => {
  //       console.log("This route is now unfocused.");
  //     };
  //   }, [isOpen, contentHeight, contentHeight.value])
  // );

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
        <TouchableOpacity onPress={() => router.push("/profile/pendidikan")}>
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
          {education.map((data, index) => (
            <View key={index}>
              <View>
                <Typography fontSize={15} style={{}}>
                  {data.instanceName}
                </Typography>
                <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
                  {data.department}
                </Typography>
                <View style={{ flexDirection: "row" }}>
                  <Typography
                    fontFamily="Poppins-Light"
                    color="black-40"
                    fontSize={15}
                    style={{}}
                  >
                    {formatDate(new Date(data.joinDate), {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {formatDate(new Date(data.graduationDate), {
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                  <IconDot color="black-80" />
                  <Typography
                    fontFamily="Poppins-Light"
                    color="black-40"
                    fontSize={15}
                    style={{}}
                  >
                    {calculateDateDifference(
                      new Date(data.joinDate),
                      new Date(data.graduationDate),
                      {
                        showDays: false,
                      }
                    )}
                  </Typography>
                </View>
                <Typography fontSize={16} style={{}}>
                  IPK {data.gpa}
                </Typography>
                <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
                  {data.desc}
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
                  onPress={() => router.push(`/profile/pendidikan/${data.id}`)}
                >
                  {({ pressed }) => (
                    <>
                      <IconPencilLine color="white" />
                      <Typography color={"white"}>Edit Data</Typography>
                    </>
                  )}
                </Pressable>
              </View>
              {index + 1 !== education.length && (
                <Separator style={{ marginTop: 5, marginBottom: 10 }} />
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
