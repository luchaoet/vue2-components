```js
import testDialog from '@/components/xxxx'

methods: {
  handleClick() {
    var dialog = testDialog({
      // 自定义参数，Dialog props中需要定义
      title: 'xxx',
      parmas1: {},
      parmas2: [],
    }).ok((a, b) => {
      // 确定按钮点击时触发，根据需要使用

      // 需要返回参数时, index.vue 中 this.$emit("ok", a, b); 返回
      // console.log(a, b)

      // 确定按钮 loading 开启
      // dialog.openOkLoading();

      // 确定按钮 loading 关闭
      // dialog.closeOkLoading();

      // 弹窗关闭
      // doalog.close();
    }).close(() => {
      // 弹窗关闭时触发，根据需要使用
    }).cancel(() => {
      // 点击弹窗取消按钮时触发，根据需要使用
    })
  }
}
```