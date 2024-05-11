```js
import createTitleDialog from "@/components/createTitleDialog";

createTitle() {
  const dialog = createTitleDialog({
    title: "创建项目",        // dialog title
    inputTitle: "项目名称",   // 输入框 label
    /**
     * 以下非必填 按需配置
    */
    inputPlaceholder: "请输入项目名称", // 输入框 placeholder 
    inputMaxlength: 10,               // 输入框 maxlength
    inputDefaultValue: "哈哈",        // 输入框 defaultValue
    inputMessage: "输入框下方位置的文本，用于格式的提示等", // 输入框 提示语
    inputValidator: (value) =>{ // 内容格式校验，非空校验默认已经做了
      if (value === "sb") {
        return "禁止输入敏感字符";
      }
    },
  }).ok((value) => {
    console.log(value);
    dialog.close();
  });
}
```