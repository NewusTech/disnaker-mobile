import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";
import { Typography, TypographyProps } from "../typography";

export type TextLinkProps = {
  label: string;
  fontSize?: number;
  color?: TypographyProps["color"];
} & TouchableWithoutFeedbackProps;
export default function TextLink(props: TextLinkProps) {
  const { label, fontSize = 12, color = "primary-50", ...rest } = props;

  return (
    <TouchableWithoutFeedback {...rest}>
      <Typography
        fontFamily="Poppins-Regular"
        fontSize={fontSize}
        color={color}
      >
        {label}
      </Typography>
    </TouchableWithoutFeedback>
  );
}
