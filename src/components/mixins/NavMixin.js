import Vue from 'vue';
export default {
    props: {
        classes: {
            type: Object,
            default () {
                return {
                    sectionUl: ['vp--text-sections'],
                    sectionLi: ['vp--text', 'vp--section'],
                    panelUl: ['vp--text-panels'],
                    panelLi: ['vp--text', 'vp--panel']
                }
            }
        }
    },
    data() {
        return {
            sections: Vue.vp.sections,
            panels: Vue.vp.panels
        }
    },
    methods: {
        scrollTo(elem) {
            this.$scrollTo(elem);
        },
        hasClass(elem, classToAdd) {
            return elem.classList.contains(classToAdd);
        }
    }
}
