import * as stylex from "@stylexjs/stylex";
import { PropsWithChildren } from "react";
import Button from "../../atom/button/Button";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const styles = stylex.create({
  root: {
    width: "100%",
    height: "100dvh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 10,
  },
  container: {
    backgroundColor: "white",
    borderRadius: "16px 16px 0 0",
    padding: 16,
    display: "grid",
    gap: 16,
    width: "100%",
    maxWidth: 768,
  },
  closeButton: {
    backgroundColor: "crimson",
  },
});

const Modal = ({ isOpen, children, handleClose }: PropsWithChildren<Props>) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: -1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: -1 }}
          transition={{ duration: 0.3 }}
          {...stylex.props(styles.root)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            {...stylex.props(styles.container)}
          >
            <div>{children}</div>

            <Button onClick={() => handleClose()} _style={styles.closeButton}>
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
