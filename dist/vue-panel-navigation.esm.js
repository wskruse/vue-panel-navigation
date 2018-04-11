import 'vue';
import scrollmonitor from 'scrollmonitor';
import shortid from 'shortid';
import get from 'lodash.get';
import smoothscroll from 'smoothscroll';
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';

var NavMixin = {
    props: {
        classes: {
            type: Object,
            default: function _default() {
                return {
                    textSectionUl: ['vp--text-sections'],
                    textSectionLi: ['vp--text', 'vp--section'],
                    textPanelUl: ['vp--text-panels'],
                    textPanelLi: ['vp--text', 'vp--panel'],
                    dotSectionUl: ['vp--dot-sections'],
                    dotSectionLi: ['vp--dot', 'vp--section'],
                    dotPanelUl: ['vp--dot-panels'],
                    dotPanelLi: ['vp--dot', 'vp--panel']
                };
            }
        }
    },
    data: function data() {
        return {
            sections: [],
            panels: {}
        };
    },

    methods: {
        scrollTo: function scrollTo(elem) {
            this.$scrollTo(elem);
        },
        hasClass: function hasClass(elem, classToAdd) {
            return elem.classList.contains(classToAdd);
        },
        sectionClicked: function sectionClicked(section, $event) {
            if (!this.$listeners.sectionclicked) {
                // handle the click ourselves
                this.scrollTo(section);
            } else {
                var vm = this;
                this.$emit('sectionclicked', section, $event, function () {
                    vm.scrollTo(section);
                });
            }
        },
        panelClicked: function panelClicked(panel, $event) {
            if (!this.$listeners.panelclicked) {
                // handle the click ourselves
                this.scrollTo(panel);
            } else {
                var vm = this;
                this.$emit('panelclicked', panel, $event, function () {
                    vm.scrollTo(panel);
                });
            }
        }
    },
    created: function created() {
        this.sections = this.$getSections();
        this.panels = this.$getPanels();
    }
};

var DotsNav = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: _vm.classes.dotSectionUl }, _vm._l(_vm.sections, function (section, index) {
            return _c('li', { key: index, class: [_vm.classes.dotSectionLi, { 'active': section.active }], attrs: { "aria-label": section.title, "title": section.title } }, [_c('a', { directives: [{ name: "tooltip", rawName: "v-tooltip.right", value: section.title, expression: "section.title", modifiers: { "right": true } }], on: { "click": function click($event) {
                        _vm.sectionClicked(section.element, $event);
                    } } }), _vm._v(" "), _c('ul', { class: _vm.classes.dotPanelUl }, _vm._l(_vm.panels[section.element.dataset.uuid], function (panel, index) {
                return !panel.excludeFromNav ? _c('li', { key: index, class: [_vm.classes.dotPanelLi, { 'active': panel.active }], attrs: { "aria-label": panel.title, "title": panel.title } }, [_c('a', { directives: [{ name: "tooltip", rawName: "v-tooltip.right", value: panel.title, expression: "panel.title", modifiers: { "right": true } }], on: { "click": function click($event) {
                            _vm.panelClicked(panel.element, $event);
                        } } })]) : _vm._e();
            }))]);
        }));
    }, staticRenderFns: [],
    mixins: [NavMixin]
};

var TextNav = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: _vm.classes.textSectionUl }, _vm._l(_vm.sections, function (section, index) {
            return _c('li', { key: index, class: [_vm.classes.textSectionLi, { 'active': section.active }], attrs: { "aria-label": section.title, "title": section.title } }, [_c('a', { on: { "click": function click($event) {
                        _vm.sectionClicked(section.element, $event);
                    } } }, [_vm._v(_vm._s(section.title) + " "), _vm.showExpander ? _c('i', { class: _vm.expanderClass }) : _vm._e()]), _vm._v(" "), _c('ul', { class: _vm.classes.textPanelUl }, _vm._l(_vm.panels[section.element.dataset.uuid], function (panel, index) {
                return !panel.excludeFromNav ? _c('li', { key: index, class: [_vm.classes.textPanelLi, { 'active': panel.active }], attrs: { "aria-label": panel.title, "title": panel.title } }, [_c('a', { on: { "click": function click($event) {
                            _vm.panelClicked(panel.element, $event);
                        } } }, [_vm._v(_vm._s(panel.title))])]) : _vm._e();
            }))]);
        }));
    }, staticRenderFns: [],
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
};

var OffsetMixin = {
    props: {
        offsetTop: {
            type: Number,
            default: 0
        },
        offsetBottom: {
            type: Number,
            default: 0
        }
    }
};

