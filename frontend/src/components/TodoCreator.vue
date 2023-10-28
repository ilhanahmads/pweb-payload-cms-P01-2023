<template>
  <div class="todo-creator">
    <button @click="openModal" class="create-button">Create To-Do</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="closeAndResetModal" class="close-button">X</span>
        </div>
        <h2>Create To-Do</h2>
        <div class="input-wrap">
          <input type="text" v-model="todoState.todo" placeholder="Nama To-Do" />
          <select v-model="todoState.category" placeholder="Kategori">
            <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
          </select>
          <input type="date" v-model="todoState.deadline" placeholder="Deadline" />
        </div>
        <p v-show="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p>
        <button @click="createTodo">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from 'axios';

export default {
  data() {
    return {
      todoState: reactive({
        todo: "",
        category: "", // Hapus nilai default karena kategori akan diisi dari daftar kategori Payload CMS
        deadline: "",
        invalid: null,
        errMsg: "",
      }),
      showModal: false,
      categories: [], // Simpan daftar kategori di sini
    };
  },
  created() {
    // Ambil daftar kategori dari Payload CMS
    axios.get('http://localhost:3000/api/Category/') // Sesuaikan dengan URL endpoint yang sesuai
      .then(response => {
        this.categories = response.data.docs;
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
    axios.get('http://localhost:3000/api/Todo/')
    .then(response => {
      this.todos = response.data;
    })
    .catch(error => {
      console.error("Error fetching todos:", error);
    });
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeAndResetModal() {
      this.showModal = false;
      this.todoState.todo = "";
      this.todoState.category = "Not Urgent";
      this.todoState.deadline = "";
    },
    createTodo() {
      this.todoState.invalid = false;
      if (this.todoState.todo !== "") {
        const newTodo = {
          name: this.todoState.todo,
          category: this.todoState.category,
          deadline: this.todoState.deadline,
        };
        this.$emit("create-todo", newTodo);
        this.closeAndResetModal();
      } else {
        this.todoState.invalid = true;
        this.todoState.errMsg = "Todo value cannot be empty!";
      }
    },
  },
};
</script>

<style scoped>
.create-button {
  width: 100%;
  padding: 12px 0;
  font-size: 1.2rem;
  background-color: #41b080;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #218c5f;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #41b080;
  color: white;
  padding: 10px;
}

.close-button {
  font-size: 20px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 50%;
  padding: 5px 10px;
  background-color: red;
}

.close-button:hover {
  background-color: darkred;
}

.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    font-size: 20px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    font-size: 1.2rem;
    border: none;
    &:hover {
      color: #41b080;
    }
  }
}
.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
