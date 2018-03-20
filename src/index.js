import Vue from 'vue';
import DotsNav from './components/DotsNav';
import TextNav from './components/TextNav';
import scrollmonitor from 'scrollmonitor';

export default function install (Vue, options) {
    let plugin = install;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;

    Vue.directive('vp-section', {
        bind(el, binding) {
            console.log('vp-section.bind');
            el.setAttribute('data-vp-section', binding.value);
            let watcher = scrollmonitor.create(el);
            watcher.enterViewport(() => {
                el.classList.add('vp--active');
            });
            watcher.exitViewport(() => {
                el.classList.remove('vp--active');
            });
        }
    });

    Vue.directive('vp-panel', {
        bind(el, binding, vnode, oldVnode) {
            console.log('vp-panel.bind');
            el.setAttribute('data-vp-panel', binding.value);
            let watcher = scrollmonitor.create(el);
            watcher.enterViewport(() => {
                el.classList.add('vp--active');
            });
            watcher.exitViewport(() => {
                el.classList.remove('vp--active');
            });
        }
    });

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
}
