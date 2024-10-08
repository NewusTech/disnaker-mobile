import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconGraduation } from "@/components/icons/IconGraduation";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconTipJar } from "@/components/icons/IconTipJat";
import Appbar from "@/components/ui/appBar";
import { SearchBox } from "@/components/ui/searchBox";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetVacancy } from "@/services/vacancy";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const vacancy = useGetVacancy();

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Semua Lowongan"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
      >
        <SearchBox placeholder="Cari Lowongan" />
        <View style={{ marginTop: 20, gap: 20 }}>
          {vacancy.data?.data.map((data, index) => (
            <Pressable
              key={index}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors["line-stroke-30"],
                borderWidth: 1,
                padding: 20,
                width: 342,
                borderRadius: 15,
                gap: 15,
              }}
              onPress={() => router.push(`/jobVacancy/${data.slug}`)}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Image
                  source={{ uri: data.Company.imageLogo }}
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Typography fontSize={17} style={{}} color="black-80">
                    {data.title}
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Light"
                    style={{}}
                    color="black-50"
                  >
                    {data.Company.name}
                  </Typography>
                </View>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    padding: 3,
                    marginLeft: "auto",
                  }}
                >
                  <IconBookmarks width={27} height={27} color="black-80" />
                </TouchableOpacity>
              </View>
              <View style={{ gap: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    SMA/SMK/S1
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconTipJar width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Rp. 3.000.000 - Rp. 4.500.000
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconLocation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Tanggamus, Lampung
                  </Typography>
                </View>
              </View>
              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <Typography
                  fontSize={12}
                  style={{
                    padding: 7,
                    paddingHorizontal: 25,
                    backgroundColor: Colors["primary-50"],
                    borderRadius: 100,
                  }}
                  color="white"
                >
                  Full Time
                </Typography>
                <Typography
                  fontSize={12}
                  style={{
                    padding: 7,
                    paddingHorizontal: 25,
                    backgroundColor: Colors["secondary-40"],
                    borderRadius: 100,
                  }}
                  color="white"
                >
                  {data.jobType}
                </Typography>
              </View>
              <Typography
                fontSize={14}
                fontFamily="Poppins-LightItalic"
                style={{}}
                color="black-80"
              >
                Note: Update 2 Hari yang lalu
              </Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
