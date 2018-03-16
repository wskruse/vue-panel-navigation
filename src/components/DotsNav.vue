<template>
    <ul class="vp--dots-list">
        <li class="vp--dot" v-for="(panel, index) in vp.panels" :key="index" :aria-label="panel.vpPanel"></li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            sections: [],
            panels: []
        }
    },
    created() {
        this.sections = document.querySelectorAll('[data-vp-section]');
        this.sections.forEach(element => {
            element.panels = element.querySelectorAll('[data-vp-panel]');
        });
    }
})
</script>

<style lang="sass">

</style>
