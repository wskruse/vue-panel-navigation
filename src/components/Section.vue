<template>
    <div class="vp--section">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        created() {
            this.$el.dataset.uuid = this.$shortId();
            let watcher = scrollmonitor.create(el);
            watcher.enterViewport(() => {
                el.classList.add("vp--active");
            });
            watcher.exitViewport(() => {
                el.classList.remove("vp--active");
            });
        }
    };
</script>

<style lang="scss" scoped>

</style>

