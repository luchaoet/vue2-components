<template>
  <div class="wrapper">
    <div v-for="item of form" :key="item.prop" class="g-d-f">
			<el-input v-model="item.prop" size="small" readonly class="g-fg-1 g-w-100per"></el-input>
			<el-select size="small" class="g-m-lr-10 g-fg-1 g-w-100per"></el-select>
			<el-input v-model="item.prop" size="small" class="g-fg-1 g-w-100per"></el-input>
		</div>
  </div>
</template>

<script>
export default {
	props: {
		dataSource: Array,
	},
	data() {
		return {
			form: [{ prop: "label", value: 1 }],
		};
	},

	created() {},
};
</script>

<style lang="scss" scoped>
</style>
