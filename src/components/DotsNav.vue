<template>
    <div class="vp--dots-list">
        <ul class="vp--dots-section" v-for="(section, index) in sections" :key="index">
            <li
                :class="['vp--dot', 'vp--section', 'vp--section-active': hasClass(section, 'vp--active')]"
                :aria-label="section.vpSection"
                @click="scrollTo(section)"
            ></li>
            <li
                v-for="(panel, index) in section.panels"
                :key="index"
                :aria-label="panel.vpPanel"
                :class="['vp--dot', 'vp--panel', 'vp--panel-active']"
                @click="scrollTo(panel)"
            ></li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            sections: []
        }
    },
    methods: {
        scrollTo(elem) {
            window.scrollTo(elem.offsetTop);
        },
        hasClass(elem, class) {
            return elem.classList.contains(class);
        }
    },
    created() {
        this.$set(this, 'sections', document.querySelectorAll('[data-vp-section]'));
        this.sections.forEach(element => {
            element.panels = element.querySelectorAll('[data-vp-panel]');
        });
    }
})
</script>

<style lang="sass">

</style>
