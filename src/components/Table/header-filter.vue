<template>
	<el-popover
    placement="bottom"
    trigger="click"
    v-model="visible"
		:visible-arrow="false"
		popper-class="g-p-0"
		@show="show"
	>
		<!-- content -->
		<el-input 
			class="g-p-lr-10 g-p-t-10" 
			size="small" 
			v-model="searchKey" 
			clearable 
			placeholder="搜索" 
		/>
		<el-scrollbar v-if="multiple && _filters.length" wrap-class="el-table-filter__wrap" :max-height="240">
			<el-checkbox-group class="el-table-filter__checkbox-group" v-model="filteredValue">
				<el-checkbox
					v-for="filter in _filters"
					:key="filter.value"
					:label="filter.value"
				>{{ filter.text }}</el-checkbox>
			</el-checkbox-group>
		</el-scrollbar>
		
		<!-- <el-scrollbar v-if="!multiple" wrap-class="el-table-filter__wrap" :max-height="240">
			
		</el-scrollbar> -->

		<div v-show="!_filters?.length" class="el-select-dropdown__empty">无匹配数据</div>

		<div class="el-table-filter__bottom">
			<button :class="{'is-disabled': !filteredValue.length}" @click="handleConfirm">筛选</button>
			<button @click="handleReset">重置</button>
		</div>

		<!-- reference -->
		<span 
			slot="reference" 
			class="el-table__column-filter-trigger" 
		>
			<i class="el-icon-arrow-down"></i>
		</span>
  </el-popover>
</template>

<script>
import { Popover, Scrollbar, CheckboxGroup, Checkbox } from "element-ui";

export default {
	comments: { Popover, Scrollbar, CheckboxGroup, Checkbox },
	props: {
		filters: Array,
		filterMultiple: Boolean,
		prop: String,
		value: Array,
	},
	computed: {
		_filters() {
			const filters = this.filters || [];
			return filters.filter(({ text }) => {
				return this.searchKey ? text.indexOf(this.searchKey) >= 0 : true;
			});
		},
		multiple() {
			return true; // this.filterMultiple ?? true;
		},
	},
	data() {
		return {
			visible: false,
			searchKey: "",

			filteredValue: this.value || [],
		};
	},
	// computed: {},
	// watch: {},
	methods: {
		show() {
			this.filteredValue = this.value || [];
		},
		handleOutsideClick() {
			setTimeout(() => {
				this.visible = false;
			}, 16);
		},
		handleConfirm() {
			this.confirmFilter(this.filteredValue);
			this.handleOutsideClick();
		},
		handleReset() {
			this.filteredValue = [];
			this.confirmFilter(this.filteredValue);
			this.handleOutsideClick();
		},
		confirmFilter(v) {
			this.$emit("change", this.prop, [...v]);
		},
	},
	created() {
		// console.log(1, this.filters);
	},
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