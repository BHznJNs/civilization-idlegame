<template>
    <div class="main-buildings">
        <button class="btn blue-grey waves-effect"
                @click="addFood">
                增加食物
        </button>
        <button class="btn blue-grey btn-slide"
                v-for="(value, name) in buildings"
                @click="addBuilding(name)"
                :class="{
                    insufficient: !checkEnough(name),
                    'waves-effect': checkEnough(name)
                }"
                :key="name">
                {{ value.name }}：{{ value.num }}
        </button>
    </div>
</template>

<script>
    export default {
        methods: {
            // 函数：改变资源数量
            addFood() {
                this.resourceData.food += 1
            },
            // 函数：增加建筑
            addBuilding(building) {
                let priceData = this.buildings[building].price
                // 检查资源是否足够
                if (!this.checkEnough(building)) {return}
                // 扣除对应资源
                for (let key in priceData) {
                    this.resourceData[key] -= priceData[key]
                }
                // 建筑增加
                this.buildings[building].num += 1
                // 事件记录
                this.event.push("你建造了一个" + this.buildings[building].name)
            },
            // 函数：检查资源是否足够
            checkEnough(building) {
                let priceData = this.buildings[building].price
                for (let key in priceData) {
                    if (this.resourceData[key] < priceData[key]) {
                        return false
                    }
                }
                return true
            }
        },
        inject: ["buildings", "event", "resourceData"]
    }
</script>

<style scoped>
    .btn {
        margin: 0 .6rem 1.2rem;
        user-select: none
    }

    .btn.insufficient {
        background-color: #90a4ae !important
    }

    /* 过渡动画 */
    .main-buildings.slide-enter-active .btn-slide,
    .main-buildings.slide-leave-active .btn-slide {
        opacity: 0
    }
    /* ---- */
</style>