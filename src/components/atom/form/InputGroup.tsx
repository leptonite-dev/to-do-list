import * as stylex from "@stylexjs/stylex";
import { FC, PropsWithChildren } from "react";

const styles = stylex.create({
  root: {
    display: "grid",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 16,
    padding: 16,
  },
});

const InputGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div {...stylex.props(styles.root)}>{children}</div>;
};

export default InputGroup;
