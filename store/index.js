import Vuex from 'vuex'
import apiService from '../services/ApiService'
let store
const initStore = () => {
  return (
    store ||
    (store = new Vuex.Store({
      state: () => ({
        name: "",
        win_count: 0,
        lost_count: 0,
        game: null,
        error: ''
      }),
      mutations: {
        setUserStats(state,  payload ) {
          console.log('Payload: ', payload)
              payload.name === "undefined" ? state.name = payload.name : state.name = state.name
              payload.win_count ? state.win_count = payload.win_count : state.win_count = state.win_count
              payload.lost_count ? state.lost_count = payload.lost_count : state.lost_count = state.lost_count
              if (payload.game) {
                this.commit('setGame', payload.game)
              }
        },
        errorState(state, payload) {
          state.error = payload
        }
      },
      actions: {
        userStats(vuexContext,  payload ) {
          console.log('Payload: ', payload)
         this.commit('setUserStats', payload)
        }
      },
      getters: {
      }
    }))
  )
}

export default initStore