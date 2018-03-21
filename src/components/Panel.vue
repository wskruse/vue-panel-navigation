<template>
    <div class="vp--panel">
        <slot></slot>
    </div>
</template>

<script>
    import scrollmonitor from 'scrollmonitor';
    export default {
        props: {
            sortIndex: {
                type: Number,
                default: 0
            },
            title: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                section: null
            }
        },
        watch: {
            title(newTitle, oldTitle) {
                this.$el.dataset.title = newTitle;
            }
        },
        mounted() {
            this.$el.dataset.uuid = this.$shortId();
            this.$set(this, 'section', this.$firstParent('.vp--section'));
            this.$el.dataset.title = this.title;
            this.$addPanel(this.title, this.sortIndex, this.$el, this.section);
            let watcher = this.watcher = scrollmonitor.create(this.$el);
            watcher.fullyEnterViewport(() => {
                this.$el.classList.add('vp--active');
            });
            watcher.partiallyExitViewport(() => {
                this.$el.classList.remove('vp--active');
            });
        },
        destroyed() {
            this.watcher.destroy();
        }
    }
</script>

<style lang="scss" scoped>

</style>
