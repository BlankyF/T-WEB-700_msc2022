<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="status == 'test' || status == 'user'">
      <div class="chart" v-if="dataCrypt">
        <div v-if="status == 'user'">
          <ul class="selectPeriod">
            <li>
              <v-card class="selectPeriodCase">
                <button @click="selectPeriod('minute')">Minute</button>
              </v-card>
            </li>
            <li>
              <v-card class="selectPeriodCase">
                <button @click="selectPeriod('hourly')">Hourly</button>
              </v-card>
            </li>
            <li>
              <v-card class="selectPeriodCase">
                <button @click="selectPeriod('daily')">Daily</button>
              </v-card>
            </li>
          </ul>
        </div>
        <line-chart :chart-data="dataCrypt"></line-chart>
      </div>
      <h2>List of all cryptocurrencies</h2>
      <v-card class="CryptList">
        <ul class="CryptLine">
          <li class="CryptCol">#</li>
          <li class="CryptCol">Name</li>
          <li class="CryptCol">Current Price</li>
          <li class="CryptCol">Opening Price</li>
          <li class="CryptCol">Lower price of the day</li>
          <li class="CryptCol">Highest price of the day</li>
        </ul>
      </v-card>
      <v-card class="CryptList" v-for="(crypto, index) in CryptArr" v-if="crypto.visible === true" v-bind:index="index" v-bind:key="crypto.id">
        <ul class="CryptLine">
          <li class="CryptCol">
            <button @click="fillData(crypto.openingPrice, crypto.currentPrice)">{{ index+1 }}</button>
          </li>
          <li class="CryptCol">{{ crypto.cryptoName }}</li>
          <li class="CryptCol">{{ crypto.currentPrice }} $</li>
          <li class="CryptCol">{{ crypto.openingPrice }} $</li>
          <li class="CryptCol">{{ crypto.lowPrice }} $</li>
          <li class="CryptCol">{{ crypto.highPrice }} $</li>
        </ul>
      </v-card>
    </div>
    <div v-if="status == 'admin'">
      <h2>List of all cryptocurrencies</h2>
      <div class="CryptList">
        <ul class="CryptLine">
          <li class="CryptCol">
            <input type="checkbox">
          </li>
          <li class="CryptCol">Name</li>
          <li class="CryptCol">Current Price</li>
          <li class="CryptCol">Opening Price</li>
          <li class="CryptCol">Lower price of the day</li>
          <li class="CryptCol">Highest price of the day</li>
        </ul>
      </div>
      <div class="CryptList" v-for="(crypto, index) in CryptArr" v-if="crypto.visible !== false" v-bind:index="index" v-bind:key="crypto.id">
        <ul class="CryptLine">
          <li class="CryptCol">
            <input type="checkbox">
          </li>
          <li class="CryptCol">{{ crypto.cryptoName }}</li>
          <li class="CryptCol">{{ crypto.currentPrice }} $</li>
          <li class="CryptCol">{{ crypto.openingPrice }} $</li>
          <li class="CryptCol">{{ crypto.lowPrice }} $</li>
          <li class="CryptCol">{{ crypto.highPrice }} $</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import axios from 'axios'

/* TODO remove urlArr optArr, get status and CryptArr via api request */
let urlArr = window.location.toString().split('?')
let optArr
let status
let dataCrypt
let period = 'minute'
let token = localStorage.getItem('JWT')
let CryptArr
axios.get('http://localhost:3000/cryptos')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => { console.error(error) })
console.log('cryptArr: ', CryptArr, 'token', token)
console.log('url', urlArr)
if (urlArr[1]) {
  optArr = urlArr[1].split('&')
  console.log('opt', optArr[0].split('=')[1])
  status = optArr[0].split('=')[1]
}

export default {
  name: 'Homepage',
  components: {
    LineChart
  },
  data () {
    return {
      msg: 'Home',
      status: status,
      dataCrypt: dataCrypt,
      period: period,
      CryptArr: [{cryptoName: 'Bitcoin', currentPrice: 18923, openingPrice: 18934, lowPrice: 17276, highPrice: 18107, visible: true}, {cryptoName: 'test', currentPrice: 15923, openingPrice: 12034, lowPrice: 17276, highPrice: 18107, visible: true}, {cryptoName: 'unseen', currentPrice: 17923, openingPrice: 18034, lowPrice: 17276, highPrice: 18107, visible: false}, {cryptoName: 'test2', currentPrice: 19923, openingPrice: 18034, lowPrice: 17276, highPrice: 18107, visible: true}]
    }
  },
  methods: {
    selectPeriod (newPeriod) {
      this.period = newPeriod
      console.log('period:', newPeriod)
    },
    fillData (openingPrice, currentPrice) {
      this.dataCrypt = {
        labels: ['Opening', 'Current'],
        datasets: [
          {
            label: 'Opening to Current Price',
            backgroundColor: 'lightblue',
            data: [openingPrice, currentPrice]
          }
        ]
      }
    }
    /*
    TODO: CryptData = {start: *start date of period*, end: *end date of period*, period: *selected period*, dataArray: [*data of price fluctuation*] }
    fillData (CryptData) {
      this.dataCrypt = {
        labels: [CryptData.start, CryptData.end],
        datasets: [
          {
            label: `${{ CryptData.period }} Price`,
            backgroundColor: '#f87979',
            data: CryptData.dataArray
          }
        ]
      }
    } */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.CryptList {
  margin: 0.5%;
  margin-left: 10%;
  width: 80%;
}

.CryptLine {
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: lightgrey;
}

.CryptCol {
  width: 14%;
  margin: 0 10px;
}

.chart {
  max-width: 50%;
  margin:  150px auto;
}

.selectPeriod {
  margin-left: 70%;
  width: 30%;
}

.selectPeriodCase {
  text-align: left;
  background-color: #F9C81D;
}

h1, h2 {
  font-weight: normal;
  text-align: left;
  margin-left: 10%;
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
</style>
