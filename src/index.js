import Vue from 'vue';
import DotsNav from './components/DotsNav';
import TextNav from './components/TextNav';
import scrollmonitor from 'scrollmonitor';
import shortid from 'shortid';

export default function install (Vue, options) {
    let plugin = install;
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    Vue.vp = {
        sections: [],
        panels: {}
    };

    Vue.directive('vp-section', {
        bind(el, binding) {
            el.setAttribute('data-vp-section', shortid.generate());
            let watcher = scrollmonitor.create(el);
            watcher.enterViewport(() => {
                el.classList.add('vp--active');
            });
            watcher.exitViewport(() => {
                el.classList.remove('vp--active');
            });
            el.panels = [];
            Vue.vp.sections.push(el);
        }
    });

    Vue.directive('vp-panel', {
        bind(el, binding, vnode, oldVnode) {
            el.setAttribute('data-vp-panel', shortid.generate());
            let watcher = scrollmonitor.create(el);
            watcher.enterViewport(() => {
                el.classList.add('vp--active');
            });
            watcher.exitViewport(() => {
                el.classList.remove('vp--active');
            });
            Vue.vp.panels.push(el); 
        }
    });

    Vue.vpGetSections = () => {
        return plugin.sections;
    };

    Vue.vpGetPanels = () => {
        return plugin.panels;
    };

    Vue.component('VpDotsNav', DotsNav);
    Vue.component('VpTextNav', TextNav);
}
