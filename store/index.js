import Vuex from 'vuex'
// import apiService from '../services/ApiService'
let store
const initStore = () => {
  return (
    store ||
    (store = new Vuex.Store({
      state: () => ({
        name: "",
        win_count: null,
        lost_count: 1,
        game: null,
        error: ''
      }),
      mutations: {
        setUserStats(state,  payload ) {
          console.log('State Mutation Payload: ', payload)
              payload.name !== undefined ? state.name = payload.name: state.name = state.name
              console.log(state.name)
              payload.win_count ? state.win_count = payload.win_count : state.win_count = payload.win_count
              payload.lost_count ? state.lost_count = payload.lost_count : state.lost_count = payload.lost_count
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
          console.log('Action Payload: ', payload)
          this.commit('setUserStats', payload)
        }
      },
      getters: {
        user: state =>  { 
          return {
            name: state.name,
            win_count: state.win_count, 
            lost_count: state.lost_count
          }
         }
      }
    }))
  )
}

export default initStore