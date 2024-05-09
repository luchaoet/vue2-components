<template>
  <div class="filter-wrapper">
		<el-radio-group v-model="relation" @input="getValues" class="g-m-b-10">
			<el-radio label="and">满足以下所有条件</el-radio>
			<el-radio label="or">满足以下任意条件</el-radio>
		</el-radio-group>
    <div v-for="(item, index) of rules" :key="index" class="g-ai-c">
			<el-select 
				v-model="item.prop" 
				size="small" 
				:disabled="propDisabled(item)"
				class="g-fg-1 g-w-100per"
				clearable
				@change="getValues"
			>
				<el-option 
					v-for="option of labelOptions" 
					:value="option.value" 
					:label="option.label" 
					:key="option.prop" 
					:disabled="option.disabled"
				>{{ option.label }}</el-option>
			</el-select>
			<el-select 
				v-model="item.operator" 
				size="small" 
				class="g-m-lr-10 g-fg-1 g-w-100per"
				@change="getValues"
			>
				<el-option label="等于" value="eq"></el-option>
				<el-option label="不等于" value="nq"></el-option>
				<el-option label="包含" value="isContains"></el-option>
				<el-option label="不包含" value="notContains"></el-option>
			</el-select>
			<el-input 
				v-model="item.value" 
				size="small" 
				class="g-fg-1 g-w-100per"
				@input="getValues"
			/>
			<i v-if="!propDisabled(item)" class="el-icon-remove g-fs-18 g-c-p c-E95247 g-m-l-10" @click="handleClear(item, index)"></i>
			<i v-else class="el-icon-remove g-fs-18 g-c-p c-E95247 g-m-l-10 g-o-0"></i>
		</div>
		<div class="g-ai-c">
			<p class="g-ai-c g-d-if g-c-p c-4778E9" @click="handleAdd">
				<i class="el-icon-circle-plus g-fs-18 g-c-p"></i>
				<span class="g-fs-14 g-m-l-6">添加筛选条件</span>
			</p>
		</div>
  </div>
</template>

<script>
export default {
	props: {
		dataSource: {
			type: Array,
			default: () => [],
		},
		defaultValue: Object,
	},
	data() {
		return {
			data: [],
			labelOptions: [],

			relation: "and",
			rules: [],
		};
	},
	created() {
		this.init();
	},
	methods: {
		getValues() {
			const rules = this.rules
				.filter((i) => !!i.operator && !!i.prop && !!i.value)
				.map((i) => ({ ...i }));
			this.$emit("change", {
				relation: this.relation,
				rules,
			});
		},
		handleClear(data, index) {
			const prop = data.prop;
			if (prop) {
				const defaultValue =
					this.dataSource.find((i) => i.prop === prop)?.default ?? false;
				if (defaultValue) {
					this.rules[index].value = null;
				} else {
					this.rules.splice(index, 1);
				}
			} else {
				this.rules.splice(index, 1);
			}
			this.getValues();
		},
		handleAdd() {
			this.rules.push({
				prop: null,
				value: null,
				operator: null,
			});
			this.getValues();
		},
		init() {
			const labelOptions = [];
			for (const d of this.dataSource) {
				labelOptions.push({
					label: d.label,
					value: d.prop,
					disabled: d?.default ?? false,
				});
				if (d?.default) {
					this.rules.push({
						prop: d.prop,
						value: null,
						operator: "eq",
					});
				}
			}

			const { relation, rules = [] } = this.defaultValue || {};

			if (relation === "and" || relation === "or") {
				this.relation = relation;
			}

			if (rules.length) {
				for (const item of rules) {
					const index = this.rules.findIndex((i) => i.prop === item.prop);
					if (index === -1) {
						const data = this.dataSource.find((i) => i.prop === item.prop);
						if (data) {
							this.rules.push({
								prop: data.prop,
								value: item.value,
								operator: item.operator,
							});
						}
					} else {
						this.rules[index].value = item.value;
						this.rules[index].operator = item.operator;
					}
				}
			}

			this.labelOptions = labelOptions;
		},
		propDisabled({ prop }) {
			return this.dataSource.find((i) => i.prop === prop)?.default ?? false;
		},
	},
};
</script>

<style lang="scss" scoped>
.c-4778E9 {
	color: #4778e9;
}
.c-E95247 {
	color: #e95247;
}
.filter-wrapper {
	& > .g-ai-c + .g-ai-c {
		margin-top: 10px;
	}
}
</style>
