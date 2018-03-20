import Vue from 'vue';
import VpNav from '../src/index.js'

Vue.use(VpNav);

new Vue({
    el: '#app',
    data() {
        return {
            numPanels: 10
        }
    }
});
