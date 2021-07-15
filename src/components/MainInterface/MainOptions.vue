<template>
    <div class="main-options">
        <div class="option-describe">
            虽然退出/刷新界面是可以自动保存数据，不过你还是可以手动保存以防万一的。
        </div>
        <button 
            class="btn waves-effect"
            @click="saveData"
        >
            保存数据
        </button>
        <div class="divider"></div>
        <div class="option-describe">
            一键删除所有数据！请三思而后行。
        </div>
        <button 
            class="btn waves-effect"
            @click="clearData"
        >
            清除数据
        </button>
    </div>
</template>

<script>
    export default {
        methods: {
            clearData() {
                this.removeBeforeunload()
                localStorage.clear()
            }
        },
        inject: ["saveData", "removeBeforeunload"]
    }
</script>

<style scoped>
    .option-describe {
        width: 100%;
        font-size: 1.2rem;
        text-align: center;
        transition: .3s ease-out
    }

    .btn {
        margin: .6rem auto 1rem;
        background-color: #647279 !important
    }
    .btn:hover {
        filter: brightness(1.1)
    }
    
    .divider {
        margin: 0 0 1rem
    }

    /* 过渡动画 */
    .slide-enter-active .option-describe,
    .slide-leave-active .option-describe {
        opacity: 0
    }
    /* ---- */
</style>