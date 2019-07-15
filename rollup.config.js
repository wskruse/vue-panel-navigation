import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `targets` option which can specify `dest` and `format`)
    {
        input: 'src/index.js',
        external: [
            'ms',
            'vue',
            'scrollmonitor',
            'shortid',
            'smoothscroll',
            'vue-directive-tooltip',
            'vue-directive-tooltip/dist/vueDirectiveTooltip.css',
            'lodash.get'
        ],
        output: [{
                file: pkg.main,
                format: 'cjs'
            },
            {
                file: pkg.module,
                format: 'es'
            }
        ],
        plugins: [
            vue({
                compileTemplate: true,
                css: 'dist/vue-panel-navigation.css'
            }),
            babel({
                exclude: ['node_modules/**'],
            }),
            commonjs()
        ]
    }
];
