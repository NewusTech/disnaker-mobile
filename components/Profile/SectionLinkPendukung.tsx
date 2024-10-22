import React, { useState } from "react";
import View from "../view";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import {
  Dimensions,
  Image,
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
import Separator from "../ui/separator";
import TextLink from "../ui/textLink";
import { userLinkResponseSuccess } from "@/api";
import { dataLinkPendukung } from "@/constants";

export default function SectionLinkPendukung({
  linkPendukung,
}: {
  linkPendukung: userLinkResponseSuccess["data"];
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
          Link Pendukung
        </Typography>
        <TouchableOpacity
          onPress={() => router.push("/(autenticated)/profile/supportingLinks")}
        >
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
          {linkPendukung?.map((link, index) => (
            <View key={index}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 5,
                  }}
                >
                  <Image
                    source={
                      dataLinkPendukung.find((f) => f.title === link.linkType)
                        ?.image || require("@/assets/images/www.png")
                    }
                    style={{ height: 24, width: 24 }}
                  />
                  <Typography fontSize={15} style={{}}>
                    {link.linkType}
                  </Typography>
                </View>
                <TextLink
                  label={link.link}
                  fontSize={15}
                  style={{}}
                  onPress={() =>
                    router.push({
                      pathname: "/(public)/webView",
                      params: {
                        link: link.link,
                      },
                    })
                  }
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
                    router.push(
                      `/(autenticated)/profile/supportingLinks/${link.id}`
                    )
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
              {index + 1 !== linkPendukung.length && (
                <Separator style={{ marginTop: 5, marginBottom: 10 }} />
              )}
            </View>
          ))}
          {linkPendukung.length === 0 && (
            <Typography fontFamily="Poppins-Light" color="black-30">
              Link Pendukung Kosong
            </Typography>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
