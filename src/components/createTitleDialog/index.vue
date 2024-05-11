<template>
  <el-dialog
		:title="title"
		:visible="visible"
		@close="handleClose"
		width="500px"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
	>
		<div v-if="inputTitle" class="color-333 g-lh-22 g-fs-14 g-fw-b g-m-b-8">{{inputTitle}}</div>
		<div :class="['el-form-item g-m-b-0', {'is-error': !!errorMessage}]">
			<el-input 
				ref="inputRef"
				v-model="inputValue" 
				autofocus
				:placeholder="inputPlaceholder" 
				:size="inputSize"
				show-word-limit
				type="text"
				clearable
				:maxlength="inputMaxLength"
				@input="handleInputChange"
				@keyup.enter.native="handleOk"
			/>
		</div>
		<p v-if="errorMessage" class="el-form-item__error g-p-r g-p-t-4">{{errorMessage}}</p>
		<p v-if="inputMessage" class="g-m-t-8 g-fs-12 color-666 g-lh-20">{{inputMessage}}</p>

		<span slot="footer" class="dialog-footer">
			<el-button type="ghost" @click="handleCancel" size="medium">取 消</el-button>
			<el-button type="primary" :loading="loading" @click="handleOk" size="medium">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	components: {},
	props: {
		title: String,
		inputDefaultValue: {
			type: String,
			default: "",
		},
		inputTitle: String,
		inputMessage: String,
		inputValidator: Function,
		inputSize: String,
		inputMaxLength: Number,
		inputPlaceholder: {
			type: String,
			default: "请输入",
		},
	},
	data() {
		return {
			visible: false,
			loading: false,

			errorMessage: "",
			inputValue: this.inputDefaultValue,
		};
	},
	created() {},
	mounted() {},
	methods: {
		handleClose() {
			this.$emit("close");
		},
		handleCancel() {
			this.$emit("cancel");
		},
		async handleOk() {
			const error = await this.handleInputChange();
			if (error) return;
			if (
				!!this.inputDefaultValue &&
				this.inputDefaultValue === this.inputValue
			) {
				return (this.visible = false);
			}
			this.loading = true;
			this.$emit("ok", this.inputValue);
		},

		async handleInputChange() {
			if (!this.inputValue) {
				return (this.errorMessage = `请输入${this.inputTitle}`);
			}
			const error = await this?.inputValidator?.(this.inputValue);
			this.errorMessage = error;
			return error;
		},
	},
};
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
	padding: 16px 24px;
	box-shadow: inset 0 -1px #eee;
}
:deep(.el-dialog__body) {
	padding: 20px 30px 24px;
	background: #f5f6f7;
}
:deep(.el-dialog__footer) {
	padding: 20px 24px;
	box-shadow: inset 0 1px #eee;
}
</style>