var Section = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['vp--section', { 'vp--active': _vm.section.active }] }, [_vm._t("default")], 2);
    }, staticRenderFns: [], _scopeId: 'data-v-8fbe9336',
    mixins: [OffsetMixin],
    props: {
        sortIndex: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            require: true
        }
    },
    data: function data() {
        return {
            section: {
                active: false
            }
        };
    },

    watch: {
        title: function title(newTitle, oldTitle) {
            this.$updateSectionTitle(newTitle, this.$el.dataset.uuid);
        }
    },
    mounted: function mounted() {
        this.$el.dataset.uuid = this.$shortId();
        this.$el.dataset.title = this.title;
        this.section = this.$addSection(this.title, this.$el);
        scrollmonitor.update();
    },
    destroyed: function destroyed() {}
};

var Panel = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vp--panel" }, [_vm._t("default")], 2);
    }, staticRenderFns: [], _scopeId: 'data-v-d32d57f8',
    mixins: [OffsetMixin],
    props: {
        sortIndex: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            require: true
        },
        exclude: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            section: null,
            uuid: null,
            sectionUuid: null
        };
    },

    watch: {
        title: function title(newTitle, oldTitle) {
            this.$updatePanelTitle(newTitle, this.$el.dataset.uuid, this.getSectionUuid());
        },
        exclude: function exclude(value) {
            this.$setExcludeFromNav(this.uuid, this.getSectionUuid(), value);
        }
    },
    methods: {
        getSectionUuid: function getSectionUuid() {
            if (!this.sectionUuid && this.section) {
                this.sectionUuid = this.section.dataset.uuid;
            }
            return this.sectionUuid;
        }
    },
    mounted: function mounted() {
        var baseOffset = scrollmonitor.viewportHeight / 3;
        var vm = this;
        this.$el.dataset.uuid = this.uuid = this.$shortId();
        this.$set(this, 'section', this.$firstParent('.vp--section'));
        this.$el.dataset.title = this.title;
        this.$addPanel(this.title, this.sortIndex, this.$el, this.section, this.exclude);

        var watcher = this.watcher = scrollmonitor.create(this.$el, {
            top: this.offsetTop - baseOffset,
            bottom: this.offsetBottom - baseOffset
        });
        watcher.enterViewport(function () {
            vm.$el.classList.add('vp--active');
            vm.$setActivePanel(vm.uuid, vm.getSectionUuid());
            vm.$setActiveSection(vm.getSectionUuid());
        });
        scrollmonitor.update();
    },
    destroyed: function destroyed() {
        this.watcher.destroy();
    }
};

var NextButton = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('button', { class: _vm.buttonClasses, on: { "click": _vm.click } }, [_vm.iconBeforeClass ? _c('i', { class: _vm.iconBeforeClass }) : _vm._e(), _vm._v(" " + _vm._s(_vm.text) + " "), _vm.iconAfterClass ? _c('i', { class: _vm.iconAfterClass }) : _vm._e()]);
    }, staticRenderFns: [], _scopeId: 'data-v-7b40ebb5',
    props: {
        buttonClasses: {
            type: [Array, String],
            default: function _default() {
                return ['vp--next'];
            }
        },
        text: {
            type: String,
            default: 'Next'
        },
        iconBeforeClass: {
            type: [Array, String]
        },
        iconAfterClass: {
            type: [Array, String]
        },
        hideOnLastPanel: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            watcher: null
        };
    },
    mounted: function mounted() {
        if (this.hideOnLastPanel) {
            // find the last panel in the last section
            var vm = this;
            var interval = setInterval(function () {
                var lastPanel = document.querySelector('.vp--section:last-child .vp--panel:last-child');
                if (lastPanel) {
                    vm.watcher = scrollmonitor.create(lastPanel);
                    vm.watcher.enterViewport(function () {
                        vm.$el.classList.add('hidden');
                    });
                    vm.watcher.exitViewport(function () {
                        vm.$el.classList.remove('hidden');
                    });
                    clearInterval(interval);
                }
            }, 100);
        }
    },

    methods: {
        click: function click() {
            this.$scrollToNextPanel();
        }
    }
};

