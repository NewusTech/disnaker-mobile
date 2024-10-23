import Appbar from "@/components/ui/appBar";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, Image, Pressable, RefreshControl } from "react-native";
import Animated from "react-native-reanimated";
import { useGetUserNotification } from "@/services/user";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { Button } from "@/components/ui/button";
import { calculateDateDifference } from "@/constants/dateTime";
import LottieView from "lottie-react-native";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const getNotification = useGetUserNotification();

  return (
    <View>
      <Appbar title="Notifikasi" backIconPress={() => router.back()} />
      <Animated.ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getNotification.isRefetching}
            onRefresh={() => getNotification.refetch()}
            progressViewOffset={20}
          />
        }
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        {getNotification.data?.data.map((data, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              {
                borderWidth: 1,
                borderColor: pressed
                  ? Colors["primary-50"]
                  : Colors["primary-50"],
                backgroundColor: pressed
                  ? Colors["primary-10"]
                  : Colors.transparent,
                borderRadius: 15,
                width: Dimensions.get("window").width - 30,
                overflow: "hidden",
                minHeight: 220,
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: 10,
                rowGap: 20,
                position: "relative",
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/notification/[id]",
                params: {
                  id: data.id,
                },
              })
            }
          >
            {({ pressed }) => (
              <>
                {data.isReading === "false" && (
                  <View
                    style={{
                      backgroundColor: Colors["error-60"],
                      width: 10,
                      height: 10,
                      borderRadius: 100,
                      position: "absolute",
                      right: 5,
                      top: 5,
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: Colors["line-stroke-30"],
                  }}
                >
                  <Image
                    source={require("@/assets/images/tick.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Typography fontFamily="Poppins-Regular" fontSize={16}>
                    Undangan Pekerjaan
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Light"
                    fontSize={13}
                    style={{ marginLeft: "auto" }}
                  >
                    {calculateDateDifference(
                      new Date(data.updatedAt),
                      new Date()
                    )}
                  </Typography>
                </View>
                <RenderHTML
                  systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
                  contentWidth={Dimensions.get("screen").width - 48}
                  source={{
                    html: data.desc || "<p>Halo Dunia.</p>",
                  }}
                />
                <Button
                  onPress={() =>
                    router.push({
                      pathname: "/notification/[id]",
                      params: {
                        id: data.id,
                      },
                    })
                  }
                >
                  Selengkapnya
                </Button>
              </>
            )}
          </Pressable>
        ))}
        {(!getNotification.isFetching &&
          getNotification.data?.data &&
          getNotification.data.data.length === 0) ||
          (getNotification.isError && (
            <>
              <LottieView
                source={require("@/assets/lottie/Animation-Empty.json")}
                style={{ width: "100%", height: 200 }}
                autoPlay
                loop={true}
              />
              <Typography
                fontFamily="OpenSans-LightItalic"
                style={{
                  textAlign: "center",
                  marginVertical: "auto",
                  flex: 1,
                }}
              >
                Opps Sepertinya Belum ada undangan yang tersedia
              </Typography>
            </>
          ))}
      </Animated.ScrollView>
    </View>
  );
}
