<template>
    <div class="main-division">
        <div class="division-item unemployed">
            无业游民：&nbsp;
            <div class="item-num">{{ unemployed }}</div>
        </div>

        <div 
            class="division-item division-item-slide"
            v-for="(value, name) in division"
            :key="name"
        >
            {{ buildings[name].name }}：&nbsp;<!-- 建筑名称 -->

            <button 
                class="btn waves-effect blue-grey material-icons"
                :class="{ disabled: !value.num }"
                @click="changeDivision(name, -1)"

                @mousedown="changeDivisionLP(name, -1)"
                @mouseleave="stopDivision()"
                @mouseup="stopDivision()"
            >
                remove
            </button>             <!-- 建筑雇佣数量 -->
            <div class="item-num">{{ value.num }}</div>

            <button 
                class="btn waves-effect blue-grey material-icons"
                :class="{ disabled: !canBeAdded(name) }"
                @click="changeDivision(name, 1)"
                
                @mousedown="changeDivisionLP(name, 1)"
                @mouseleave="stopDivision()"
                @mouseup="stopDivision()"
            >
                add
            </button>
        </div>
    </div>
</template>

<script>
    let timeoutEvent, intervalEvent

    export default {
        computed: {
            // 计算无业游民数量
            unemployed() {
                    let unemployed
                    // 总人口数
                    let population = this.resourceData.population
                    for (let item in this.division) {
                        // 总人口数减去各建筑雇佣
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
            // 函数：判断建筑对应分工是否能被增加
            canBeAdded(building) {
                let unemployed = this.unemployed
                let total = this.buildings[building].num * 2 // 建筑能容纳的人数
                let employed = this.division[building].num // 建筑已雇佣数
                return (unemployed && total > employed)
            },
            // 函数：鼠标长按快速改变分工
            changeDivisionLP(building, num) {
                clearTimeout(timeoutEvent)
                timeoutEvent = setTimeout(() => {
                    intervalEvent = setInterval(() => {
                        this.changeDivision(building, num)
                    }, 150)
                }, 200)
            },
            // 函数：鼠标离开或松开时停止 changeDivisionLP
            stopDivision() {
                clearTimeout(timeoutEvent)
                clearInterval(intervalEvent)
            }
        },
        inject: ["buildings", "division", "resourceData"]
    }
</script>

<style scoped>
    .division-item {
        display: flex;
        align-items: center;
        height: 2rem;
        margin: 0 1.2rem 1.2rem;
        color: #424242;
        font-size: 1.2rem;
        transition: .3s ease-out
    }
    .division-item.unemployed {
        width: 100%;
        padding-bottom: .6rem;
        border-bottom: solid 1px #e0e0e0
    }
    .division-item .btn {
        height: 2rem;
        padding: 0 .4rem;
        font-size: 1.2rem;
        line-height: 1
    }
    .division-item .btn:hover {
        filter: brightness(1.1)
    }
    .item-num {
        padding: 0 1rem;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
        user-select: none
    }

    /* 过渡动画 */
    .slide-enter-active .division-item-slide,
    .slide-leave-active .division-item-slide {
        opacity: 0
    }
    /* ---- */
</style>