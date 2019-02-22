<template>
  <div>
    <div class="hello">{{world}}</div>
    <div v-html="div"></div>
    <button type="button" @click="message">catch</button>
    <input type="text" @blur="test">
  </div>
</template>

<script>
// import Cls from './cls.js'
export default {
  data () {
    return {
      world: null,
      div: null,
      arrtest: [1, 2, 3],
      jsontest: {
        name: 'a',
        vlaue: 'b'
      }
    }
  },
  created () {
    // this.hello()
    // this.div = this.echo([ 'broom', 'mop', 'cleaner' ])
    // this.resolve()
    // this.testClass()
    // this.testClass1()
    // this.testmap()
    // this.applytest()
    // this.weidugui()
    this.arr()
  },
  methods: {
    hello () {
      // let name = 'world'
      // this.world = `this is
      // : ${name}`
      // let str = 'return ' + '`hello ${name}!`'
      // let func = new Function('name', str)
      let str = (name) => `hello ${name}!`
      // let func = eval.call(null, str)
      console.log(str('jim'))
    },
    echo (data) {
      let template = `
                      <div>
                          <% for(let i=0; i < data.length; i++) { %>
                            <div><%= data[i] %></div>
                          <% } %>
                      </div>
                      `
      function compile (template) {
        const evalExpr = /<%=(.+?)%>/g
        const expr = /<%([\s\S]+?)%>/g
        template = template
          .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
          .replace(expr, '`); \n $1 \n  echo(`')
        template = 'echo(`' + template + '`);'
        let script =
          `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }
    ${template}
    return output;
  })`
        return script
      }
      function evil (fn) {
        let Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)()
      }
      let parse = evil(compile(template))
      // let parse = eval(compile(template))  // es-lint no-eval 报错
      return parse(data)
      // console.log(parse([ 'broom', 'mop', 'cleaner' ]))
    },
    message () {
      // try {
      //   addalert('Welcome guest!')
      // } catch (err) {
      //   let txt
      //   txt = 'There was an error on this page.\n\n'
      //   txt += 'Error description: ' + err.message + '\n\n'
      //   txt += 'Click OK to continue.\n\n'
      //   console.log(txt)
      // }
    },
    resolve () {
      const p = Promise.resolve('hello')
      console.log('before')
      p.then((s) => {
        console.log(s)
      })
      console.log('after')
      let promise = new Promise((resolve, reject) => {
        let aa = 'aa'
        if (typeof (aa) === 'string') {
          resolve('resolve')
        } else {
          reject(new Error('reject'))
        }
      })
      promise.then((e) => {
        console.log(e)
      }).catch((e) => {
        console.log(e)
      })
    },
    test () {
      console.log('==\n')
    },
    testClass () {
      // function Point (x, y) {
      //   this.x = x
      //   this.y = y
      // }
      // console.log(Point)
      // Point.prototype.toString = function () {
      //   return '(' + this.x + ', ' + this.y + ')'
      // }
      // console.log(Point)
      // var p = new Point(1, 2)
      // console.log(p)
      class Point {
        // constructor () {
        //   // ...
        // }
        // toString () {
        //   // ...
        // }
        // toValue () {
        //   // ...
        // }
      }
      // let p = new Point()
      // console.log(Point.toValue())
      // console.log(p)
      // 等同于
      Object.assign(Point.prototype, {
        constructor () {},
        toString () {},
        toValue () {}
      })
      // Point.prototype = {
      //   constructor () {},
      //   toString () {},
      //   toValue () {}
      // }
      let p1 = new Point()
      // let p2 = new Point()
      debugger
      // console.log(Point.toValue)
      console.log(p1)
      // Object.getPrototypeOf(p1).aaa = () => { return 'aaa' }
      // console.log(p1.aaa())
      // console.log(p2.aaa())
    },
    testClass1 () { // 私有方法 私有属性
      // class Widget {
      //
      //   // 公有方法
      //   foo (baz) {
      //     this._bar(baz);
      //   }
      //
      //   // 私有方法
      //   _bar(baz) {
      //     return this.snaf = baz;
      //   }
      //
      //   // ...
      // }
      // let C = new Widget()
      // debugger
      // console.log(C)
      // console.log(C._bar('aaa'))
      // const bar = Symbol('bar');
      // const snaf = Symbol('snaf');
      //
      // export default class myClass{
      //
      //   // 公有方法
      //   foo(baz) {
      //     this[bar](baz);
      //   }
      //
      //   // 私有方法
      //   [bar](baz) {
      //     return this[snaf] = baz;
      //   }
      //
      //   // ...
      // };
      // debugger
      // let c = new Cls()
      // console.log(c)
      // let c = new myClass()
      // const bar = Symbol('bar')
      // class Foo {
      //   constructor () {
      //     this[bar] = 42
      //   }
      //   static getPrivateValue (foo) {
      //     return foo[bar]
      //   }
      // }
      // debugger
      // Foo.getPrivateValue(new Foo()) // 42
      // class MyClass {
      //   // constructor () {
      //   //   // ...
      //   // }
      //   get prop () {
      //     return 'getter'
      //   }
      //   set prop (value) {
      //     console.log('setter: ' + value)
      //   }
      // }
      // debugger
      // let inst = new MyClass()
      //
      // inst.prop = 123
      // // setter: 123
      //
      // console.log(inst.prop)
      // // 'getter'
      // class Foo {
      //   constructor (...args) {
      //     this.args = args
      //   }
      //   * [Symbol.iterator] () {
      //     for (let arg of this.args) {
      //       yield arg
      //     }
      //   }
      // }
      //
      // for (let x of new Foo('hello', 'world')) {
      //   console.log(x)
      // }
      class Foo {
        static bar () {
          this.baz()
        }
        static baz () {
          console.log('hello')
        }
        baz () {
          console.log('world')
        }
      }
      debugger
      Foo.bar() // hello
      let F00 = new Foo()
      F00.bar() // 报错 不存在方法
    },
    testmap () {
      // let arr = ['初步接触', '确认需求', '方案/报价', '谈判审核', '暂时搁置', '赢单', '输单']
      // arr.map((e) => {
      //   console.log(e)
      // })
      // let arr2 = [
      //   {
      //     name: 'arr0',
      //     value: '00'
      //   },
      //   {
      //     name: 'arr1',
      //     value: '01'
      //   },
      //   {
      //     name: 'arr2',
      //     value: '03'
      //   },
      //   {
      //     name: 'arr4',
      //     value: '04'
      //   },
      //   {
      //     name: 'arr5',
      //     value: '05'
      //   },
      //   {
      //     name: 'arr6',
      //     value: '06'
      //   }
      // ]
      // arr2.map((e) => {
      //   console.log(e)
      // })
      // let json = map({
      //   name: 'json',
      //   value: 'js',
      //   title: 'map',
      //   id: 0,
      //   '是是是': 'ss'
      // })
      // json.map((e) => {
      //   debugger
      //   console.log(e)
      // })
    },
    weidugui () {
      function tco (f) {
        var value
        var active = false
        var accumulated = []
        return function accumulator () {
          accumulated.push(arguments)
          if (!active) {
            active = true
            while (accumulated.length) {
              value = f.apply(this, accumulated.shift())
            }
            active = false
            return value
          }
        }
      }

      var sum = tco(function (x, y) {
        if (y > 0) {
          return sum(x + 1, y - 1)
        } else {
          return x
        }
      })

      sum(1, 100000)
      // 100001
    },
    applytest () {
      function Person (name, age) {
        this.name = name
        this.age = age
      }
      /* 定义一个学生类 */
      function Student (name, age, grade) {
        Person.apply(this, arguments)
        this.grade = grade
      }
      // 创建一个学生类
      var student = new Student('zhangsan', 21, '一年级')
      console.log(student)
    },
    arr () {
      // var arr1 = [0, 1, 2]
      // var arr2 = [3, 4, 5]
      // Array.prototype.push.apply(arr1, arr2)
      // console.log(arr1)
      // const a1 = this.arrtest
      // console.log(a1)
      // this.arrtest[0] = 4
      // console.log(a1)
      // const [...a2] = this.arrtest
      // console.log(a2)
      // this.arrtest[0] = 4
      // console.log(a2)
      // const json1 = this.jsontest
      // console.log(json1)
      // this.jsontest.name = 'c'
      // console.log(json1)
      // const {...json2} = this.jsontest
      // console.log(json2)
      // console.log(this.jsontest)
      // this.jsontest.name = 'c'
      // console.log(json2)
      // console.log(this.jsontest)
      // console.log([...'回到家卡萨号地块dsda'])
      // let map = new Map([
      //   [1, 'one'],
      //   [2, 'two'],
      //   [3, 'three']
      // ])
      // console.log(map.keys())
      // let arr = [...map.keys()] // [1, 2, 3]
      // console.log(arr)
      let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
      }
      // let arrayLike = {
      //   '0': 'a',
      //   '1': 'b',
      //   '2': 'c',
      //   'q': 'e',
      //   'w': 'r',
      //   length: 5
      // }
      // // ES5的写法
      // var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
      // console.log(arr1)
      //
      // // ES6的写法
      // let arr2 = Array.from(arrayLike) // ['a', 'b', 'c']
      // console.log(arr2)
    }
  }
}
</script>

<style scoped>
</style>
