<template>
    <button :class="buttonClasses" @click="click">
        <i v-if="iconBeforeClass" :class="iconBeforeClass"></i>
        {{text}}
        <i v-if="iconAfterClass" :class="iconAfterClass"></i>
    </button>
</template>
<script>
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
</style>
