import { FC, useState } from "react";
import Modal from "./Modal";
import * as stylex from "@stylexjs/stylex";
import Button from "../../atom/button/Button";
import { Edit, Trash } from "react-feather";
import { ToDo } from "../../../types";
import { store } from "../../../redux/store";
import { deleteToDo, editToDo } from "../../../features/toDos/toDosSlice";
import EditTaskModal from "./AddTaskModal";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  data: ToDo | undefined;
}

const styles = stylex.create({
  taskContentContainer: {
    display: "grid",
    gap: 16,
    color: "rgba(0,0,0,0.7)",
  },
  taskContentGroup: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  taskContentHeading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  iconButton: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    aspectRatio: "1 / 1",
  },
  actionButtons: {
    display: "flex",
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  crimson: {
    backgroundColor: "crimson",
  },
});

const TaskModal: FC<Props> = ({
  data = { title: "", detail: "", createdAt: 0, status: "pending" },
  isOpen,
  handleClose,
}) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const handleEdit = () => {
    store.dispatch(
      editToDo({
        ...data,
        status: data.status === "pending" ? "completed" : "pending",
      })
    );
  };

  const handleDelete = () => {
    handleClose();
    store.dispatch(deleteToDo(data));
  };

  return (
    <>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div {...stylex.props(styles.taskContentContainer)}>
          <div {...stylex.props(styles.taskContentGroup)}>
            <div {...stylex.props(styles.taskContentHeading)}>Title</div>
            <div>{data.title}</div>
          </div>

          <div {...stylex.props(styles.taskContentGroup)}>
            <div {...stylex.props(styles.taskContentHeading)}>Detail</div>
            <div>{data.detail}</div>
          </div>

          <div {...stylex.props(styles.actionButtons)}>
            <Button _style={styles.flex1} onClick={handleEdit}>
              {data.status === "pending" ? "Mark Complete" : "Mark Pending"}
            </Button>
            <Button
              _style={styles.iconButton}
              onClick={() => setIsEditTaskModalOpen(true)}
            >
              <Edit />
            </Button>
            <Button _style={styles.iconButton} onClick={handleDelete}>
              <Trash />
            </Button>
          </div>
        </div>
      </Modal>
      
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        defaultData={data}
        handleClose={() => setIsEditTaskModalOpen(false)}
      />
    </>
  );
};

export default TaskModal;
