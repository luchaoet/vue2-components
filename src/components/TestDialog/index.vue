<template>
  <el-dialog
		:title="title"
		:visible="visible"
		@close="handleClose"
	>
		<div>test</div>

		<span slot="footer" class="dialog-footer">
			<el-button type="primary" :loading="loading" @click="handleOk">确 定</el-button>
			<el-button type="ghost" @click="handleCancel">取 消</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	components: {},
	props: {
		title: {
			type: String,
			default: "dialog默认标题",
		},
		row: Array,
	},
	data() {
		return {
			visible: false,
			loading: false,
		};
	},
	created() {
		console.log("created", this.title);
	},
	mounted() {
		console.log("mounted", this.row);
	},
	methods: {
		handleClose() {
			this.$emit("close");
		},
		handleCancel() {
			this.$emit("cancel");
		},
		handleOk() {
			this.$emit("ok");
		},
	},
};
</script>

<style lang="scss" scoped>
</style>