import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react";
import Modal from "./Modal";
import * as stylex from "@stylexjs/stylex";
import Button from "../../atom/button/Button";
import InputGroup from "../../atom/form/InputGroup";
import { addToDo } from "../../../features/toDos/toDosSlice";
import { store } from "../../../redux/store";
import { ToDo } from "../../../types";
// import type { ToDo } from "../../../types";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  defaultData?: ToDo;
}

const styles = stylex.create({
  root: {
    display: "grid",
    gap: 16,
  },
  label: {
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
  },
  input: {
    border: 0,
    backgroundColor: "transparent",
    outline: "none",
    padding: "8px 0px",
  },
});

const AddTaskModal: FC<Props> = ({ defaultData, isOpen, handleClose }) => {
  const [toDo, setToDo] = useState<ToDo>({
    title: "",
    detail: "",
    dueDate: "",
    createdAt: 0,
    status: "pending",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    store.dispatch(
      addToDo({
        ...toDo,
        createdAt: defaultData ? defaultData.createdAt : Date.now(),
      })
    );

    setToDo({
      title: "",
      detail: "",
      dueDate: "",
      createdAt: 0,
      status: "pending",
    });

    handleClose();
  };

  useEffect(() => {
    defaultData && setToDo(defaultData);
  }, [defaultData]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <form onSubmit={handleSubmit} {...stylex.props(styles.root)}>
        <InputGroup>
          <label htmlFor="title" {...stylex.props(styles.label)}>
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={toDo.title}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              setToDo({ ...toDo, title: evt.target.value })
            }
            {...stylex.props(styles.input)}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="detail" {...stylex.props(styles.label)}>
            Detail
          </label>
          <textarea
            name="detail"
            placeholder="Detail"
            rows={5}
            value={toDo.detail}
            onChange={(evt: ChangeEvent<HTMLTextAreaElement>) =>
              setToDo({ ...toDo, detail: evt.target.value })
            }
            {...stylex.props(styles.input)}
          ></textarea>
        </InputGroup>

        <InputGroup>
          <label htmlFor="due-date" {...stylex.props(styles.label)}>
            Due Date
          </label>
          <input
            type="date"
            name="due-date"
            id="due-date"
            value={toDo.dueDate}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              setToDo({ ...toDo, dueDate: evt.target.value })
            }
            {...stylex.props(styles.input)}
          />
        </InputGroup>

        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
