<template>
<div>
  <form action="#" class="form">
    <input type="text">
    <button type="button">button</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'flexbox'
}
</script>

<style scoped>
.form {
  display: flex;
}
input  {
  flex-grow: 1;
}
</style>
