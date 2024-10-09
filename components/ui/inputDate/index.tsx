import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Calendar, CalendarProps } from "react-native-calendars";

import { AppColor, AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { TextInputV2, TextInputV2Props } from "../textInputV2";
import { Typography } from "../typography";
import React from "react";
import View from "@/components/view";
import { formatDateDMY } from "@/constants/dateTime";
import { IconCross } from "@/components/icons/IconCsross";
import DateTimePicker from "react-native-ui-datepicker";

export type DateInputProps = {
  value: Date | string;
  onChange: (date: Date | undefined) => void;
  label?: string;
  disabledDates?: string[];
  minDate?: Date | string;
  color?: AppColorUnion;
  errorMessage?: string;
} & Pick<
  TextInputV2Props,
  "placeholder" | "trailingIcon" | "leadingIcon" | "withBorder"
> &
  CalendarProps;
export type dateInnputDayProp = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export function DateInput(props: DateInputProps) {
  const {
    value,
    onChange = () => {},
    placeholder,
    trailingIcon,
    leadingIcon,
    withBorder = false,
    label,
    disabledDates,
    minDate,
    color = "line-stroke-30",
    errorMessage = "",
  } = props;

  const { Colors } = useAppTheme();
  const extracDate = (date: any) => new Date(date).toISOString().split("T")[0];

  const markedDates = disabledDates?.reduce((acc: any, date: any) => {
    acc[extracDate(date)] = {
      disabled: true,
      disableTouchEvent: true,
      selected: true,
      selectedColor: Colors["line-stroke-30"],
    };
    return acc;
  }, {});

  console.log(value.toString());

  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={{ gap: 5 }}>
      {label && (
        <Typography fontFamily="Poppins-Medium" fontSize={14}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.container,
          {
            borderWidth: withBorder ? 1 : 0,
            borderColor: Colors[color],
            padding: withBorder ? 12 : 0,
          },
        ]}
      >
        {placeholder && (
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={12}
            color={value ? "black-80" : "black-50"}
            style={styles.textPlaceholder}
          >
            {placeholder}
          </Typography>
        )}
        <TextInputV2
          trailingIcon={trailingIcon}
          leadingIcon={leadingIcon}
          value={formatDateDMY(new Date(value))}
          placeholder={placeholder}
          onTouchablePress={() => setShowDatePicker(!showDatePicker)}
          asTouchable
          withBorder={false}
        />
      </View>
      {!!errorMessage && (
        <Typography fontFamily="Poppins-Light" fontSize={10} color="error-50">
          {errorMessage}
        </Typography>
      )}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showDatePicker}
        onRequestClose={() => {
          setShowDatePicker(!showDatePicker);
        }}
      >
        <BlurView
          intensity={100}
          blurReductionFactor={100}
          experimentalBlurMethod="dimezisBlurView"
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <Pressable onPress={() => setShowDatePicker(false)}>
              <IconCross size={12} />
            </Pressable>
            <DateTimePicker
              mode="single"
              date={value}
              onChange={(params) => {
                setShowDatePicker(false);
                onChange(params.date as Date);
              }}
            />
            {disabledDates && (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <View
                  style={[
                    styles.rounded,
                    { backgroundColor: Colors["line-stroke-30"] },
                  ]}
                />
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  style={{ textAlignVertical: "center" }}
                >
                  Telah Terpesan
                </Typography>
              </View>
            )}
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 15,
  },
  textPlaceholder: {
    flex: 1,
    color: AppColor.light["black-50"],
  },
  dropdownItemStyle: {
    padding: 8,
    borderRadius: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rounded: {
    height: 20,
    width: 20,
    borderRadius: 100,
  },
});
