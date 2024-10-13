import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconGraduation } from "@/components/icons/IconGraduation";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconTipJar } from "@/components/icons/IconTipJar";
import { SearchBox } from "@/components/ui/searchBox";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetVacancy, useGetVacancyCategory } from "@/services/vacancy";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency } from "@/constants";
import { calculateDateDifference } from "@/constants/dateTime";
import { IconCaretLeft, IconSlidebarHorizontal } from "@/components/icons";
import ModalSwipe from "@/components/ui/modalSwipe";
import { useGetEducationLevel } from "@/services/user";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    category_id: string;
    search: string;
  }>();

  const [modalFilter, setModalFilter] = useState<boolean>(false);

  const [filter, setFilter] = useState({
    kategori: params.category_id || "",
    pekerjaan: "",
    lokasi: "",
    pendidikan: "",
  });
  const [filterDb, setFilterDb] = useState({
    kategori: params.category_id || "",
    pekerjaan: "",
    lokasi: "",
    pendidikan: "",
  });

  const [search, setSearch] = useState<string>(params.search || "");
  const searchValueDebounce = useDebounce(search, 1000);

  const kategori = useGetVacancyCategory();
  const pendidikan = useGetEducationLevel();
  const pekerjaan = ["Full Time", "Part Time", "Freelance", "Magang"];
  const lokasi = ["Rmote", "Hybrid", "Onsite"];

  const vacancy = useGetVacancy(
    `category_id=${filter.kategori}&workLocation=${filterDb.lokasi}&jobType=${filterDb.pekerjaan}&educationLevel_id=${filterDb.pendidikan}&search=${searchValueDebounce}`
  );

  const updateVacancyDate = (date: string) => {
    return calculateDateDifference(new Date(date || 0), new Date());
  };

  const handleFilter = () => {
    setModalFilter(false);
    setFilterDb(filter);
  };

  return (
    <View backgroundColor="white" style={{ flex: 1, paddingBottom: 20 }}>
      <View
        backgroundColor="primary-50"
        style={{
          width: "100%",
          flexDirection: "row",
          paddingTop: insets.top + 20,
          paddingLeft: 20,
          padding: 10,
          gap: 15,
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <View style={{ height: 24, width: 24 }}>
            <IconCaretLeft color={"white"} />
          </View>
        </TouchableWithoutFeedback>
        <SearchBox
          placeholder="Cari Lowongan"
          width={"87%"}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Typography>Semua Lowongan</Typography>
        <TouchableOpacity
          onPress={() => setModalFilter(true)}
          style={{ position: "relative" }}
        >
          <IconSlidebarHorizontal color="black-80" />
          {Object.values(filter).some(
            (value) => value !== "" && value !== null && value !== undefined
          ) && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 100,
                position: "absolute",
                top: 0,
                right: 0,
              }}
              backgroundColor="primary-30"
            />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 0 }}
        refreshControl={
          <RefreshControl
            refreshing={vacancy.isRefetching}
            onRefresh={() => vacancy.refetch()}
            progressViewOffset={20}
          />
        }
      >
        <View style={{ marginTop: 20, gap: 20 }}>
          {vacancy.data?.data.map((data, index) => (
            <Pressable
              key={index}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors["line-stroke-30"],
                borderWidth: 1,
                padding: 20,
                width: Dimensions.get("window").width - 40,
                borderRadius: 15,
                gap: 15,
              }}
              onPress={() => router.push(`/jobVacancy/${data.slug}`)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      data.Company.imageLogo.trim() !== ""
                        ? data.Company.imageLogo
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: Colors["black-10"],
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: 15,
                    width: "70%",
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
                    {data.EducationLevels
                      ? data?.EducationLevels.sort((a, b) => a.id - b.id)
                          .map((el) => {
                            return el.level;
                          })
                          .join("/")
                      : "-"}
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
                    {formatCurrency(Number.parseInt(data.salary || "0"))}
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
                    {data.location || "-"}
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
                  {data.jobType}
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
                  {data.workLocation}
                </Typography>
              </View>
              <Typography
                fontSize={14}
                fontFamily="Poppins-LightItalic"
                style={{}}
                color="black-80"
              >
                Note : Update{" "}
                {updateVacancyDate(data.updatedAt) === "0 hari"
                  ? "hari ini"
                  : updateVacancyDate(data.updatedAt) + " yang lalu"}
              </Typography>
            </Pressable>
          ))}

          {!vacancy.isFetching &&
            vacancy.data?.data &&
            vacancy.data.data.length === 0 && (
              <Typography
                fontFamily="OpenSans-LightItalic"
                style={{ textAlign: "center", marginVertical: "auto", flex: 1 }}
              >
                Opps Sepertinya Lowongan yang diacri tidak tersedia
              </Typography>
            )}
        </View>
      </ScrollView>
      <ModalSwipe setModalVisible={setModalFilter} modalVisible={modalFilter}>
        <View style={{ height: Dimensions.get("window").height - 100 }}>
          <ScrollView
            style={{}}
            contentContainerStyle={{
              gap: 10,
            }}
          >
            <Typography fontSize={22} style={{ textAlign: "center" }}>
              Filter
            </Typography>
            <Typography>Kategori</Typography>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                width: "100%",
                height: "auto",
              }}
            >
              {kategori.data?.data.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor:
                      filter.kategori == item.id.toString()
                        ? Colors.transparent
                        : Colors["line-stroke-30"],
                    backgroundColor:
                      filter.kategori == item.id.toString()
                        ? Colors["primary-50"]
                        : Colors["white"],
                    width: "auto",
                  }}
                  onPress={() =>
                    setFilter((prev) => {
                      return {
                        ...prev,
                        kategori:
                          prev.kategori === item.id.toString()
                            ? ""
                            : item.id.toString(),
                      };
                    })
                  }
                >
                  <Typography
                    color={
                      filter.kategori == item.id.toString()
                        ? "white"
                        : "black-80"
                    }
                  >
                    {item.name}
                  </Typography>
                </Pressable>
              ))}
            </View>
            <Typography>Pekerjaan</Typography>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                width: "100%",
                height: "auto",
              }}
            >
              {pekerjaan.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor:
                      filter.pekerjaan == item
                        ? Colors.transparent
                        : Colors["line-stroke-30"],
                    backgroundColor:
                      filter.pekerjaan == item
                        ? Colors["primary-50"]
                        : Colors["white"],
                    width: "auto",
                  }}
                  onPress={() =>
                    setFilter((prev) => {
                      return {
                        ...prev,
                        pekerjaan: prev.pekerjaan === item ? "" : item,
                      };
                    })
                  }
                >
                  <Typography
                    color={filter.pekerjaan == item ? "white" : "black-80"}
                  >
                    {item}
                  </Typography>
                </Pressable>
              ))}
            </View>
            <Typography>Lokasi</Typography>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                width: "100%",
                height: "auto",
              }}
            >
              {lokasi.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor:
                      filter.lokasi == item
                        ? Colors.transparent
                        : Colors["line-stroke-30"],
                    backgroundColor:
                      filter.lokasi == item
                        ? Colors["primary-50"]
                        : Colors["white"],
                    width: "auto",
                  }}
                  onPress={() =>
                    setFilter((prev) => {
                      return {
                        ...prev,
                        lokasi: prev.lokasi === item ? "" : item,
                      };
                    })
                  }
                >
                  <Typography
                    color={filter.lokasi == item ? "white" : "black-80"}
                  >
                    {item}
                  </Typography>
                </Pressable>
              ))}
            </View>
            <Typography>Pendidikan</Typography>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                width: "100%",
                height: "auto",
              }}
            >
              {pendidikan.data?.data.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor:
                      filter.pendidikan == item.id.toString()
                        ? Colors.transparent
                        : Colors["line-stroke-30"],
                    backgroundColor:
                      filter.pendidikan == item.id.toString()
                        ? Colors["primary-50"]
                        : Colors["white"],
                    width: "auto",
                  }}
                  onPress={() =>
                    setFilter((prev) => {
                      return {
                        ...prev,
                        pendidikan:
                          prev.pendidikan === item.id.toString()
                            ? ""
                            : item.id.toString(),
                      };
                    })
                  }
                >
                  <Typography
                    color={
                      filter.pendidikan == item.id.toString()
                        ? "white"
                        : "black-80"
                    }
                  >
                    {item.level}
                  </Typography>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <Button style={{ marginTop: 20 }} onPress={handleFilter}>
            Cari
          </Button>
        </View>
      </ModalSwipe>
    </View>
  );
}
