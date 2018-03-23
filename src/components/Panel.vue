<template>
    <div class="vp--panel">
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
                section: null
            }
        },
        watch: {
            title(newTitle, oldTitle) {
                let sectionUuid = (this.section) ? this.section.dataset.uuid : null;
                this.$updatePanelTitle(newTitle, this.$el.dataset.uuid, sectionUuid);
            }
        },
        mounted() {
            this.$el.dataset.uuid = this.$shortId();
            this.$set(this, 'section', this.$firstParent('.vp--section'));
            this.$el.dataset.title = this.title;
            this.$addPanel(this.title, this.sortIndex, this.$el, this.section);
            let watcher = this.watcher = scrollmonitor.create(this.$el, {top: this.offsetTop, bottom: this.offsetBottom});
            watcher.enterViewport(() => {
                let sectionUuid = (this.section) ? this.section.dataset.uuid : null;
                this.$el.classList.add('vp--active');
                this.$setActivePanel(this.$el.dataset.uuid, sectionUuid);
            });
            watcher.exitViewport(() => {
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