function install(Vue, options) {
    var plugin = install;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    Vue.set(Vue, 'vp', {});
    Vue.set(Vue.vp, 'sections', []);
    Vue.set(Vue.vp, 'panels', {});

    /**
     * @param {String} selector the dom selector to match parents against
     * @returns {Element|Null} the element if found, or null if not
     */
    Vue.prototype.$firstParent = function (selector) {
        // Element.matches() polyfill
        var elem = this.$el;
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
        }

        // Get closest match
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }

        return null;
    };

    Vue.prototype.$shortId = function () {
        return shortid.generate();
    };

    // decide if the addPanel method should be prototypical, or global, the method should take the panel and an optional section
    // if the section does not exist, or is not passed, add to a default bucket, otherwise nest under the section
    Vue.prototype.$addPanel = function (title, sortIndex, panel, section, excludeFromNav) {
        var key = get(section, 'dataset.uuid', 'default');
        if (!Vue.vp.panels[key]) {
            Vue.set(Vue.vp.panels, key, []);
        }
        Vue.vp.panels[key].push({
            title: title,
            sortIndex: sortIndex,
            element: panel,
            section: section,
            uuid: panel.dataset.uuid,
            active: false,
            excludeFromNav: excludeFromNav
        });
    };

    Vue.prototype.$addSection = function (title, section) {
        var sectionData = {
            title: title,
            element: section,
            uuid: section.dataset.uuid,
            active: false
        };
        Vue.vp.sections.push(sectionData);
        Vue.set(Vue.vp.panels, section.dataset.uuid, []);
        for (var i = 0; i < Vue.vp.panels['default'].length; i++) {
            var panel = Vue.vp.panels.default[i];
            if (section.contains(panel.element)) {
                panel.section = section;
                Vue.vp.panels[section.dataset.uuid].push(panel);
                Vue.vp.panels.default.splice(i, 1);
                i--;
            }
        }
        return sectionData;
    };

    Vue.prototype.$updatePanelTitle = function (newTitle, uuid, sectionUuid) {
        var key = sectionUuid || 'default';
        var panels = Vue.vp.panels[key];
        for (var i = 0; i < panels.length; i++) {
            var element = panels[i];
            if (element.uuid === uuid) {
                element.title = newTitle;
                break;
            }
        }
    };

    Vue.prototype.$updateSectionTitle = function (newTitle, uuid) {
        var sections = Vue.vp.sections;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if (section.uuid === uuid) {
                section.title = newTitle;
                break;
            }
        }
    };

    Vue.prototype.$setActiveSection = function (uuid) {
        Vue.vp.sections.forEach(function (item) {
            item.active = item.uuid === uuid;
        });
    };

    Vue.prototype.$setActivePanel = function (uuid, sectionUuid) {
        var key = sectionUuid || 'default';
        Vue.vp.panels[key].forEach(function (item) {
            item.active = item.uuid === uuid;
        });
    };

    Vue.prototype.$setExcludeFromNav = function (uuid, sectionUuid, value) {
        var key = sectionUuid || 'default';
        for (var i = 0; i < Vue.vp.panels[key].length; i++) {
            var item = Vue.vp.panels[key][i];
            if (item.uuid === uuid) {
                item.excludeFromNav = value;
                break;
            }
        }
    };

    Vue.scrollTo = Vue.prototype.$scrollTo = function (elem) {
        smoothscroll(elem);
    };

    Vue.prototype.$scrollToNextPanel = function () {
        // get the active section
        var index = Vue.vp.sections.findIndex(function (section) {
            return section.active;
        });
        var section = Vue.vp.sections[index];
        if (section) {
            // now find the index of the active panel
            var panelIndex = Vue.vp.panels[section.uuid].findIndex(function (panel) {
                return panel.active;
            });
            if (panelIndex >= 0 && panelIndex < Vue.vp.panels[section.uuid].length - 1) {
                Vue.scrollTo(Vue.vp.panels[section.uuid][panelIndex + 1].element);
            } else if (index + 1 < Vue.vp.sections.length) {
                section = Vue.vp.sections[index + 1];
                Vue.scrollTo(Vue.vp.panels[section.uuid][0].element);
            }
        }
    };

    Vue.prototype.$scrollToNexSection = function () {
        var index = Vue.vp.sections.findIndex(function (section) {
            return section.active;
        });
        if (index >= 0 && index + 1 < Vue.vp.sections.length) {
            Vue.scrollTo(Vue.vp.sections[index + 1].element);
        }
    };

    Vue.prototype.$getPanels = function () {
        return Vue.vp.panels;
    };

    Vue.prototype.$getSections = function () {
        return Vue.vp.sections;
    };

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
    Vue.component('VpPanel', Panel);
    Vue.component('VpSection', Section);
    Vue.component('VpNext', NextButton);
    Vue.use(Tooltip);
}

export default install;
