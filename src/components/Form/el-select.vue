<template>
  <el-select v-model="currentValue" v-bind="originProps">
    <el-option 
      v-for="item of currentOptions"
      :label="item.label"
      :value="item.value"
      :key="item.value"
    />
  </el-select>
</template>

<script>
export default {
	props: {
		value: [String, Number],
		optionLabelKey: {
			type: String,
			default: "label",
		},
		optionValueKey: {
			type: String,
			default: "value",
		},
		options: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {};
	},
	computed: {
		currentValue: {
			get() {
				return this.value || null;
			},
			set(v) {
				this.$emit("input", v);
			},
		},
		currentOptions() {
			return this.options.map((i) => ({
				label: i[this.optionLabelKey],
				value: i[this.optionValueKey],
			}));
		},
		originProps() {
			const { optionLabelKey, optionValueKey, options, ...others } =
				this.$options.propsData;
			return others;
		},
	},
	// watch: {},
	methods: {},
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