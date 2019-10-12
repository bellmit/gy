/* eslint-disable */
/**
 * @file 验证文件
 * @description 天天写验证，正则还不好管，烦不烦 。。。烦 。。。所以有了这
 * @author SuperFuhq
 */
const reg = {
  // 昵称 汉字、数字、字母、'_'组成
  nickname: {
    reg: /^[\u4e00-\u9fa5_a-zA-Z]*$/,
    regText: `汉字、字母、'_' 组成`
  },
  // 用户名 数字、字母、'_'组成
  account: {
    reg: /^[a-zA-Z0-9][a-zA-Z0-9_]{5,11}$/,
    regText: `汉字、数字、字母、'_' 组成`
  },
  // 密码 6-20个数字、字母、符号两种及以上的组成
  password: {
    reg: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
    regText: `6-20个数字、字母、符号两种及以上的组成`
  },
  // QQ号码
  qq: {
    reg: /^[1-9]\d{4,10}$/,
    regText: `QQ 号码`
  },
  // 手机号码
  mobile: {
    reg: /^1(3|4|5|7|8)\d{9}$/,
    regText: `手机号码`
  },
  // 整数
  integer: {
    reg: /^-?(0|[1-9]\d*)$/,
    regText: `整数`
  },
  // 浮点数
  float: {
    reg: /^(-?(0|[1-9]\d*))(\.\d+)?$/,
    regText: `数字`
  },
  // 支付密码
  payPwd: {
    reg: /^\d{4}$/,
    regText: '四位数字组成'
  },
  // 自由
  freedom: {
    reg: /.+/,
    regText: ''
  }
};

const VER_STR = 'verCode'; // 验证关键字
const REGS = Object.keys(reg);
const comparisons = ['equal', 'unequal']; // 对照验证

class Verify {
  constructor (option) {
    const keys = Object.keys(option).filter(key => key !== VER_STR);
    const obj = {
      status: '',
      tips: '',
      value: ''
    };
    if (option[VER_STR] && REGS.includes(option[VER_STR])) {
      Object.assign(obj, reg[option[VER_STR]]);
    } else {
      console.warn(`没有 ${option[VER_STR]} 验证类型`);
    }
    for (const key of keys) {
      obj[key] = option[key];
    }
    Object.assign(this, obj);
  }
  valueRequired () {
    this.status = '';
    this.tips = '';
    if (!this.value && !this.notRequired) {
      this.status = 'error';
      this.tips = `${this.name}不能为空`;
    }
  }
  numRange () {
    const range = this.range || [];
    if (typeof range[0] === 'number' && this.value < range[0]) {
      this.status = 'error';
      this.tips = `${this.name}不能小于${range[0]}`;
    } else if (typeof range[1] === 'number' && this.value > range[1]) {
      this.status = 'error';
      this.tips = `${this.name}不能大于${range[1]}`;
    }
  }
  strLength () {
    const range = this.length || [];
    let length = this.value.length;
    if (this.doubleByte) {
      const dblByteReg = /[\u4e00-\u9fa5]/;
      for (let i = 0; i < length; i++) {
        length += dblByteReg.test(this.value[i]) ? 1 : 0;
      }
    }
    if (range[0] && length < range[0]) {
      this.status = 'error';
      this.tips = `${this.name}不能少于${range[0]}字节`;
    } else if (range[1] && length > range[1]) {
      this.status = 'error';
      this.tips = `${this.name}不能多于${range[1]}字节`;
    }
    if (this.doubleByte && this.status && (range[0] || range[1])) {
      this.tips += '，一个汉字占两个字节';
    }
  }
  valueTest () {
    if (!this.reg.test(this.value)) {
      this.status = 'error';
      this.tips = `${this.name}不合格`;
    }
  }
  floatSize () {
    const reg = /\.(\d*)/;
    if (typeof this.floatLength === 'number') {
      const res = `${this.value}`.match(reg);
      if (res && res[1].length > this.floatLength) {
        this.status = 'error';
        this.tips = `小数点后保留 ${this.floatLength} 位`;
      }
    }
  }
  equalWith () {
    if (this.equal && this.equal.value && this.value !== this.equal.value) {
      this.status = 'error';
      this.tips = `${this.name}必须和${this.equal.name}一致`;
    }
  }
  unequalWith () {
    if (this.unequal && this.unequal.value && this.value === this.unequal.value) {
      this.status = 'error';
      this.tips = `${this.name}不能和${this.equal.name}一致`;
    }
  }
  valueOrigin () {
    if (this.status === 'success' && typeof this.origin === 'function') {
      this.status = 'waiting';
      this.origin(this);
    }
  }
  verify () {
    return this.value ? (this.status === 'success') : !!this.notRequired;
  }
  verification () {
    if (this.disabled) {
      return;
    }

    this.valueRequired();

    if (this.value) {
      if (this.status) {
        return;
      }
      // 正则验证前校验
      const beforeTest = ['numRange', 'strLength'];
      for (const func of beforeTest) {
        this[func]();
        if (this.status === 'error') {
          return;
        }
      }
      // 正则
      this.valueTest();
      // 正则验证后对比
      this.floatSize();
      if (this.status === 'error') {
        return;
      }
      for (const code of comparisons) {
        this[`${code}With`]();
        if (this.status === 'error') {
          return;
        }
        const target = this[`${code}By`];
        if (target && target.value) {
          target.verification();
        }
      }
      this.status = this.status || 'success';
      // 远程验证
      this.valueOrigin();
    }
  }
}
/**
 * @description 生成验证
 * @param {Array | Object} 目前接受数组，对象两种参数，仅有包含多个验证对象的大对象可实现等于、不等于验证
 * {
 *   name: 名称
 *   disabled: 禁用
 *   reg: 正则
 *   regText: 正则提示文字
 *   status: 状态码 ['', 'success', 'error', 'waiting']
 *   tips: 提示文字
 *   value: 值
 *   notRequired: 非必填，默认必填
 *   range: 数字范围，[10, 99] -> 数字必须在 10 到 99 之间
 *   length: 长度范围，[6, 18] -> 字符串必须 6 位以上 18 位以下
 *   isJson: 输入值是 JSON 串
 *   equal: 相等于
 *   unequal: 不等于
 *   equalBy: 被相等于，默认由添加了 equal 字段后自动生成
 *   unequalBy: 被不等于，默认由添加了 unequal 字段后自动生成
 *   origin: 远程校验，该参数是个函数，用于处理远程的返回值，第一个参数就是原对象
 * }
 */
const genVerify = (() => {
  // 验证代理
  const proxyHandle = {
    set: (target, key, value) => {
      target[key] = value;
      if (key === 'value' && !target.disVerify) {
        target.verification();
      }
      return true;
    }
  };
  return verifyList => {
    if (Array.isArray(verifyList)) {
      return verifyList.map(item => (new Proxy(new Verify(item), proxyHandle)));
    } else if (verifyList.reg instanceof RegExp) {
      return (new Proxy(new Verify(verifyList), proxyHandle));
    } else {
      const obj = {};
      Object.entries(verifyList).forEach(item => {
        obj[item[0]] = (new Proxy(new Verify(item[1]), proxyHandle));
      });
      Object.entries(obj).forEach(item => {
        comparisons.forEach(code => {
          const key = item[1][code];
          if (key && key !== item[0] && obj[key]) {
            item[1][code] = obj[key];
            obj[key][`${code}By`] = item[1];
          }
        });
      });
      return obj;
    }
  };
})();

export default genVerify;
