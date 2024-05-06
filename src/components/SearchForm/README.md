```js
// form-items 项目配置
// immediate 是否立即触发一次
// @change 已经做了防抖
<SearchForm :form-items="formItems" v-model="searchValues" @change="handleChange" immediate />

data() {
  return {
    searchValues: {},
    formItems: [
      { prop: "name", label: "名称", component: "input" }
    ]
  }
}
```