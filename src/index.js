import DotsNav from './components/DotsNav';
import TextNav from './componentsTextNav';
import scrollmonitor from 'scrollmonitor';

export function install (Vue, options) {
    let plugin = this;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;

    Vue.directive('vp-section', {
        bind(el, binding) {
            el.setAttribute('data-vp-section', binding.value);
            watcher.enterViewport(() => {
                el.classlist.add('vp--active');
            });
            watcher.exitViewport(() => {
                el.classlist.remove('vp--active');
            });
        }
    });

    Vue.directive('vp-panel', {
        bind(el, binding) {
            el.setAttribute('data-vp-panel', binding.value);
            let watcher = scrollmonitor.create(el);
            watcher.enterViewport(() => {
                el.classlist.add('vp--active');
            });
            watcher.exitViewport(() => {
                el.classlist.remove('vp--active');
            });
        }
    });

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
}
