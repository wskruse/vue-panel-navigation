<template>
    <div class="vp--dots-list">
        <ul class="vp--dots-section" v-for="(section, index) in sections" :key="index">
            <li
                :class="['vp--dot', 'vp--section', {'vp--section-active': hasClass(section, 'vp--active')}]"
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

<script>
import Vue from 'vue';
export default {
    data() {
        return {
            sections: Vue.vp.sections,
            panels: Vue.vp.panels
        }
    },
    methods: {
        scrollTo(elem) {
            window.scrollTo(elem.offsetTop);
        },
        hasClass(elem, classToAdd) {
            return elem.classList.contains(classToAdd);
        }
    }
}
</script>

<style lang="sass">

</style>
