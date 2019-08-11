<template>
  <div>
    <h1>Welcome</h1>
<h1>{{userData.name}}</h1>
    <div class="player-stats">
      <div id="losses">
Loss Count: {{userData.lost_count}}        </div>
        <div id="wins">
Win Count: {{userData.win_count}}
        </div>
        </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import apiService from '~/services/ApiService'
export default {
  props: ['userData'],
  data() {
    return {
      // lost_count: this.user.lost_count,
      // win_count: this.user.win_count,
      // name: this.user.name
    }
  },
  created() {
    let playerName = this.userData.name
    console.log("PlayerProfile Mounted", playerName)
    if(playerName !== undefined ) {
      console.log('fetching user stats')
      apiService.getUserByName(playerName)
      .then(result => {
        // result.username = result.name
        let {username: name, win_count, lost_count, game} = result
        let data = {name, win_count, lost_count, game}
        console.log('Fetch Result:', data)
        this.$store.dispatch('userStats', data)
      })
    }
  }
  // computed: {
  //   ...mapGetters(['user'])
  // }
}
</script>

<style>
.player-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>


