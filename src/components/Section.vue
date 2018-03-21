<template>
    <div class="vp--section">
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
        watch: {
            title(newTitle, oldTitle) {
                this.$el.dataset.title = newTitle;
            }
        },
        mounted() {
            this.$el.dataset.uuid = this.$shortId();
            this.$el.dataset.title = this.title;
            this.$addSection(this.$el);
            let watcher = this.watcher = scrollmonitor.create(this.$el);
            watcher.fullyEnterViewport(() => {
                this.$el.classList.add("vp--active");
            });
            watcher.partiallyExitViewport(() => {
                this.$el.classList.remove("vp--active");
            });
        },
        destroyed() {
            this.watcher.destroy();
        }
    };
</script>

<style lang="scss" scoped>

</style>

