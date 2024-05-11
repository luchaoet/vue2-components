<template>
	<el-form 
		ref="formRef" 
		:model="currentModel" 
		v-bind="formProps"
	>
      <el-form-item 
				v-for="({label,prop,component,rules, ...others}) of form_items" 
				:label="label" 
				:prop="prop" 
				:key="prop"
				:rules="rules"
				@submit.native.prevent
				class="form-item"
			>
				<component 
					:is="component" 
					class="w-100 g-fg-1"
					v-bind="others" 
					v-model="currentModel[prop]"
					clearable
					v-on="component === 'el-input' ? {
						input: v => input(prop, v)
					}:{
						change: v => change(prop, v)
					}"
				/>
      </el-form-item>

			<el-form-item v-if="showConfirmButton || showResetButton" class="form-item">
				<el-button v-if="showResetButton" @click="resetFields">重置</el-button>
				<el-button v-if="showConfirmButton" type="primary" @click="submitForm">提交</el-button>
			</el-form-item>
			
    </el-form>
</template>

<script>
import ElSelect from "./el-select.vue";
export default {
	components: {
		"el-select": ElSelect,
	},
	props: {
		showConfirmButton: {
			type: Boolean,
			default: false,
		},
		showResetButton: {
			type: Boolean,
			default: false,
		},
		confirmButtonText: {
			type: String,
			default: "确定",
		},
		resetButtonText: {
			type: String,
			default: "重置",
		},
		formItems: {
			type: Array,
			default: () => [],
		},
		model: Object,
		labelPosition: {
			type: String,
			default: "top",
		},
		labelWidth: String,
		labelSuffix: {
			type: String,
			default: "",
		},
		inline: Boolean,
		inlineMessage: Boolean,
		statusIcon: Boolean,
		showMessage: {
			type: Boolean,
			default: true,
		},
		size: String,
		disabled: Boolean,
		validateOnRuleChange: {
			type: Boolean,
			default: true,
		},
		hideRequiredAsterisk: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		formProps() {
			const {
				model,
				formItems,
				showConfirmButton,
				showResetButton,
				confirmButtonText,
				resetButtonText,
				...others
			} = this.$options.propsData;
			return others;
		},
		form_items() {
			const values = this.currentModel;
			return this.formItems
				.filter((i) => {
					const hide = i.hide || (() => false);
					return !hide(values);
				})
				.map((item) => {
					const { component, validator, required, hide, ...others } = item;
					// component name
					let comName = component || "input";
					if (typeof comName === "string") {
						comName = comName.indexOf("el-") === -1 ? `el-${comName}` : comName;
					}
					// rules
					const rules = [];
					if (required) {
						rules.push({
							required,
							message: item.message || `请输入${item.label}`,
							trigger: ["blur", "change"],
						});
					}
					if (validator) {
						rules.push({ validator, trigger: ["blur", "change"] });
					}
					return {
						component: comName,
						rules: rules.length ? rules : null,
						...others,
					};
				});
		},
		currentModel: {
			get() {
				return this.model || {};
			},
			set(v) {
				this.$emit("input", v);
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		validate(callback) {
			return this.$refs?.formRef?.validate(callback);
		},
		submitForm() {
			this.validate()
				.then((res) => {
					console.log(1, res);
				})
				.catch((error) => {
					console.log(2, error);
				});
		},
		resetFields() {
			this.$refs?.formRef?.resetFields();
		},
		clearValidate(...p) {
			this.$refs?.formRef?.clearValidate(...p);
		},
		validateField(...p) {
			this.$refs?.formRef?.validateField(...p);
		},

		change(key, value) {
			const values = {
				...this.currentValue,
				[key]: value,
			};
			this.currentModel = values;
		},
		input(key, value) {
			this.change(key, value);
		},
	},
};
</script>

<style lang="scss" scoped>
.w-100 {
	width: 100% !important;
}
.form-item:last-child {
	margin-bottom: 0;
}
</style>