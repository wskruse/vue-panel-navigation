import Vue from 'vue';
import DotsNav from './components/DotsNav';
import TextNav from './components/TextNav';
import Section from './components/Section';
import Panel from './components/Panel';
import scrollmonitor from 'scrollmonitor';
import shortid from 'shortid';
import get from 'lodash.get';
import smoothscroll from 'smoothscroll';

export default function install(Vue, options) {
    let plugin = install;
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
        let elem = this.$el;
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
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
    }

    Vue.prototype.$shortId = () => {
        return shortid.generate();
    }

    // decide if the addPanel method should be prototypical, or global, the method should take the panel and an optional section
    // if the section does not exist, or is not passed, add to a default bucket, otherwise nest under the section
    Vue.prototype.$addPanel = (panel, section) => {
        let key = get(section, 'dataset.uuid', 'default');
        if (! Vue.vp.panels[key]) {
            Vue.set(Vue.vp.panels, key, []);
        }
        Vue.vp.panels[key].push(panel);
    }
    Vue.prototype.$addSection = (section) => {
        Vue.vp.sections.push(section);
        Vue.set(Vue.vp.panels, section.dataset.uuid, []);
        for (let i = 0; i < Vue.vp.panels['default'].length; i++) {
            let panel = Vue.vp.panels.default[i];
            if (section.contains(panel)) {
                Vue.vp.panels[section.dataset.uuid].push(panel);
                Vue.vp.panels.default.splice(i, 1);
                i--;
            }
        }
    }

    Vue.prototype.$scrollTo = function (elem) {
        smoothscroll(elem);
    };

    Vue.prototype.$getPanels = () => {
        return Vue.vp.panels;
    }

    Vue.prototype.$getSections = () => {
        return Vue.vp.sections;
    }

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
    Vue.component('VpPanel', Panel);
    Vue.component('VpSection', Section);
}
