import { FC, PropsWithChildren, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { motion, AnimatePresence } from "framer-motion";
import { toTitleCase } from "../../helpers/helper";

interface Props extends PropsWithChildren {
  value: string;
  options: ("all" | "pending" | "completed")[];
  onChange: (value: "all" | "pending" | "completed") => void;
}

const styles = stylex.create({
  root: {
    backgroundColor: "#345e37",
    position: "relative",
    padding: "4px 12px",
    borderRadius: 12,
    cursor: "pointer",
  },
  options: {
    position: "absolute",
    backgroundColor: "#345e37",
    borderRadius: 12,
    right: 0,
    top: "calc(100% + 8px)",
    overflow: "hidden",
  },
  option: {
    cursor: "pointer",
    padding: "4px 12px",
    backgroundColor: {
      ":hover": "rgba(255,255,255,0.7)",
    },
  },
});

const Select: FC<Props> = ({ value, options, onChange }) => {
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <div
      {...stylex.props(styles.root)}
      onClick={() => setIsSelecting(!isSelecting)}
    >
      {toTitleCase(value.toString())}

      <AnimatePresence>
        {isSelecting && (
          <motion.div
            initial={{ opacity: -1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: -1, y: 16 }}
            transition={{ duration: 0.2 }}
            {...stylex.props(styles.options)}
          >
            {options.map((option, idx) => (
              <div
                onClick={() => onChange(option)}
                key={idx}
                {...stylex.props(styles.option)}
              >
                {toTitleCase(option.toString())}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
