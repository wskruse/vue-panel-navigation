<template>
    <button :class="buttonClasses" @click="click">
        <i v-if="iconBeforeClass" :class="iconBeforeClass"></i>
        {{text}}
        <i v-if="iconAfterClass" :class="iconAfterClass"></i>
    </button>
</template>
<script>
import scrollmonitor from 'scrollmonitor';
export default {
    props: {
        buttonClasses: {
            type: [Array, String],
            default: function() {return ['vp--next'];} 
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
    data() {
        return {
            watcher: null
        }
    },
    mounted() {
        if (this.hideOnLastPanel) {
            // find the last panel in the last section
            let vm = this;
            const interval = setInterval(function () {
                const lastPanel = document.querySelector('.vp--section:last-child .vp--panel:last-child');
                if (lastPanel) {
                    vm.watcher = scrollmonitor.create(lastPanel);
                    vm.watcher.enterViewport(() => {
                        vm.$el.classList.add('hidden');
                    });
                    vm.watcher.exitViewport(() => {
                        vm.$el.classList.remove('hidden');
                    });
                    clearInterval(interval);
                }
            }, 100)
        }
    },
    methods: {
        click() {
            this.$scrollToNextPanel();
        }
    }
}
</script>
<style lang="scss" scoped>
    .hidden {
        display: none;
    }
</style>
