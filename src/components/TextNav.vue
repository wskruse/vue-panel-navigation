<template>
    <div class="vp--text-list">
        <ul class="vp--text-section" v-for="(section, index) in sections" :key="index">
            <li
                :class="['vp--text', 'vp--section', {'vp--section-active': hasClass(section, 'vp--active')}]"
                :aria-label="section.dataset.title"
                :title="section.dataset.title"
                
            >
                <a @click="scrollTo(section)">{{ section.dataset.title }}</a>
            </li>
            <li
                v-for="(panel, index) in panels[section.dataset.uuid]"
                :key="index"
                :aria-label="panel.dataset.title"
                :title="panel.dataset.title"
                :class="['vp--text', 'vp--panel', {'vp--panel-active': hasClass(panel, 'vp--active')}]"
            >
                <a @click="scrollTo(panel)">{{ panel.dataset.title }}</a>
            </li>
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
