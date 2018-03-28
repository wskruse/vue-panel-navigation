<template>
    <ul :class="classes.textSectionUl">
        <li
            v-for="(section, index) in sections" :key="index"
            :class="[classes.textSectionLi, {'active': section.active}]"
            :aria-label="section.title"
            :title="section.title"
            
        >
            <a @click="sectionClicked(section.element, $event)">{{ section.title }} <i v-if="showExpander" :class="expanderClass"></i></a>
            <ul :class="classes.textPanelUl">
                <li
                    v-for="(panel, index) in panels[section.element.dataset.uuid]"
                    :key="index"
                    v-if="! panel.excludeFromNav"
                    :aria-label="panel.title"
                    :title="panel.title"
                    :class="[classes.textPanelLi, {'active': panel.active}]"
                >
                    <a @click="panelClicked(panel.element, $event)">{{ panel.title }}</a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import Vue from 'vue';
import NavMixin from './mixins/NavMixin';
export default {
    props: {
        showExpander: {
            type: Boolean,
            default: false
        },
        expanderClass: {
            type: String,
            default: 'fa fa-angle-down'
        }
    },
    mixins: [NavMixin]
}
</script>

<style lang="sass">

</style>
