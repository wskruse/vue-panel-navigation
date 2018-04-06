<template>
    <div :class="['vp--section', {'vp--active': section.active}]">
        <slot></slot>
    </div>
</template>

<script>
    import scrollmonitor from 'scrollmonitor';
    import OffsetMixin from './mixins/OffsetMixin';
    export default {
        mixins: [OffsetMixin],
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
                section: {
                    active: false
                },
            }
        },
        watch: {
            title(newTitle, oldTitle) {
                this.$updateSectionTitle(newTitle, this.$el.dataset.uuid);
            }
        },
        mounted() {
            let baseOffset = scrollmonitor.viewportHeight / 3;
            this.$el.dataset.uuid = this.$shortId();
            this.$el.dataset.title = this.title;
            this.section = this.$addSection(this.title, this.$el);
            let watcher = this.watcher = scrollmonitor.create(
                this.$el,
                {
                    top: this.offsetTop - baseOffset,
                    bottom: this.offsetBottom - baseOffset
                }
            );
            watcher.fullyEnterViewport(() => {
                this.$setActiveSection(this.$el.dataset.uuid);
            });
        },
        destroyed() {
            this.watcher.destroy();
        }
    };
</script>

<style lang="scss" scoped>

</style>

