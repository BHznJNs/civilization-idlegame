<template>
    <div class="main-buildings">
        <button
            class="btn blue-grey waves-effect"
            @mouseover="showInfo(0)"
            @mouseleave="hideInfo"
            @click="addFood"
        >
                增加食物
        </button>
        <button
            class="btn blue-grey fade"
            v-for="(value, name, index) in buildings"
            @mouseover="showInfo(index + 1)"
            @mouseleave="hideInfo"
            @click="addBuilding(name, $event.currentTarget)"

            :class="{
                insufficient: !checkEnough(name),
                'waves-effect': checkEnough(name)
            }"
            :key="name"
        >
            {{ value.name }}：{{ value.num }}
        </button>
        <div class="divider"></div>
        <!-- 特殊建筑 -->
        <div
            class="card special-buildings fade"
            :class="{ insufficient: !buildings[name].num }"
            v-for="(value, name) in SpecialBuildings"
            :key="name"
        >
            <!-- 特殊建筑名称 -->
            <div class="card-title">{{ value.name }}</div>
            <div class="divider"></div>
            <!-- 特殊建筑选项 -->
            <button 
                class="btn waves-effect"
                :class="{ selected: division[name].increase.resource == resourceName }"
                @click="changeSB(name, resourceName)"
                v-for="(resourceValue, resourceName) in value.resources"
                :key="resourceName"
            >
                {{ resourceValue }}
            </button>
        </div>
    </div>
</template>

<script>
    import BuildingInfo from "./BuildingInfo"
    import SpecialBuildings from "./SpecialBuildings"
    
    let timeoutEvent

    export default {
        data() {
            return { SpecialBuildings }
        },
        methods: {
            // 函数：改变资源数量
            addFood() {
                this.resourceData.food += 1
                this.counter.producedResource.food += 1
            },
            // 函数：增加建筑
            addBuilding(building, obj) {
                let priceData = this.buildings[building].price
                // 检查资源是否足够，若不够，则振动建筑按钮并返回函数
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
            // change special buildings 改变特殊建筑生产资源
            changeSB(building, resource) {
                this.division[building].increase.resource = resource
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
        inject: [
            "buildings", "counter", "division",
            "event", "resourceData", "showingInfo"
        ]
    }
</script>

<style scoped>
    .btn:hover:not(.insufficient) {
        filter: brightness(1.1)
    }

    .main-buildings > .btn {
        margin: 0 1.2rem 1.6rem;
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

    .card {
        margin: 1rem .8rem 1.6rem;
        transition: .3s ease-out
    }
    .card.insufficient {
        pointer-events: none;
        opacity: .6
    }
    .card.insufficient * {
        pointer-events: none !important
    }

    .special-buildings {
        color: white;
        background-color: #647279
    }
    .card-title {
        padding: 0 1rem;
        user-select: none;
        text-align: center
    }
    .special-buildings .btn {
        margin: .4rem .6rem;
        color: #424242;
        background-color: #a6b6be;
        pointer-events: auto;
        opacity: .6
    }
    .special-buildings .btn.selected {
        pointer-events: none;
        opacity: 1
    }

    /* 过渡动画 */
    .slide-enter-active .fade,
    .slide-leave-active .fade {
        opacity: 0
    }
    /* ---- */
</style>