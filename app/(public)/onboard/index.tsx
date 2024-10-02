import { Button } from "@/components/button";
import {
  IconCaretLeft,
  IconCaretRight,
  IconDotActive,
  IconDotInActive,
} from "@/components/icons";
import { Typography } from "@/components/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type dummyProps = {
  id: number;
  image: any;
  title: string;
  subTitle: string;
};
const dummy: dummyProps[] = [
  {
    id: 1,
    image: require("@/assets/images/dummy1.jpg"),
    title: "Temukan Lowongan Kerja dengan Mudah di Aplikasi Disnaker 1",
    subTitle:
      "Cukup gunakan filter lokasi dan keahlian untuk menemukan pekerjaan yang sesuai denganmu",
  },
  {
    id: 2,
    image: require("@/assets/images/dummy1.jpg"),
    title: "Temukan Lowongan Kerja dengan Mudah di Aplikasi Disnaker 2",
    subTitle:
      "Cukup gunakan filter lokasi dan keahlian untuk menemukan pekerjaan yang sesuai denganmu",
  },
  {
    id: 3,
    image: require("@/assets/images/dummy1.jpg"),
    title: "Temukan Lowongan Kerja dengan Mudah di Aplikasi Disnaker 3",
    subTitle:
      "Cukup gunakan filter lokasi dan keahlian untuk menemukan pekerjaan yang sesuai denganmu",
  },
];

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();
  const [activePage, setActivePage] = useState<number>(0);
  const ref = useRef<any>(null);
  const translateX = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(100);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value) }],
    // opacity:  opacity.value,
  }));

  const hanldeNext = () => {
    ref.current?.setPage(activePage + 1);
    if(activePage === dummy.length-1){
      router.push("/onboard/final")
    }
  };
  const handlePrev = () => {
    ref.current?.setPage(activePage - 1);
  };

  useEffect(() => {
    if (activePage === 0) {
      translateX.value = -100;
      // opacity.value = 0;
    } else {
      translateX.value = 0;
      // opacity.value = 100;
    }
  }, [activePage]);
  return (
    <SafeAreaView
      style={{
        paddingVertical: insets.bottom + 40,
        paddingHorizontal: insets.left + 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: 1 / 1,
          paddingHorizontal: 10,
        }}
      >
        <PagerView
          ref={ref}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
        >
          {useMemo(
            () => dummy.map((data) => <Image key={data.id} source={data.image} />),
            [dummy]
          )}
        </PagerView>
      </View>
      <View style={{ marginTop: 20, display: "flex", gap: 5 }}>
        <Typography
          fontFamily="Poppins-Medium"
          fontSize={19}
          style={{ textAlign: "center" }}
        >
          {dummy[activePage].title}
        </Typography>
        <Typography
          fontFamily="Poppins-Light"
          fontSize={15}
          style={{ textAlign: "center" }}
        >
          {dummy[activePage].subTitle}
        </Typography>
      </View>
      <View
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Animated.View style={[animatedStyles]}>
          <TouchableOpacity
            style={[
              styles.buttonChevron,
              { backgroundColor: Colors["primary-50"] },
            ]}
            onPress={handlePrev}
          >
            <IconCaretLeft color="white" />
          </TouchableOpacity>
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
          }}
        >
          {dummy.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[{ backgroundColor: Colors["transparent"] }]}
              onPress={()=>ref.current?.setPage(index)}
            >
              {activePage === index ? (
                <IconDotActive />
              ) : (
                <IconDotInActive color="primary-30" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View>
          <TouchableOpacity
            style={[
              styles.buttonChevron,
              { backgroundColor: Colors["primary-50"] },
            ]}
            onPress={hanldeNext}
          >
            <IconCaretRight color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    width: "100%",
    height: "100%",
  },
  buttonChevron: {
    borderRadius: 100,
    padding: 10,
  },
});
