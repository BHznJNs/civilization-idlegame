<template>
    <div class="main-buildings">
        <button class="btn blue-grey waves-effect"
                @click="changeResource('food', 1)">
                增加食物
        </button>
        <button class="btn blue-grey"
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
    // const ResourceName = {
    //     food: "食物",
    //     wood: "木材",
    //     stone: "石料"
    // }

    export default {
        methods: {
            // 函数：改变资源数量
            changeResource(resource, num) {
                this.resourceData[resource] += num
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
            }
        },
        inject: ["buildings", "resourceData"]
    }
</script>

<style scoped>
    .btn {
        margin: 0 .6rem 1.2rem
    }

    .btn.insufficient {
        background-color: #90a4ae !important
    }
</style>