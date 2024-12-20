import React, { useState } from "react";
import View from "../view";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  TouchableOpacity,
} from "react-native";
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
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { organizationHistoryIdResponseSuccess } from "@/api";
import { calculateDateDifference, formatDate } from "@/constants/dateTime";

export default function SectionOrganisasi({
  organization,
}: {
  organization: organizationHistoryIdResponseSuccess["data"];
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

  // Menyesuaikan styling elemen HTML seperti <li> dan <p>
  const tagsStyles = {
    ol: {
      paddingLeft: 20, // Menyesuaikan padding dari <ol>
    },
    li: {
      flexDirection: "row", // Membuat elemen <li> horizontal (satu baris)
      alignItems: "center", // Memastikan semua item ter-align di tengah
    },
    p: {
      margin: 0, // Menghapus margin dari <p> agar tidak turun ke baris baru
      padding: 0, // Menghapus padding dari <p>
    },
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
          Organisasi
        </Typography>
        <TouchableOpacity onPress={() => router.push("/profile/organization")}>
          <IconPlus color="white" />
        </TouchableOpacity>
      </Pressable>
      <Animated.View
        style={[
          {
            borderWidth: 1,
            borderColor: Colors["line-stroke-30"],
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            overflow: "scroll",
          },
          animatedStyle,
        ]}
      >
        {/* Measure the actual content height */}
        <View onLayout={onLayout} style={{ height: "auto", padding: 15 }}>
          {organization.map((item, index) => (
            <View key={index}>
              <View>
                <Typography fontSize={15} style={{}}>
                  {item.organizationName}
                </Typography>
                <Typography fontFamily="Poppins-Light" fontSize={15} style={{}}>
                  {item.name}
                </Typography>
                <View style={{ flexDirection: "row" }}>
                  <Typography
                    fontFamily="Poppins-Light"
                    color="black-40"
                    fontSize={15}
                    style={{}}
                  >
                    {formatDate(new Date(item.joinDate), {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {formatDate(
                      new Date(
                        item.isCurrently === "true"
                          ? new Date()
                          : item.leaveDate || new Date()
                      ),
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </Typography>
                  <IconDot color="black-80" />
                  <Typography
                    fontFamily="Poppins-Light"
                    color="black-40"
                    fontSize={15}
                    style={{}}
                  >
                    {item.isCurrently === "true"
                      ? "Saat ini"
                      : calculateDateDifference(
                          new Date(item.joinDate),
                          new Date(item.leaveDate || 0),
                          {
                            showDays: false,
                          }
                        )}
                  </Typography>
                </View>
                <RenderHTML
                  systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
                  contentWidth={Dimensions.get("window").width - 48}
                  source={{
                    html: item.desc,
                  }}
                  tagsStyles={tagsStyles as any} // Menerapkan styling khusus pada elemen HTML
                />
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
                  onPress={() =>
                    router.push(`/profile/organization/${item.id}`)
                  }
                >
                  {({ pressed }) => (
                    <>
                      <IconPencilLine color="white" />
                      <Typography color={"white"}>Edit Data</Typography>
                    </>
                  )}
                </Pressable>
              </View>
              {index + 1 !== organization.length && (
                <Separator style={{ marginTop: 5, marginBottom: 10 }} />
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
