<template>
    <div class="main-counter">
        <div class="title">资源增长</div>
    </div>
</template>

<script>
    export default {
        computed: {
            increaseSpeed() {
                // let speedArray = []

                // for (let item in division) {

                // }
                return 0
            }
        },
        inject: ["division"]
    }
</script>

<style scoped>
    .title {
        width: 100%;
        font-size: 1.4rem;
        text-align: left
    }
</style>