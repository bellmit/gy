<template>
    <div>
        <!--<div v-for="(item, index) in tabs" :key="index">-->
            <!--<component :is="item.cName" :order-data="orderObj"></component>-->
        <!--</div>-->
        <!--<div v-for="(item, index) in tabs" :key="index">-->
            <!--<component :is="item.cName" :order-data="orderObj"></component>-->
        <!--</div>-->
        <div class="caoz">
            <button class="gy-button-extra" @click="submit(form)">保存</button>
        </div>
    </div>
</template>

<script>
// import cont1 from './../contract/components/cont1';
// import cont2 from './../contract/components/cont2';
// import cont3 from './../contract/components/cont3';
// import cont4 from './../contract/components/cont4';

export default {
    // components: {cont1, cont2, cont3, cont4},
    data () {
        return {
            tabs: [
                {
                    cName: 'cont1'
                },
                {
                    cName: 'cont2'
                },
                {
                    cName: 'cont4'
                },
                {
                    cName: 'cont3'
                }
            ],
            orderObj: {
                name: 'test'
            }
        };
    },
    mounted () {
    },
    methods: {
        submit (form) {
            alert(this.orderObj.name);
        }
    }
};
</script>

<style scoped lang="scss">
</style>
