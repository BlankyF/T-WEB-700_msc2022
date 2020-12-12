<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="status == 'test' || status == 'user'">
      <div class="chart" v-if="dataCrypt">
        <line-chart :chart-data="dataCrypt"></line-chart>
      </div>
      <h2>List of all cryptocurrencies</h2>
      <div class="CryptList">
        <ul class="CryptLine">
          <li class="CryptCol">#</li>
          <li class="CryptCol">Name</li>
          <li class="CryptCol">Current Price</li>
          <li class="CryptCol">Opening Price</li>
          <li class="CryptCol">Lower price of the day</li>
          <li class="CryptCol">Highest price of the day</li>
        </ul>
      </div>
      <div class="CryptList" v-for="(crypto, index) in CryptArr" v-if="crypto.visible === true" v-bind:index="index" v-bind:key="crypto.id">
        <ul class="CryptLine">
          <li class="CryptCol"><button @click="fillData(crypto.openingPrice, crypto.currentPrice)">{{ index+1 }}</button></li>
          <li class="CryptCol">{{ crypto.name }}</li>
          <li class="CryptCol">{{ crypto.currentPrice }} $</li>
          <li class="CryptCol">{{ crypto.openingPrice }} $</li>
          <li class="CryptCol">{{ crypto.lowerPrice }} $</li>
          <li class="CryptCol">{{ crypto.highestPrice }} $</li>
        </ul>
      </div>
    </div>
    <div v-if="status == 'admin'">
      <h2>List of all cryptocurrencies</h2>
      <div class="CryptList">
        <ul class="CryptLine">
          <li class="CryptCol">checkbox</li>
          <li class="CryptCol">Name</li>
          <li class="CryptCol">Current Price</li>
          <li class="CryptCol">Opening Price</li>
          <li class="CryptCol">Lower price of the day</li>
          <li class="CryptCol">Highest price of the day</li>
        </ul>
      </div>
      <div class="CryptList" v-for="(crypto, index) in CryptArr" v-if="crypto.visible === true" v-bind:index="index" v-bind:key="crypto.id">
        <ul class="CryptLine">
          <li class="CryptCol">checkbox</li>
          <li class="CryptCol">{{ crypto.name }}</li>
          <li class="CryptCol">{{ crypto.currentPrice }} $</li>
          <li class="CryptCol">{{ crypto.openingPrice }} $</li>
          <li class="CryptCol">{{ crypto.lowerPrice }} $</li>
          <li class="CryptCol">{{ crypto.highestPrice }} $</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

/* TODO remove urlArr optArr, get status and CryptArr via api request */
let urlArr = window.location.toString().split('?')
let optArr
let status
let dataCrypt
console.log('url', urlArr)
if (urlArr[1]) {
  optArr = urlArr[1].split('&')
  console.log('opt', optArr[0].split('=')[1])
  status = optArr[0].split('=')[1]
}
export default {
  name: 'Home',
  components: {
    LineChart
  },
  data () {
    return {
      msg: 'Home',
      status: status,
      dataCrypt: dataCrypt,
      CryptArr: [{name: 'Bitcoin', currentPrice: 18923, openingPrice: 18934, lowerPrice: 17276, highestPrice: 18107, visible: true}, {name: 'test', currentPrice: 15923, openingPrice: 12034, lowerPrice: 17276, highestPrice: 18107, visible: true}, {name: 'unseen', currentPrice: 17923, openingPrice: 18034, lowerPrice: 17276, highestPrice: 18107, visible: false}, {name: 'test2', currentPrice: 19923, openingPrice: 18034, lowerPrice: 17276, highestPrice: 18107, visible: true}]
    }
  },
  methods: {
    fillData (openingPrice, currentPrice) {
      this.dataCrypt = {
        labels: ['Opening', 'Current'],
        datasets: [
          {
            label: 'Opening to Current Price',
            backgroundColor: '#f87979',
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
  width: 80%;
  border: black 1px solid;
}

.CryptLine {
  padding-top: 5px;
  padding-bottom: 5px;
}

.CryptCol {
  width: 14%;
}

.chart {
  max-width: 50%;
  margin:  150px auto;
}

h1, h2 {
  font-weight: normal;
  text-align: left;
  margin-left: 15px;
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
