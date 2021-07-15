<template>
    <div class="main-counter">
        <div class="title">资源增长速度(单位：2s)</div>
        <div class="counter-content">
            <div
                class="counter-item"
                v-for="(value, name) in increaseObj"
                :key="name"
            >
                {{ resourceName[name] }}：
                <div class="item-num">
                    {{ value.toFixed(1) }}
                </div>
                <div 
                    class="item-num"
                    v-if="consumeObj[name]"
                >
                    (- {{ consumeObj[name] }})
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="title">累计生产资源</div>
        <div class="counter-content">
            <div 
                class="counter-item"
                v-for="(value, name) in counter.producedResource"
                :key="name"
            >
                {{ resourceName[name] }}：
                <span class="item-num">{{ value.toFixed(1) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                divisionKeys: Object.keys(this.division),
                resourceName: {
                    population: "人口", science: "科学",
                    food: "粮食", wood: "木材",
                    stone: "石料", coal: "煤炭",
                    copperMine: "铜矿", copperIngot: "铜锭",
                    ironMine: "铁矿", ironIngot: "铁锭"
                }
            }
        },
        computed: {
            // 函数：返回资源增长速度 数组
            increaseObj() {
                let speedObj = {}
                let division = this.division
                for (let item in division) {
                    let increase = division[item].increase
                    let speed = division[item].num * increase.num
                    let resource = increase.resource

                    if (!resource) {
                        delete speedObj[resource]
                        continue
                    }

                    speedObj[resource] = speed
                }
                return speedObj
            },
            // 函数：返回资源消耗数组
            consumeObj() {
                let speedObj = {
                    food: null, coal: null,
                    copperMine: null, ironMine: null
                }
                // 当前人口数量
                let population = this.resourceData.population
                // 当前熔炉状态
                let stove = this.division.stove
                for (let item in speedObj) {
                    switch (item) {
                        case "food":
                            speedObj[item] = population
                            break
                        case "coal":
                            speedObj[item] = stove.num * 2
                            break
                        case "copperMine":
                            if (stove.increase.resource == "copperIngot") {
                                speedObj[item] = stove.num * 2
                            }
                            break
                        case "ironMine":
                            if (stove.increase.resource == "ironIngot") {
                                speedObj[item] = stove.num * 2
                            }
                            break
                    }
                }
                return speedObj
            }
        },
        mounted() {
            setInterval(() => {
                for (let item in this.increaseObj) {
                    if (item == "") {return}

                    let increase = this.increaseObj[item] // 增长速度
                    let consume = this.consumeObj[item] // 消费速度
                    if (consume) { // 若该种资源存在消费速度
                        // 该种资源增长速度 应减去 消费速度
                        increase -= consume
                    }
                    // 改变资源对应值
                    const resource = this.resourceData
                    // 资源不足且增长为负时
                    if (resource[item] < Math.abs(increase) && increase < 0) {
                        // 资源直接归零
                        this.resourceData[item] = 0
                        // 若资源类型为粮食
                        if (item == "food") {
                            const population = this.resourceData.population
                            // 当总人口等于农田雇佣数，每两秒减少一个农田雇佣
                            if (population == this.division.field.num) {
                                this.division.field.num -= 1
                            }
                            // 若人口数大于 0，每两秒死去一人
                            if (resource.population > 0) {
                                this.resourceData.population -= 1
                            }
                            // 除农田外，其他建筑的雇佣归零
                            for (let item of this.divisionKeys.slice(1)) {
                                this.division[item].num = 0
                            }
                        }
                    } else {
                        // 若资源类型为 铜锭/铁锭
                        if (["copperIngot", "ironIngot"].includes(item)) {
                            // 若 铜矿石/铁矿石 数量为 0
                            if (!resource.copperMine && item == "copperIngot" ||
                                !resource.ironMine && item == "ironIngot") {
                                return
                            }
                        }
                        // 资源充足时直接增长
                        this.resourceData[item] += increase
                        // 若增长数量大于 0，记录进累计资源
                        if (increase > 0) {
                            this.counter.producedResource[item] += increase
                        }
                        // 粮食充足时人口每两秒增长 1，直到上限
                        if (item == "food") {
                            const room = this.buildings.room.num
                            if (room * 2 > resource.population) {
                                this.resourceData.population += 1
                                this.counter.producedResource.population += 1
                            }
                        }
                    }
                }
            }, 2000)
        },
        inject: ["buildings", "counter", "division", "resourceData"]
    }
</script>

<style scoped>
    .title {
        margin-right: auto;
        margin-bottom: .6rem;
        border-bottom: solid 1px #e0e0e0;
        font-size: 1.4rem;
        text-align: left
    }

    .counter-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
        transition: .3s east-out
    }
    .counter-item {
        min-width: 40%;
        margin-left: 1rem;
        margin-bottom: .4rem;
        color: #424242;
        font-size: 1.2rem;
        transition: .3s ease-out
    }
    .counter-item .item-num {
        display: inline-block;
        padding: 0 .4rem;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
        user-select: none
    }

    .divider {
        margin: .6rem 0 0
    }

    /* 过渡动画 */
    .slide-enter-active .counter-item,
    .slide-leave-active .counter-item {
        opacity: 0
    }
    /* ---- */
</style>