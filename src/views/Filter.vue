<template>
  <div class="wrapper">
    <SearchForm :form-items="formItems" v-model="searchValues" @change="handleChange" immediate class="g-m-b-40" />
		<JsonGenerator :dataSource="dataSource" />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
import JsonGenerator from "@/components/JsonGenerator";
export default {
	components: { SearchForm, JsonGenerator },
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

			dataSource: [
				{
					label: "标签",
					prop: "label",
					options: [
						{ label: 1, value: 1 },
						{ label: 2, value: 3 },
					],
				},
				{
					label: "设备号",
					prop: "op",
				},
				{
					label: "身份证号码",
					prop: "idCard",
				},
			],
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