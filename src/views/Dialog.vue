<template>
  <div class="wrapper">
    <el-button @click="handleClick">test</el-button>

		
  </div>
</template>

<script>
import testDialog from "@/components/TestDialog";

export default {
	components: {},
	props: {
		title: String,
	},
	data() {
		return {};
	},
	methods: {
		handleClick: () => {
			const dialog = testDialog({
				// 如果自己需要传参数 Dialog props中也是要定义的
				title: "11",
				row: [1, 2],
			})
				.ok((params) => {
					dialog.openOkLoading();
					setTimeout(() => {
						dialog.closeOkLoading();
						dialog.close();
					}, 1000);
				})
				.close(() => {
					// console.log("close");
				})
				.cancel(() => {
					// console.log("cancel");
				});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
