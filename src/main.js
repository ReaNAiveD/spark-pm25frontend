import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.component(VeLine.name, VeLine);

new Vue({
  render: h => h(App),
}).$mount('#app');
