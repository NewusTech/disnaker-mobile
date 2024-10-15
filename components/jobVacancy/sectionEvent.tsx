import React, { useRef, useState } from "react";
import View from "../view";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import PagerView from "react-native-pager-view";
import PromoItem from "../promoItem";
import { Dimensions, Pressable } from "react-native";
import { useGetEvent } from "@/services/event";

export default function SectionEvent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const bannerRef = useRef<PagerView>(null);

  const getEvent = useGetEvent();

  const [activePage, setActivePage] = useState<number>(0);

  return (
    <View style={{ paddingTop: 20, gap: 10 }}>
      <View
        style={{
          width: "100%",
          height: "auto",
          paddingHorizontal: 10,
        }}
      >
        <PagerView
          ref={bannerRef}
          style={{
            width: "100%",
            height: 150,
            paddingVertical: 10,
            marginLeft: 10,
            marginTop: 10,
            // backgroundColor: "red"
          }}
          onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
          transitionStyle="scroll"
        >
          {getEvent.data?.data.map((data, index) => (
            <PromoItem
              key={index}
              imgUrl={{ uri: data.image || "" }}
              width={350}
              height={150}
              borderRadius={20}
              onPress={() =>
                router.push({
                  pathname: "/(autenticated)/event/[slug]",
                  params: {
                    slug: data.slug,
                  },
                })
              }
            />
          ))}
        </PagerView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {getEvent.data?.data.map((_, index) => {
          return (
            <Pressable
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 100,
                backgroundColor:
                  activePage === index
                    ? Colors["primary-50"]
                    : Colors["primary-30"],
              }}
              onPress={() => bannerRef.current?.setPage(index)}
            />
          );
        })}
      </View>
    </View>
  );
}
