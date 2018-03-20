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
            this.$scrollTo(elem);
        },
        hasClass(elem, classToAdd) {
            return elem.classList.contains(classToAdd);
        }
    }
}
