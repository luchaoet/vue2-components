<template>
  <div class="wrapper">
    <TimeReservation />
		<el-button @click="createTitle">createTitleDialog</el-button>
  </div>
</template>

<script>
import TimeReservation from "@/components/TimeReservation";
import createTitleDialog from "@/components/createTitleDialog";
export default {
	components: { TimeReservation },
	data() {
		return {};
	},
	methods: {
		createTitle() {
			const dialog = createTitleDialog({
				title: "创建项目",
				inputPlaceholder: "请输入项目名称",
				inputMaxlength: 10,
				inputTitle: "项目名称",
				inputDefaultValue: "哈哈",
				inputMessage:
					"项目可以邀请其他团队成员加入，同一个项目内流程和授权数据共享，不同的项目之间流程和授权数据相互隔离",
				inputValidator(value) {
					if (value === "lucas") {
						return "请避名讳";
					}
				},
			}).ok((value) => {
				console.log(value);
				dialog.close();
			});
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
