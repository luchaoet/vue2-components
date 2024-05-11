<template>
  <el-dialog
		:title="title"
		:visible="visible"
		@close="handleClose"
		width="500px"
	>
		<div v-if="inputTitle" class="color-333 g-lh-22 g-fs-14 g-fw-b g-m-b-8">{{inputTitle}}</div>
		<div :class="['el-form-item g-m-b-0', {'is-error': !!errorMessage}]">
			<el-input 
				ref="inputRef"
				v-model="inputValue" 
				autofocus
				:placeholder="inputPlaceholder" 
				:size="inputSize"
				:show-word-limit="true"
				type="text"
				:maxlength="inputMaxLength"
				@input="handleInputChange"
				@keyup.enter.native="handleOk"
			/>
		</div>
		<p v-if="errorMessage" class="el-form-item__error g-p-r g-p-t-4">{{errorMessage}}</p>
		<p v-if="inputMessage" class="g-m-t-8 g-fs-12 color-666 g-lh-20">{{inputMessage}}</p>

		<span slot="footer" class="dialog-footer">
			<el-button type="ghost" @click="handleCancel">取 消</el-button>
			<el-button type="primary" :loading="loading" @click="handleOk">确 定</el-button>
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
</style>