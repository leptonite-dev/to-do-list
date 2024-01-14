import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outlined" | "filled";
  _style?: StyleXStyles;
}

const styles = stylex.create({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 44,
    minHeight: 44,
    borderRadius: 16,
    cursor: "pointer",
  },
  filled: {
    backgroundColor: "#345e37",
    color: "white",
    border: "none",
  },
  outlined: {
    border: "1px solid teal",
  },
});

const Button = ({
  variant = "filled",
  children,
  _style,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <button {...stylex.props(styles.root, styles[variant], _style)} {...props}>
      {children}
    </button>
  );
};

export default Button;
