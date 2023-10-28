<script>
import { uid } from "uid";
import axios from "axios";
import TodoCreator from "../components/TodoCreator.vue";
import TodoItem from "../components/TodoItem.vue";

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
  data() {
    return {
      todoList: [],
    };
  },
  computed: {
    todoCompleted() {
      return this.todoList.every((todo) => todo.isCompleted);
    },
  },
  watch: {
    todoList: {
      handler() {
        this.setTodoListLocalStorage();
      },
      deep: true,
    },
  },
  created() {
    this.fetchTodoList();
  },
  methods: {
    async fetchTodoList() {
      try {
        const response = await axios.get('http://localhost:3000/api/Todo/');
        const todos = response.data.docs.map((todo) => ({
          id: todo.id,
          todo: todo.nama,
          isCompleted: todo.completed === 'yes',
          dueDate: new Date(todo.dueDate),
          category: todo.category[0].name,
        }));
        this.todoList = todos;
        this.setTodoListLocalStorage(); // Update local storage with data from CMS
        console.log('Fetched todoList from CMS:', this.todoList);
      } catch (error) {
        console.error('Error fetching todoList:', error);
      }
    },

    // Remove the previous fetchTodoList method
    setTodoListLocalStorage() {
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      console.log("Stored todoList in local storage:", this.todoList);
    },
    createTodo(todo) {
      this.todoList.push({
        id: uid(6),
        todo,
        isCompleted: false,
        isEditing: false,
      });
      this.setTodoListLocalStorage(); // Update local storage when creating a new todo
    },
    toggleTodoComplete(index) {
      this.todoList[index].isCompleted = !this.todoList[index].isCompleted;
      this.setTodoListLocalStorage(); // Update local storage when toggling completion
    },
    toggleEditTodo(index) {
      this.todoList[index].isEditing = !this.todoList[index].isEditing;
    },
    updateTodo(newVal, index) {
      this.todoList[index].todo = newVal;
      this.setTodoListLocalStorage(); // Update local storage when updating todo
    },
    deleteTodo(todoId) {
      this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
      this.setTodoListLocalStorage(); // Update local storage when deleting todo
    },
  },
};
</script>

<template>
  <main>
    <h1>Create To-do</h1>
    <TodoCreator @create-todo="createTodo" />
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem
        v-for="(todo, index) in todoList"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @toggle-complete="toggleTodoComplete"
        @edit-todo="toggleEditTodo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </ul>
    <p v-else class="todos-msg">
      <span>You have no todo's to complete. Add One!</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0" class="todo-complete">
      <span>You have done all your to-do's!</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
    font-size: 1.2rem;
  }
  .todo-complete {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
    font-size: 1.2rem;
  }
}
</style>
