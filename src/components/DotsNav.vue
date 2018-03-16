<template>
    <ul class="vp--dots-list">
        <li class="vp--dot" v-for="(panel, index) in panels" :key="index" :aria-label="panel.vpPanel"></li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            sections: new NodeList,
            panels: new NodeList
        }
    },
    created() {
        this.sections = this.getSections();
        this.panels = this.getPanels();
    }
})
</script>

<style lang="sass">

</style>
