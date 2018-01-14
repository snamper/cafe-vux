<template>
    <div>
        <img :src="img" :style="{width: size + 'px', height: size + 'px', borderRadius:radius + '%'}">
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        img: {
            type: String
        },
        size: {
            type: Number,
            default() {
                return 50;
            }
        },
        radius: {
            type: Number,
            default() {
                return 100;
            }
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>