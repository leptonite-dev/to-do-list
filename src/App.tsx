import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import Button from "./components/atom/button/Button";
import { Plus } from "react-feather";
import AddTaskModal from "./components/compound/modal/AddTaskModal";
import TaskModal from "./components/compound/modal/TaskModal";
import { ToDo } from "./types";
import { useAppSelector } from "./redux/hooks";
import {
  filterCompleted,
  filterPending,
  getAllToDos,
  selectAllToDos,
  selectCompletedToDos,
  selectPendingToDos,
} from "./features/toDos/toDosSlice";
import { store } from "./redux/store";
import Select from "./components/atom/Select";

const styles = stylex.create({
  app: {
    maxWidth: "768px",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    padding: 16,
  },
  noMargin: {
    margin: 0,
  },
  addTaskButton: {
    borderRadius: 16,
    width: 44,
    height: 44,
    padding: "auto",
    position: "absolute",
    bottom: 24,
    right: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    padding: "0 16px",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  filterSelect: {
    border: "none",
    backgroundColor: "#345e37",
    color: "white",
    borderRadius: 8,
    padding: "8px 12px",
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    textIndent: 0,
    cursor: "pointer",
    outline: "none",
  },
  toDosContainer: {
    display: "grid",
    gap: 16,
    marginTop: 16,
  },
  toDo: {
    backgroundColor: "#61bc84",
    borderRadius: 8,
    padding: 12,
    cursor: "pointer",
    color: "rgba(0,0,0,0.7)",
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "1rem",
  },
  dueDate: {
    fontSize: "0.7rem",
  },
});

const filterToDo = {
  all: selectAllToDos,
  pending: selectPendingToDos,
  completed: selectCompletedToDos,
};

function App() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [selectedToDo, setSelectedToDo] = useState<null | number>(null);

  const toDos: ToDo[] = useAppSelector(filterToDo[filter]);

  useEffect(() => {
    if (toDos.length === 0) {
      store.dispatch(getAllToDos());
    }
  }, [toDos]);

  return (
    <div {...stylex.props(styles.app)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.noMargin)}>To Do List</h1>
      </header>
      <main {...stylex.props(styles.main)}>
        <div {...stylex.props(styles.filterContainer)}>
          <div>
            {new Date().toLocaleDateString(undefined, {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          <Select
            value={filter}
            onChange={(value) => {
              if (value === "pending") {
                store.dispatch(filterPending());
              } else if (value === "completed") {
                store.dispatch(filterCompleted());
              }
              setFilter(value);
            }}
            options={["all", "pending", "completed"]}
          />
        </div>

        <div {...stylex.props(styles.toDosContainer)}>
          {toDos.map((toDo: ToDo) => {
            return (
              <div
                key={toDo.createdAt}
                {...stylex.props(styles.toDo)}
                onClick={() => {
                  setSelectedToDo(toDo.createdAt);
                  setIsTaskOpen(true);
                }}
              >
                <h2 {...stylex.props(styles.title)}>{toDo.title}</h2>

                <div {...stylex.props(styles.dueDate)}>
                  Due:{" "}
                  {toDo.dueDate && toDo.dueDate !== ""
                    ? new Date(toDo.dueDate).toLocaleDateString(undefined, {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Any time"}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Button
        _style={styles.addTaskButton}
        onClick={() => setIsAddTaskModalOpen(true)}
      >
        <Plus />
      </Button>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        handleClose={() => setIsAddTaskModalOpen(false)}
      />

      <TaskModal
        data={toDos.find((toDo) => toDo.createdAt === selectedToDo)}
        isOpen={isTaskOpen}
        handleClose={() => setIsTaskOpen(false)}
      />
    </div>
  );
}

export default App;
