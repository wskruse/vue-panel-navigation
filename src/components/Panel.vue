<template>
    <div class="vp--panel">
        <slot></slot>
    </div>
</template>

<script>
import scrollmonitor from 'scrollmonitor';
export default {
    data() {
        return {
            section: null
        }
    },
    created() {
        let watcher = this.watcher = scrollmonitor.create(el);
        watcher.fullyEnterViewport(() => {
            this.$el.classList.add('vp--active');
        });
        watcher.partiallyExitViewport(() => {
            this.$el.classList.remove('vp--active');
        });
        this.$set(this, 'section', this.$firstParent('vp--section'));
        
    },
    destroyed() {
        this.watcher.destroy();
    }
}
</script>

<style lang="scss" scoped>

</style>
