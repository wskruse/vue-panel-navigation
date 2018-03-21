<template>
    <ul :class="classes.sectionUl">
        <li
            v-for="(section, index) in sections" :key="index"
            :class="classes.sectionLi"
            :aria-label="section.title"
            :title="section.title"
            
        >
            <a @click="sectionClicked(section.element, $event)">{{ section.title }}</a>
            <ul :class="classes.panelUl">
                <li
                    v-for="(panel, index) in panels[section.element.dataset.uuid]"
                    :key="index"
                    :aria-label="panel.title"
                    :title="panel.title"
                    :class="classes.panelLi"
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
    mixins: [NavMixin]
}
</script>

<style lang="sass">

</style>
