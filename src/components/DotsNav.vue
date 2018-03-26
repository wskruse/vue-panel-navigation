<template>
    <ul :class="classes.dotSectionUl">
        <li
            v-for="(section, index) in sections" :key="index"
            :class="[classes.dotSectionLi, {'active': section.active}]"
            :aria-label="section.title"
            :title="section.title"
            
        >
            <a @click="sectionClicked(section.element, $event)" v-tooltip="section.title"></a>
            <ul :class="classes.dotPanelUl">
                <li
                    v-for="(panel, index) in panels[section.element.dataset.uuid]"
                    :key="index"
                    :aria-label="panel.title"
                    :title="panel.title"
                    :class="[classes.dotPanelLi, {'active': panel.active}]"
                >
                    <a @click="panelClicked(panel.element, $event)" v-tooltip="panel.title"></a>
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
