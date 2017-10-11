<template>
    <h1>home</h1>
</template>

<script>
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    computed: {
        /* 根据Category来计算silders的内容 */
        sliders: function() {
            // console.log(this.categorys === null);
            let sliders = [];
            for (let category in this.categorys) {
                // console.log(category);
                // console.log(this.categorys[category]);
                this.categorys[category].forEach((product) => {
                    // console.log(product.name);
                    // console.log(product.slider);
                    if (product.slider) {
                        sliders.push(product);
                    }
                });
            }
            console.log(sliders);
            return sliders;
        }
    },
    methods: {
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
