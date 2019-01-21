<template>
    <div>
      <div id="line"></div>
      <div id="box"></div>
    </div>
</template>

<script>
export default {
  name: 'tuodong',
  mounted () {
    this.drow()
  },
  methods: {
    drow () {
      let oBox = document.getElementById('box')
      let oLine = document.getElementById('line')
      let b = ''// 声明两个空变量a，b；
      // let a = ''
      oLine.onmousedown = function (ev) {
        let iEvent = ev || event
        let dx = iEvent.clientX// 当你第一次单击的时候，存储x轴的坐标。
        // let dy = iEvent.clientY// 当你第一次单击的时候，储存Y轴的坐标。
        let dw = oBox.offsetWidth// 存储默认的div的宽度。
        // let dh = oBox.offsetHeight// 存储默认的div的高度。
        let disright = oBox.offsetWidth// 存储默认div右边距离屏幕左边的距离。
        // let distop = oBox.offsetHeight + oBox.offsetTop// 存储默认div上边距离屏幕左边的距离。
        if (iEvent.clientX < oBox.offsetLeft + 10) { // 同理
          b = 'left'
        }
        document.onmousemove = function (ev) {
          let iEvent = ev || event
          if (b === 'left') {
            oBox.style.width = dw - (iEvent.clientX - dx) + 'px'// iEvent.clientX-dx表示第二次鼠标的X坐标减去第一次鼠标的X坐标，得到绿色移动的距离（为负数），再加上原本的div宽度，就得到新的宽度。
            oBox.style.left = disright - oBox.offsetWidth + 'px'// disright表示盒子右边框距离左边的距离，disright-当前的盒子宽度，就是当前盒子距离左边的距离
            if (oBox.offsetWidth <= 100) {
              oBox.style.width = '100px'
              oLine.style.left = disright - 100 + 'px'// disright表示盒子右边框距离左边的距
              oBox.style.left = disright - oBox.offsetWidth + 'px'// 防止抖动
            } else {
              oLine.style.left = disright - oBox.offsetWidth - 2 + 'px'// disright表示盒子右边框距离左边的距
            }
          }
        }
        document.onmouseup = function () {
          document.onmousedown = null
          document.onmousemove = null
        }
        return false
      }
    }
  }
}
</script>

<style scoped>
*{margin: 0;padding: 0;}
#box{position: absolute;left: 0;width: 200px;height: 100%;background-color: #007AFF;}
#line{width: 2px;height: 100%; background-color: #000;position: absolute; left: 200px;cursor: e-resize;}
</style>
