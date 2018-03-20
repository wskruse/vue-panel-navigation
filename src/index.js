import Vue from 'vue';
import DotsNav from './components/DotsNav';
import TextNav from './components/TextNav';
import scrollmonitor from 'scrollmonitor';

export default function install(Vue, options) {
    let plugin = install;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    plugin.sections = [];
    plugin.panels = {};

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

    // decide if the addPanel method should be prototypical, or global, the method should take the panel and an optional section
    // if the section does not exist, or is not passed, add to a default bucket, otherwise nest under the section
    Vue.prototype.$addPanel = (panel, section) => {

    }

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
}
