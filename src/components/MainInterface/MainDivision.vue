<template>
    <div class="main-division">
        <div class="division-item unemployed">
            无业游民：&nbsp;
            <div class="item-num">{{ getUnemployed }}</div>
        </div>
        <div class="division-item"
             v-for="(value, name) in division"
             :key="name">
            {{ value.name }}：&nbsp;<!-- 建筑名称 -->
            <button class="btn waves-effect blue-grey material-icons"
                    :class="{ disabled: !value.num }"
                    @click="changeDivision(name, -1)"
                    @mousedown="LPStart(name, -1)"
                    @mouseleave="LPEnd()"
                    @mouseup="LPEnd()">
                remove
            </button>
            <div class="item-num">{{ value.num }}</div>
            <button class="btn waves-effect blue-grey material-icons"
                    :class="{ disabled: !canBeAdded(name) }"
                    @click="changeDivision(name, 1)"
                    @mousedown="LPStart(name, 1)"
                    @mouseleave="LPEnd()"
                    @mouseup="LPEnd()">
                add
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            // 计算无业游民数量
            getUnemployed() {
                let unemployed
                let population = this.resourceData.population
                for (let item in this.division) {
                    let num = this.division[item].num
                    population -= num
                }
                unemployed = population
                return unemployed
            }
        },
        methods: {
            // 函数：改变建筑对应分工
            changeDivision(building, num) {
                this.division[building].num += num
            },
            // 函数：改变资源数量
            changeResource(resource, num) {
                if (this.resourceData[resource] < Math.abs(num) && num < 0) {
                    this.resourceData[resource] = 0
                } else {
                    this.resourceData[resource] += num
                }
            },
            // 函数：判断建筑对应分工是否能被增加
            canBeAdded(building) {
                let unemployed = this.getUnemployed
                let total = this.buildings[building].num*2 // 建筑能容纳的人数
                let employed = this.division[building].num // 建筑已分工数
                return (unemployed && total > employed)
            },
            // LP = Long Press
            LPStart(building, num) {
                clearTimeout(this.timeOutEvent)
                this.timeOutEvent = setTimeout(() => {
                    this.intervalEvent = setInterval(() => {
                        this.changeDivision(building, num)
                    }, 250)
                }, 400)
            },
            LPEnd() {
                clearTimeout(this.timeOutEvent)
                clearInterval(this.intervalEvent)
            }
        },
        mounted() {
            // 每两秒资源变动
            setInterval(() => {
                // 人口消耗资源
                const population = this.resourceData.population
                const food = this.resourceData.food
                if (food > 0) {
                    this.changeResource("food", - population * 1)
                } else { // 当食物不足时，每秒死去一人
                    this.changeResource("population", -1)
                }

                // 人口增长
                const room = this.buildings.room.num
                if (room * 2 > population && food > 0) {
                    this.changeResource("population", 1)
                }

                // 建筑增长资源
                for (let item in this.division) {
                    item = this.division[item]
                    let num = item.num // 建筑分工数
                    if (!num) {continue}

                    let increase = item.increase // 建筑对应资源增长数据
                    for (let item of increase) {
                        // item.num 为建筑对应的单个分工每两秒增长的资源
                        this.changeResource(item.resource, num*item.num)
                    }
                }
            }, 2000)
        },
        inject: ["buildings", "division", "resourceData"]
    }
</script>

<style scoped>
    .division-item {
        display: flex;
        align-items: center;
        height: 2rem;
        margin: 0 .6rem 1.2rem;
        font-size: 1.2rem;
    }
    .division-item.unemployed {
        width: 100%;
        padding-bottom: 1.2rem;
        justify-content: center;
        border-bottom: solid 1px #e0e0e0
    }
    .division-item .btn {
        height: 2rem;
        padding: 0 .4rem;
        font-size: 1.2rem;
        line-height: 1
    }
    .item-num {
        padding: 0 1rem;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
        user-select: none
    }
</style>