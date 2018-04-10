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
            default: () => ['vp--next']
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
            const lastPanel = document.querySelector('vp--section:last-child vp--panel:last-child');
            this.watcher = scrollmonitor.create(lastPanel);
            this.watcher.enterViewport(() => {
                this.$el.classList.add('hidden');
            });
            this.watcher.exitViewport(() => {
                this.$el.classList.remove('hidden');
            });
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
