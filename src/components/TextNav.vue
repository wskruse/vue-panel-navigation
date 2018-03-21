<template>
    <ul :class="classes.sectionUl">
        <li
            v-for="(section, index) in sections" :key="index"
            :class="['vp--text', 'vp--section', {'vp--section-active': hasClass(section, 'vp--active')}]"
            :aria-label="section.dataset.title"
            :title="section.dataset.title"
            
        >
            <a @click="sectionClicked(section, $event)">{{ section.dataset.title }}</a>
            <ul :class="classes.panelUl">
                <li
                    v-for="(panel, index) in panels[section.dataset.uuid]"
                    :key="index"
                    :aria-label="panel.dataset.title"
                    :title="panel.dataset.title"
                    :class="classes.panelLi"
                >
                    <a @click="panelClicked(panel, $event)">{{ panel.dataset.title }}</a>
                </li>
            </ul>
        </li>
    </ul>
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
