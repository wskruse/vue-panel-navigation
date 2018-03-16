<template>
    <div class="vp--dots-list">
        <ul class="vp--dots-section" v-for="(section, index) in sections" :key="index">
            <li class="vp--dot vp--section" @click="scrollTo(section)" :aria-label="section.vpSection"></li>
            <li class="vp--dot vp--section"
                v-for="(panel, index) in section.panels" :key="index" :aria-label="panel.vpPanel"></li>
        </ul>
    </div>
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
    methods: {
        scrollTo(elem) {
            window.scrollTo(elem.offsetTop);
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
