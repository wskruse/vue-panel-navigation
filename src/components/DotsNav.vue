<template>
    <div class="vp--dots-list">
        <ul class="vp--dots-section" v-for="(section, index) in sections" :key="index">
            <li
                :class="['vp--dot', 'vp--section', {'vp--section-active': hasClass(section, 'vp--active')}]"
                :aria-label="section.dataset.title"
                :titl="section.dataset.title"
                @click="scrollTo(section)"
            ></li>
            <li
                v-for="(panel, index) in panels[section.dataset.uuid]"
                :key="index"
                :aria-label="panel.dataset.title"
                :titl="panel.dataset.title"
                :class="['vp--dot', 'vp--panel', {'vp--panel-active': hasClass(panel, 'vp--active')}]"
                @click="scrollTo(panel)"
            ></li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
import NavMixin from './mixins/NavMixin';
export default {
    mixins: [NavMixin]
}
</script>

<style lang="sass">

</style>
