import DotsNav from './components/DotsNav';
import TextNav from './componentsTextNav';

export function install (Vue, options) {
    let plugin = this;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;

    Vue.directive('vp-section', {
        bind(el, binding) {
            el.setAttribute('data-vp-section', binding.value)
        }
    });

    Vue.directive('vp-panel', {
        bind(el, binding) {
            el.setAttribute('data-vp-panel', binding.value)
        }
    });

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
}
