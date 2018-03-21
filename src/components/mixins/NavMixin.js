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
            sections: [],
            panels: {}
        }
    },
    methods: {
        scrollTo(elem) {
            this.$scrollTo(elem);
        },
        hasClass(elem, classToAdd) {
            return elem.classList.contains(classToAdd);
        },
        sectionClicked(section, $event) {
            if (! this.$listeners.sectionClicked) {
                // handle the click ourselves
                this.scrollTo(section);
            } else {
                this.$emit('sectionClicked', section, $event);
            }
        },
        panelClicked(panel, $event) {
            if (! this.$listeners.panelClicked) {
                // handle the click ourselves
                this.scrollTo(panel);
            } else {
                this.$emit('panelClicked', panel, $event);
            }
        }
    },
    created() {
        this.sections = this.$getSections();
        this.panels = this.$getPanels();
    }
}
