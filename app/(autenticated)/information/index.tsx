import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { removeHtmlTags } from "@/helpers";
import useDebounce from "@/hooks/useDebounce";
import { useGetInformation } from "@/services/information";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Information() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [search, setSearch] = useState<string>("");
  const searchValueDebounce = useDebounce(search, 1000);

  const getInformation = useGetInformation(searchValueDebounce);
  return (
    <View style={{ flex: 1, paddingTop: insets.top }} backgroundColor="white">
      <View
        style={{
          width: "100%",
          height: "auto",
          borderBottomWidth: 1.5,
          borderColor: Colors["line-stroke-20"],
          paddingVertical: 10,
        }}
      >
        <Typography fontSize={18} style={{ textAlign: "center" }}>
          Innformasi
        </Typography>
      </View>
      <Animated.ScrollView>
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          <SearchBox
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <Animated.FlatList
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={getInformation.data?.data}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  borderWidth: 1,
                  borderColor: pressed
                    ? Colors["primary-50"]
                    : Colors["line-stroke-30"],
                  backgroundColor: pressed
                    ? Colors["primary-10"]
                    : Colors.transparent,
                  borderRadius: 15,
                  width: Dimensions.get("window").width - 30,
                  overflow: "hidden",
                  height: 220,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  rowGap: 10,
                  paddingVertical: 10,
                },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/(autenticated)/information/[slug]",
                  params: {
                    slug: item.id,
                  },
                })
              }
            >
              {({ pressed }) => (
                <>
                  <Typography
                    fontSize={18}
                    style={{
                      textAlign: "left",
                      width: "100%",
                      paddingHorizontal: 10,
                    }}
                    numberOfLines={1}
                    color={pressed ? "black-80" : "black-80"}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontFamily="Poppins-Light"
                    style={{
                      textAlign: "left",
                      width: "100%",
                      paddingHorizontal: 10,
                    }}
                    numberOfLines={4}
                    color={pressed ? "black-80" : "black-80"}
                  >
                    {removeHtmlTags(item.desc, 500)}
                  </Typography>
                  <Button
                    style={{ marginHorizontal: 10 }}
                    onPress={() =>
                      router.push({
                        pathname: "/(autenticated)/information/[slug]",
                        params: {
                          slug: item.slug,
                        },
                      })
                    }
                  >
                    Selengkapnya
                  </Button>
                </>
              )}
            </Pressable>
          )}
          style={{ width: "100%", paddingBottom: 20 }}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 20,
            gap: 20,
          }}
        />
      </Animated.ScrollView>
    </View>
  );
}
