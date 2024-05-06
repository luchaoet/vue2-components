<template>
  <div class="wrapper">
    <SearchForm :form-items="formItems" v-model="searchValues" @change="handleChange" immediate />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
export default {
	components: { SearchForm },
	data() {
		return {
			formItems: [
				{ prop: "a", label: "名称名称", component: "input" },
				{
					prop: "b",
					label: "名称名",
					component: "select",
					options: [{ label: 11, value: 1 }],
					optionLabelKey: "label",
					optionValueKey: "value",
				},
				{
					prop: "c",
					label: "名称名称名称",
					component: "date-picker",
					valueFormat: "yyyy-MM-dd HH:mm:ss",
				},
				{ prop: "e", label: "名称名称名", component: "date-picker" },
				{
					prop: "d",
					label: "名称",
					component: "date-picker",
					type: "daterange",
				},
			],
			searchValues: { a: 11 },
		};
	},
	// computed: {},
	// watch: {},
	methods: {
		handleChange(v) {
			console.log("change", v);
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