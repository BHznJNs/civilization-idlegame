<template>
    <div class="event-bar">
        <div class="event-item" v-for="(value, index) in event" :key="index">
            <div class="event-content">
                <i class="material-icons">event</i>
                &nbsp;{{ value }}
            </div>
            <div class="divider" v-if="index != event.length - 1"></div>
        </div>
        <transition name="fade">
            <div class="event-no-event waves-effect" v-if="!event.length">暂无消息。</div>
        </transition>
    </div>
</template>

<script>
    export default {
        inject: ["event"]
    }
</script>

<style scoped>
    .event-bar {
        position: relative;
        width: 240px;
        max-width: 30vw;
        height: 40vh;
        padding-top: 1rem;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2)
    }

    .event-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        line-height: 48px;
        text-align: center
    }
    .event-item:last-child {
        margin-bottom: 3rem
    }
    .event-content {
        display: flex;
        padding: 0 24px
    }
    .event-content i {
        user-select: none
    }
    .event-no-event {
        width: 100%;
        height: 40vh;
        margin-top: -1rem;
        background-color: #fafafa;
        font-size: 1.4rem;
        text-align: center;
        line-height: 30vh;
    }
    @media screen and (max-width: 600px) {
        .event-content {
            padding: 0 12px;
            font-size: 1rem
        }
        .event-no-event {
            font-size: 1.2rem
        }
    }
    
    .divider {
        width: 100%
    }

    .material-icons {
        line-height: unset;
    }

    /* 过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    /* ---- */
</style>