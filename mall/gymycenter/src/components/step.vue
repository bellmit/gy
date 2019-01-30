<template>
    <div class="step-box box step-active" :class="{active: isActive, double: doubleLength, done: isDone}">
        <div class="wrapper" :class="{right: isRight}">
            <div class="text-box">
                <div class="text">{{step}}</div>
            </div>
            <div v-if="showLine" class="line"></div>
        </div>
        <div class="step-text-box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'step-active',
    props: {step: '', isRight: '', isActive: '', isDone: '', doubleLength: '', showLine: {default: false}}
};
</script>
<style lang="scss" scoped>
    /*.createPayment-status-left-billStatus div:first-child div:first-child .line{*/
    /*display: none;*/
    /*}*/
    .createPayment-status-left-billStatus div:first-child div:last-child span {
        position: absolute;
        width: 100px;
    }
    .wrapper {
        display: flex;
        align-items: center;
    }
    .text-box {
        transform: rotate(222deg);
        text-align: center;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 1px solid #eee;
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff;
        margin: 0 auto;
    }

    .text {
        transform: rotate(-222deg);
        border-radius: 100%;
        font-size: 12px;
        width: 100%;
        height: 100%;
        line-height: 15px;
        color: #999;
    }

    .right {
        flex-direction: row-reverse;
        float: none;
        height: 20px;
        .text-box {
            transform: rotate(228deg);
        }
        .text {
            transform: rotate(-228deg);
        }
    }

    .active {
        .text-box {
            border-bottom: 1px solid #E0370F;
            border-right: 1px solid #E0370F;
        }
        .text-box {
            transform: rotate(42deg);
        }
        .text {
            transform: rotate(-42deg);
            color: #333333;
        }
        .right {
            .text-box {
                transform: rotate(50deg);
            }
            .text {
                transform: rotate(-50deg);
            }
        }
        .step-text-box {
            color: #333333;
        }
    }
    .done{
        .line {
            background: #E0370F;
        }
    }

    .line {
        width: 100px;
        background: #eee;
        height: 1px;
        opacity: 0.7;
    }

    .double {
        .line {
            width: 100px;
        }
    }

    .step-text-box {
        position: relative;
        color: #999;
    }

    .step-text {
        position: absolute;
        color: #333;
        font-size: 12px;
        margin-top: 6px;
        white-space: nowrap;
    }
</style>
