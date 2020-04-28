<template>
<div .sync='n'>
  <div>{{n.name}}</div>
  <div>{{n.val}}</div>
  <div>child</div>
  <sync-child :data='n'></sync-child>
</div>
</template>
<script>
import syncChild from './sync-child'
export default {
  name: "",
  data () {
   return {
     n: {
       name: 'a',
       val: 'v'
     }
   }
  },
   methods:{},
   components: ['syncChild']
}
</script>
<style lang="scss" scoped>
</style>
