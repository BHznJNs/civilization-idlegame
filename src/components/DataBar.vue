<template>
    <div class="title grey darken-3 waves-effect">文明：放置游戏</div>

    <ul class="data-bar side-nav">
        <li v-for="(value, name, index) in resourceImg" :key="index">
            <a class="resource" :class="{ 'resource-empty': !resourceData[name] }">
                <img class="resource-img" :src="value.src" :alt="value.name">
                &nbsp;{{ value.name }}：{{ floatResolve(resourceData[name]) }}
            </a>
            <div class="divider" v-once v-if="index != Object.keys(resourceData).length - 1"></div>
        </li>          <!-- ^ 如果为最后一项 -->
    </ul>
</template>

<script>
    // 定义资源项对象
    let resourceImg = {
        population: { name: "人口", src: "" },
        food: { name: "粮食", src: "" },
        wood: { name: "木材", src: "" },
        stone: { name: "石料", src: "" },
        coal: { name: "煤炭", src: "" },
        copperMine: { name: "铜矿", src: "" },
        copperIngot: { name: "铜锭", src: "" },
        ironMine: { name: "铁矿", src: "" },
        ironIngot: { name: "铁锭", src: "" }
    }
    // 遍历对象，获取其对应图标
    for (var index in resourceImg) {
        resourceImg[index].src = require(`../assets/img/${index}.svg`)
    }

    export default {
        data() {
            return { resourceImg }
        },
        methods: {
            floatResolve(num) {
                return num.toFixed(1)
            }
        },
        inject: ["resourceData"]
    }
</script>

<style scoped>
    div.title {
        height: 6vh;
        color: white;
        font-size: 1.6rem;
        text-align: center;
        line-height: 6vh
    }

    .data-bar {
        position: relative;
        width: 240px;
        max-width: 30vw;
        height: 54vh;
        padding: 0
    }

    .title {
        font-size: 1.6rem;
        text-align: center;
        user-select: none
    }

    .resource {
        display: flex;
        align-items: center;
        padding: 0 24px;
        font-size: 1.2rem;
        transition: .2s
    }
    .resource img {
        transition: .2s
    }
    .resource-empty {
        color: #bdbdbd;
        pointer-events: none;
        user-select: none
    }
    .resource-empty img {
        opacity: .4
    }

    .resource-img {
        height: 85%;
        user-select: none
    }
    @media screen and (max-width: 600px) {
        @media screen and (max-width: 400px) {
            .resource {
                font-size: 1rem
            }
        }
        .resource {
            padding: 0 12px
        }
        .resource-img {
            height: 50%;
        }
    }

    .divider {
        margin: 0 !important
    }
</style>