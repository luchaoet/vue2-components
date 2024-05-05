<template>
  <div class="wrapper">
		<div class="g-ai-c">
			<el-button @click="toggle = !toggle">{{ toggle ? 'hiden':'show' }} label</el-button>
			<el-button @click="label++">change label {{ label }}</el-button>
			<el-button @click="handleTest">调试</el-button>
		</div>
		<TableV2 
			:request="getList" 
			ref="singleTable"
			@selection-change="selectionChange"
			:max-height="500"
			:style="`width: 100%;`"
			:pagination-props="{background: true}"
			:border="false"
			class="g-m-t-20"
			@filter-change="filterChange"
		>
			<TableV2Colunm type="selection" width="50" fixed />
			<TableV2Colunm prop="assetId" :label="`assetId${label}`" uuid="1"  width="200" />
			<TableV2Colunm prop="creatorName" label="创建人" uuid="2"  width="200">
				<template slot="header" slot-scope="scope">{{ scope.column.label }}/{{ scope.$index }}</template>
				<template slot-scope="scope">
					lucas-{{ scope.row.creatorName}}
				</template>
			</TableV2Colunm>
			<TableV2Colunm 
				prop="connectorName" 
				label="connectorName"  
				width="200" 
				sortable 
				:filters="[
					{text: '2016-05-012016-05-012016-05-012016-05-01', value: '2016-05-01'}, 
					{text: '2016-05-02', value: '2016-05-02'}, 
					{text: '2016-05-03', value: '2016-05-03'}, 
					{text: '2016-05-04', value: '2016-05-04'},
					{text: '2016-05-05', value: '2016-05-05'},
					{text: '2016-05-06', value: '2016-05-06'},
					{text: '2016-05-07', value: '2016-05-07'},
					{text: '2016-05-08', value: '2016-05-08'},
					{text: '2016-05-09', value: '2016-05-09'},
					{text: '2016-05-10', value: '2016-05-10'},
					{text: '2016-05-11', value: '2016-05-11'},
					{text: '2016-05-12', value: '2016-05-12'},
					{text: '2016-05-13', value: '2016-05-13'},
				]"
				:filter-multiple="true"
      	:filter-method="filterHandler"
			/>
			<TableV2Colunm prop="projectName" label="projectName"  width="200" 
			:filters="[
					{text: '2016-05-01', value: '2016-05-01'}, 
					{text: '2016-05-02', value: '2016-05-02'}, 
					{text: '2016-05-03', value: '2016-05-03'}, 
					{text: '2016-05-04', value: '2016-05-04'},
					{text: '2016-05-05', value: '2016-05-05'},
					{text: '2016-05-06', value: '2016-05-06'},
					{text: '2016-05-07', value: '2016-05-07'},
					{text: '2016-05-08', value: '2016-05-08'},
					{text: '2016-05-09', value: '2016-05-09'},
					{text: '2016-05-10', value: '2016-05-10'},
					{text: '2016-05-11', value: '2016-05-11'},
					{text: '2016-05-12', value: '2016-05-12'},
					{text: '2016-05-13', value: '2016-05-13'},
				]"
				:filter-multiple="false"
			/>
			<TableV2Colunm prop="projectName" label="projectName" uuid="4" width="200">
				<template #header>1111</template>
			</TableV2Colunm>
			<TableV2Colunm prop="assetId" label="assetId" uuid="5" v-if="toggle" fixed="right"  width="200" />
		</TableV2>
	</div>
</template>

<script>
import { request } from "@/utils";
import { TableV2, TableV2Colunm } from "@/components/Table";

export default {
	components: { TableV2, TableV2Colunm },
	data() {
		return {
			toggle: false,
			label: 1,
		};
	},
	// computed: {},
	// watch: {},
	methods: {
		getList(data) {
			return request({
				url: "/console/connector/notInMeta/list?connectorScope=all&versionType=current&excludeHidden=true",
				// url: "/console/auth/project/queryAuthorizedAuthList",
				// url: "/prod-api/robot/admin/order/list?current=1&size=10",
				data,
			});
		},

		handleTest() {
			this.$refs.singleTable.clearFilter();
		},
		selectionChange(v) {
			console.log("selectionChange", v);
		},
		filterHandler(...a) {
			console.log(a);
			return true;
		},
		filterChange(v) {
			console.log(v);
		},
	},
	created() {},
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