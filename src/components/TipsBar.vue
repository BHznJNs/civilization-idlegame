<template>
    <div class="tips-bar">
        <transition name="fade">
            <div 
                class="info-shower"
                v-if="showingInfo.length"
            >
                <div class="price">{{ showingInfo[0].price }}</div>
                <div class="func">{{ showingInfo[0].func }}</div>
                <div class="describe">{{ showingInfo[0].describe }}</div>
            </div>
        </transition>
        <transition name="fade">
            <div 
                id="tip-box" 
                class="card waves-effect hoverable"
                v-show="!showingInfo.length"
                @click="changeTip"
            >
                {{ showingTip }}
            </div>
        </transition>
    </div>
</template>

<script>
    import Tips from "./Tips"

    let intervalEvent

    export default {
        data() {
            return { showingTip: "" }
        },
        methods: {
            // 函数：当 tipBox 元素被点击时，切换 tips
            changeTip() {
                clearInterval(intervalEvent)
                let tipBox = document.querySelector("#tip-box")
                tipBox.classList.add("tip-box-disabled")
                setTimeout(() => {
                    let randomNum = Math.floor(Math.random() * Tips.length)
                    this.showingTip = Tips[randomNum]
                    tipBox.classList.remove("tip-box-disabled")

                    this.setIntervalFunc()
                }, 600)
            },
            // 函数：设置计时器，每 12 秒点击一次 tipBox 元素
            setIntervalFunc() {
                let tipBox = document.querySelector("#tip-box")
                intervalEvent = setInterval(() => {
                    tipBox.click()
                }, 12000)
            }
        },
        mounted() {
            let randomNum = Math.floor(Math.random() * Tips.length)
            this.showingTip = Tips[randomNum]
            
            this.setIntervalFunc()
        },
        inject: ["showingInfo", "resourceData"]
    }
</script>

<style scoped>
    .info-shower {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
        width: 100%;
        height: 100%;
        padding: .6rem 1rem
    }
    .info-shower .price,
    .info-shower .func {
        color: #616161
    }
    .info-shower .func {
        float: right
    }
    .info-shower .describe {
        width: 100%;
        margin-top: .4rem;
        color: #212121;
        font-size: 1.2rem;
        text-indent: 2rem;
        transition: .3s ease-out
    }

    .tips-bar {
        display: flex;
        justify-content: center;
        height: 20vh
    }
    @media screen and (max-width: 799px) {
        .tips-bar {
            width: 70vw
        }
    }
    @media screen and (min-width: 800px) {
        .tips-bar {
            width: calc(100vw - 240px)
        }
    }

    #tip-box {
        width: 40%;
        height: 16vh;
        margin: 2vh auto;
        padding: .4rem .6rem;
        color: #757575;
        background-color: #fafafa;
        border-radius: 4px;
        text-indent: 2rem;
        transition: .2s
    }
    #tip-box:hover {
        color: #424242;
        background-color: #eee;
    }
    .tip-box-disabled {
        color: transparent !important;
        background-color: #f5f5f5 !important;
        text-shadow: 2px 2px 4px #9e9e9e;
        pointer-events: none
    }

    /* 过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
        transition: .6s
    }
    .fade-enter-active .describe,
    .fade-leave-active .describe {
        color: transparent !important
    }

    .fade-enter-from,
    .fade-leave-to {
        width: 0;
        opacity: 0
    }
    /* ---- */
</style>