<template>
  <div class="form-wrapper">
		model: {{ model }}
    <Form 
			:form-items="formItems" 
			:model="model" 
			label-width="100px"
			ref="formRef"
		/>
		<el-button @click="validator">校验</el-button>
  </div>
</template>

<script>
import Form from "@/components/Form";
export default {
	components: {
		Form,
	},
	data() {
		return {
			model: {},
			formItems: [
				{
					label: "名称",
					prop: "name",
					component: "input",
					required: true,
					hide: (values) => values.tag === "lucas",
				},

				{
					label: "标签包名称",
					prop: "tag",
					component: "input",
					required: true,
					validator: (rule, value, callback) => {
						// console.log(rule, value, callback)
						if (value == 1) {
							callback("hahah");
						} else {
							callback();
						}
					},
				},
				{
					label: "代理商",
					prop: "aid",
					component: "select",
					required: true,
					options: [
						{ name: "sb1", id: "sb1" },
						{ name: "sb2", id: "sb2" },
					],
					optionLabelKey: "name",
					optionValueKey: "id",
				},
				{
					label: "时间",
					prop: "time",
					component: "date-picker",
				},
			],
		};
	},
	// computed: {},
	// watch: {},
	methods: {
		validator() {
			this.$refs.formRef.validate((...p) => {
				console.log(1, ...p);
			});
		},
	},
	// created() {},
	// mounted() {},
	// beforeCreate() {},
	// beforeMount() {},
	// beforeUpdate() {},
	// updated() {},
	// beforeDestroy() {},
	// destroyed() {},
};
</script>

<style lang="scss" scoped>
</style>