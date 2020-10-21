import axios from 'axios'

const todosURL = 'https://jsonplaceholder.typicode.com/todos'

const state = {
  todos: []
}

const getters = {
  allTodos: (state) => state.todos 
} 

const actions = {
  async fetchTodos({ commit }){
    const response = await axios.get(todosURL)

    commit('setTodos', response.data)
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(todosURL, { title, completed: false })

    commit('newTodo', response.data)
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`${todosURL}/${id}`)

    commit('removeTodo', id)
  },

  async filterTodos({ commit }, e) {
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)

    const response = await axios.get(`${todosURL}?_limit=${limit}`)

    commit('setTodos', response.data)
  },
   
  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(`${todosURL}/${updatedTodo.id}`, updatedTodo)

    console.log(response.data)

    commit('updTodo', response.data)
  }
}

const mutations = {
  setTodos:  (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
    if(index !== -1){
      state.todos.splice(index, 1, updatedTodo)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}