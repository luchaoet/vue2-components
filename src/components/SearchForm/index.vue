<template>
  <div class="wrapper">
    <div 
			v-for="({
				prop,
				label,
				component, 
				options, 
				optionLabelKey = 'label', 
				optionValueKey='value',  
				...others
			}) of _formItems" 
			:key="prop" 
			class="g-ai-c"
		>
			<span class="g-fs-0 g-m-r-10">{{label}}</span>
			<component 
				:is="component" 
				class="g-w-100per g-fg-1" 
				v-bind="others" 
				v-model="currentValue[prop]" 
				clearable
				:size="size"
				v-on="component === 'el-input' ? {
					input: v => input(prop, v)
				}:{
					change: v => change(prop, v)
				}"
			>
				<template v-if="!!options?.length">
					<el-option 
						v-for="item of options" 
						:label="item[optionLabelKey]" 
						:value="item[optionValueKey]" 
						:key="item[optionValueKey]"
					></el-option>	
				</template>
			</component>

		</div>
		<div class="">
			<el-button type="primary" @click="reset">重置</el-button>
		</div>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
	components: {},
	props: {
		value: Object,
		formItems: Array,
		size: String,
		immediate: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		_formItems() {
			return this.formItems.map((item) => {
				const component =
					item.component.indexOf("el-") === 0
						? component
						: "el-" + item.component;
				return {
					...item,
					component,
				};
			});
		},
		currentValue: {
			get() {
				const value = this.value || {};
				return { ...value };
			},
			set(v) {
				this.$emit("input", v);
			},
		},
		emptyValues() {
			const values = {};
			for (const item of this.formItems || []) {
				values[item.prop] = null;
			}
			return values;
		},
	},
	data() {
		return {
			values: {
				...(this.defaultValue || {}),
			},
		};
	},
	methods: {
		reset() {
			const values = this.emptyValues;
			const isChange = Object.keys(values).some((key) => {
				const newVal = values[key] || null;
				const oldVal = this.currentValue[key] || null;
				return newVal !== oldVal;
			});

			if (isChange) {
				this.$emit("change", values);
				this.currentValue = values;
			}
		},
		change(key, value) {
			const values = {
				...this.emptyValues,
				...this.currentValue,
				[key]: value,
			};
			this.currentValue = values;
			this.emitChange();
		},
		emitChange: debounce(function () {
			this.$emit("change", this.currentValue);
		}, 500),
		input(key, value) {
			this.change(key, value);
		},
	},
	created() {
		if (this.immediate) {
			this.$emit("change", {
				...this.emptyValues,
				...this.currentValue,
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}
:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
	width: 100%;
}
</style>