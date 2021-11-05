import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: []
  },
  mutations: {
    setCharacters (state, payload) {
      state.characters = payload
    },
    setCharactersFilter (state, payload) {
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({ commit }) {
      try{  
        const response = await fetch('https://rickandmortyapi.com/api/character/')
        const data = await response.json()
        //console.log(data);
        commit('setCharacters', data.results)
        commit('setCharactersFilter', data.results)
      }catch(eror){
        console.log(eror)
      }
      
    },
    filterByStatus({ commit, state }, status) {
      const result = state.characters.filter((character) => {
        return character.status.includes(status)
      })
      commit('setCharactersFilter', result)
    },
    filterByName({ commit, state }, name) {
      //const formatName = name.toLowerCase()
      const result = state.characters.filter((character) => {
        return character.name.toLowerCase().includes(name.toLowerCase())
      })
      commit('setCharactersFilter', result)
    }
  },
  modules: {
  }
})
