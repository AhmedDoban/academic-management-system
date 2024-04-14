import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all student Todos
export const GetTodos = createAsyncThunk("Todos/GetTodos", async () => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
  try {
    const Data = await axios.post(
      `${process.env.REACT_APP_API}/Todos`,
      { Student_ID: _id, Token: Token },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return Data.data;
  } catch (err) {
    Toast_Handelar("error", "Sorry we can't get your Todos !");
  }
});

// (Add new or delete or update ) student Todo
export const CUD_StudentTodo = createAsyncThunk(
  "Todos/CUD_StudentTodo",
  async (payload, { getState }) => {
    const State = getState();
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Todos/Update`,
        {
          Student_ID: _id,
          Token: Token,
          Todos: State.Todos.AllTodos,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't update your Todos !");
    }
  }
);

const TodosSlice = createSlice({
  name: "TodosSlice",
  initialState: {
    Todos: [],
    AllTodos: [],
    Selected: [],
    loading: false,
    CheckAll: false,
    FilterType: "ALL",
  },
  reducers: {
    AddNewTodo: (State, action) => {
      const Todos = [...State.AllTodos];
      const EditTodo = [
        {
          Title: action.payload.Title,
          Status: false,
        },
        ...Todos,
      ];
      State.AllTodos = EditTodo;
    },
    DeleteTodo: (State, action) => {
      const Todos = [...State.AllTodos];
      const FilterTodo = Todos.filter(
        (Todo) => Todo._id !== action.payload._id
      );
      State.AllTodos = FilterTodo;
      State.FilterType === "ALL"
        ? (State.Todos = FilterTodo)
        : State.FilterType === true
        ? (State.Todos = FilterTodo.filter((todo) => todo.Status === true))
        : (State.Todos = FilterTodo.filter((todo) => todo.Status === false));
    },
    HandleDeleteMany: (State, action) => {
      const Todos = [...State.AllTodos];
      const FilterTodo = Todos.filter(
        (Todo) => !State.Selected.includes(Todo._id)
      );
      State.AllTodos = FilterTodo;
      State.FilterType === "ALL"
        ? (State.Todos = FilterTodo)
        : State.FilterType === true
        ? (State.Todos = FilterTodo.filter((todo) => todo.Status === true))
        : (State.Todos = FilterTodo.filter((todo) => todo.Status === false));
      State.Selected = [];
    },

    UpdateTodo: (State, action) => {
      const Todos = [...State.AllTodos];
      const FindTodo = Todos.filter(
        (todo) => todo._id === action.payload._id
      )[0];
      const index = Todos.indexOf(FindTodo);
      Todos[index] = {
        Title: action.payload.Title,
        Status: action.payload.Status,
        _id: action.payload._id,
      };
      State.AllTodos = Todos;
      State.FilterType === "ALL"
        ? (State.Todos = Todos)
        : State.FilterType === true
        ? (State.Todos = Todos.filter((todo) => todo.Status === true))
        : (State.Todos = Todos.filter((todo) => todo.Status === false));
    },
    SelectAll: (State, action) => {
      if (!State.CheckAll) {
        State.Selected = [];
        State.Todos.map((todo) => State.Selected.push(todo._id));
        State.CheckAll = true;
      } else {
        State.Selected = [];
        State.CheckAll = false;
      }
    },
    SelectOne: (State, action) => {
      const NewSelected = [...State.Selected];
      if (NewSelected.includes(action.payload)) {
        const index = NewSelected.indexOf(action.payload);
        NewSelected.splice(index, 1);
        State.Selected = NewSelected;
      } else {
        NewSelected.push(action.payload);
        State.Selected = NewSelected;
      }
      if (NewSelected.length === State.Todos.length) {
        State.CheckAll = true;
      } else {
        State.CheckAll = false;
      }
    },
    HandleDrag: (State, action) => {
      if (State.FilterType === "ALL") {
        State.AllTodos = action.payload;
        State.Todos = action.payload;
      }
    },
    HandleSelectAll: (State, action) => {
      State.Selected = [];
      State.CheckAll = false;
    },
    HandleFilterTodos: (State, action) => {
      State.FilterType = action.payload;
      State.FilterType === "ALL"
        ? (State.Todos = State.AllTodos)
        : State.FilterType === true
        ? (State.Todos = State.AllTodos.filter((todo) => todo.Status === true))
        : (State.Todos = State.AllTodos.filter(
            (todo) => todo.Status === false
          ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTodos.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetTodos.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetTodos.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Todos =
            action.payload.Data.Todos === undefined
              ? []
              : action.payload.Data.Todos;
          State.AllTodos =
            action.payload.Data.Todos === undefined
              ? []
              : action.payload.Data.Todos;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
    builder.addCase(CUD_StudentTodo.fulfilled, (State, action) => {
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Todos =
            action.payload.Data.Todos === undefined
              ? []
              : State.FilterType === "ALL"
              ? (State.Todos = action.payload.Data.Todos)
              : State.FilterType === true
              ? (State.Todos = action.payload.Data.Todos.filter(
                  (todo) => todo.Status === true
                ))
              : (State.Todos = action.payload.Data.Todos.filter(
                  (todo) => todo.Status === false
                ));
          State.AllTodos =
            action.payload.Data.Todos === undefined
              ? []
              : action.payload.Data.Todos;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
  },
});

export const {
  AddNewTodo,
  DeleteTodo,
  UpdateTodo,
  SelectAll,
  HandleDrag,
  HandleSelectAll,
  HandleFilterTodos,
  HandleDeleteMany,
  SelectOne,
} = TodosSlice.actions;

export default TodosSlice.reducer;
