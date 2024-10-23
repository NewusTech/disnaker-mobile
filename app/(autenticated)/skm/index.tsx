import { IconDotActive, IconDotInActive } from "@/components/icons";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useCreateUserSkm } from "@/services/user";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const [activePage, setActivePage] = useState<number>(0);

  const questions = [
    {
      code: "isEasyUse",
      question: "Apakah Aplikasi Mudah Digunakan?",
      isText: false,
    },
    {
      code: "serviceTransparency",
      question: "Apakah Aplikasi Pelayanannya Transparan?",
      isText: false,
    },
    {
      code: "appExperience",
      question: "Bagaimana Pengalaman Penggunaan Aplikasi?",
      isText: true,
    },
    { code: "feedback", question: "Kritik dan Saran?", isText: true },
  ];

  const createSkm = useCreateUserSkm();

  const [answers, setAnswers] = useState({
    isEasyUse: 0,
    serviceTransparency: 0,
    appExperience: "",
    feedback: "",
  });

  const handleNext = () => setActivePage((prev) => prev + 1);
  const handleAnswerChange = (code: string, value: number | string) =>
    setAnswers((prev) => ({ ...prev, [code]: value }));

  const isButtonDisabled =
    answers[questions[activePage].code] === 0 ||
    answers[questions[activePage].code] === "" ||
    createSkm.isPending;

  const ProgressBar = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
      }}
    >
      {Array.from({ length: questions.length }).map((_, index) => (
        <View
          key={index}
          style={{
            height: 8,
            width: `${100 / questions.length - 2}%`,
            backgroundColor:
              index <= activePage
                ? Colors["primary-50"]
                : Colors["line-stroke-20"],
            borderRadius: 100,
          }}
        />
      ))}
    </View>
  );
  const handleMutation = () => {
    createSkm.mutate(answers, {
      onSuccess: async (response) => {
        Toast.show({
          type: "success",
          text1: "Indeks Kepuasan Berhasil",
          text2: response.message,
        });
        router.dismiss();
      },
      onError: (reponse) => {
        console.error(reponse);
        Toast.show({
          type: "error",
          text1: "Indeks Kepuasan gagal!",
          text2: reponse.response?.data.message,
        });
      },
    });
  };

  const RatingOptions = ({ code }: { code: string }) => {
    const options = [
      "Tidak Puas",
      "Kurang Puas",
      "Puas",
      "Cukup Puas",
      "Sangat Puas",
    ];

    return (
      <View style={{ marginVertical: 10, gap: 20 }}>
        {options.map((option, index) => {
          const isActive = index + 1 === answers[code];
          return (
            <Pressable
              key={option}
              style={{
                padding: 10,
                borderRadius: 100,
                height: 50,
                width: "100%",
                borderWidth: 1,
                borderColor: isActive
                  ? Colors["primary-50"]
                  : Colors["line-stroke-30"],
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
              onPress={() => handleAnswerChange(code, index + 1)}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 100,
                  width: 24,
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: isActive
                    ? Colors["primary-50"]
                    : Colors["line-stroke-30"],
                }}
              >
                {isActive && <IconDotInActive />}
              </View>
              <Typography>{option}</Typography>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title="Indeks Kepuasan"
        variant="light"
        backIconPress={router.back}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <ProgressBar />
        <Typography style={{ marginVertical: 10 }}>
          Pertanyaan {activePage + 1}/{questions.length}
        </Typography>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Typography fontFamily="Poppins-Medium">{activePage + 1}.</Typography>
          <Typography fontFamily="Poppins-Medium" style={{ marginLeft: 5 }}>
            {questions[activePage].question}
          </Typography>
        </View>
        {questions[activePage].isText ? (
          <TextInput
            placeholder="Ketik disini"
            borderRadius={17}
            color="primary-50"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={answers[questions[activePage].code]}
            onChangeText={(text) =>
              handleAnswerChange(questions[activePage].code, text)
            }
          />
        ) : (
          <RatingOptions code={questions[activePage].code} />
        )}
        <Button
          disabled={isButtonDisabled}
          onPress={activePage < 3 ? handleNext : handleMutation}
          style={{ marginVertical: 20 }}
        >
          {activePage < 3 ? "Selanjutnya" : "Kirim Indeks Kepuasan"}
        </Button>
      </ScrollView>
    </View>
  );
}
