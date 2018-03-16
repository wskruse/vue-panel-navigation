import DotsNav from './components/DotsNav';
import TextNav from './componentsTextNav';

export function install (Vue, options) {
    let plugin = this;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    Vue.vp = {
        sections: [],
        panels: []
    };

    Vue.directive('vp-section', {
        bind(el) {
            Vue.vp.sections.push(el);
        }
    });

    Vue.directive('vp-panel', {
        bind(el) {
            Vue.vp.panels.push(el);
        }
    });

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
}
