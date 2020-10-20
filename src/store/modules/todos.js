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
  }
}

const mutations = {
  setTodos:  (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo)
}

export default {
  state,
  getters,
  actions,
  mutations
}