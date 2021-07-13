<template>
    <div class="main-buildings">
        <button class="btn blue-grey waves-effect"
                @mouseover="showInfo(0)"
                @mouseleave="hideInfo"
                @click="addFood">
                增加食物
        </button>
        <button class="btn blue-grey btn-slide"
                v-for="(value, name, index) in buildings"
                @mouseover="showInfo(index + 1)"
                @mouseleave="hideInfo"
                @click="addBuilding(name, $event.currentTarget)"
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
    const BuildingInfo = [
        {
            price: "无",
            func: "获得 1 粮食",
            describe: "作为这个文明的创世神，你可以凭空生成粮食，并以此获得子民的崇拜。"
        },
        {
            price: "200 粮食，200 木材",
            func: "增加 2 人口上限",
            describe: "温暖的小房子，每个房屋可容纳 2 个人。"
        },
        {
            price: "100 粮食",
            func: "增加 2 农田雇佣上限",
            describe: "普通的农田，每人每两秒可以生产 3 单位粮食。"
        },
        {
            price: "200 粮食，200 木材",
            func: "增加 2 伐木场雇佣上限",
            describe: "原始的伐木场，每人每两秒可以生产 2.4 单位木材。"
        },
        {
            price: "400 粮食，400 木材",
            func: "增加 2 采石场雇佣上限",
            describe: "原始的采石场，每人每两秒可以生产 2.4 单位石料"
        },
        {
            price: "600 粮食，400 木材，400 石料",
            func: "增加 2 煤矿雇佣上限",
            describe: "普通的煤矿，每人每两秒可以生产 2 单位煤炭。"
        }
    ]
    let timeoutEvent

    export default {
        methods: {
            // 函数：改变资源数量
            addFood() {
                this.resourceData.food += 1
            },
            // 函数：增加建筑
            addBuilding(building, obj) {
                let priceData = this.buildings[building].price
                // 检查资源是否足够，若不够，则振动建筑按钮
                if (!this.checkEnough(building)) {
                    obj.classList.add("insufficient-shake")
                    setTimeout(() => {
                        obj.classList.remove("insufficient-shake")
                    }, 800)
                    return
                }
                // 扣除对应资源
                for (let key in priceData) {
                    this.resourceData[key] -= priceData[key]
                }
                // 建筑增加
                this.buildings[building].num += 1
                // 事件记录
                this.event.unshift("你建造了一个" + this.buildings[building].name)
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
            // 函数：设置延时，鼠标悬停 1.2s 后，展示建筑信息
            showInfo(index) {
                timeoutEvent = setTimeout(() => {
                    this.showingInfo.push(BuildingInfo[index])
                }, 1200)
            },
            // 函数：清除延时，隐藏建筑信息
            hideInfo() {
                this.showingInfo.pop()
                clearTimeout(timeoutEvent)
            }
        },
        inject: ["buildings", "event", "resourceData", "showingInfo"]
    }
</script>

<style scoped>
    .btn {
        margin: 0 .6rem 1.8rem;
        user-select: none
    }

    .btn.insufficient {
        background-color: #90a4ae !important
    }
    .insufficient-shake {
        pointer-events: none;
        animation: shake .8s ease-in-out
    }
    @keyframes shake {
        10%, 90% {transform: translateX(-1px)}
        20%, 80% {transform: translateX(+2px)}
        30%, 70% {transform: translateX(-4px)}
        40%, 60% {transform: translateX(+4px)}
        50% {transform: translateX(-4px)}
    }

    /* 过渡动画 */
    .main-buildings.slide-enter-active .btn-slide,
    .main-buildings.slide-leave-active .btn-slide {
        opacity: 0
    }
    /* ---- */
</style>