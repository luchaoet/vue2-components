<script>
import { Table, TableColumn, Pagination } from "element-ui";
import { isFunction, isObject, empty } from "./utils";
import HeaderSort from "./header-sort.vue";
import HeaderFilter from "./header-filter.vue";
import { debounce } from "lodash";

export default {
	components: {
		Table,
		TableColumn,
		Pagination,
	},
	props: {
		query: {
			type: Object,
			default: () => ({}),
		},
		paginationProps: Object,
		request: Function,
		data: Array,
		size: String,
		width: [String, Number],
		height: [String, Number],
		maxHeight: [String, Number],
		fit: {
			type: Boolean,
			default: true,
		},
		stripe: Boolean,
		border: Boolean,
		rowKey: [String, Function],
		context: {},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSummary: Boolean,
		sumText: String,
		summaryMethod: Function,
		rowClassName: [String, Function],
		rowStyle: [Object, Function],
		cellClassName: [String, Function],
		cellStyle: [Object, Function],
		headerRowClassName: [String, Function],
		headerRowStyle: [Object, Function],
		headerCellClassName: [String, Function],
		headerCellStyle: [Object, Function],
		highlightCurrentRow: Boolean,
		highlightSelectionRow: {
			type: Boolean,
			default: false,
		},
		currentRowKey: [String, Number],
		emptyText: String,
		expandRowKeys: Array,
		defaultExpandAll: Boolean,
		defaultSort: Object,
		tooltipEffect: String,
		spanMethod: Function,
		selectOnIndeterminate: {
			type: Boolean,
			default: true,
		},
		indent: {
			type: Number,
			default: 16,
		},
		treeProps: {
			type: Object,
			default() {
				return {
					hasChildren: "hasChildren",
					children: "children",
				};
			},
		},
		lazy: Boolean,
		load: Function,
	},
	data() {
		return {
			pager: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
			},
			dataSource: [],
			loading: false,
			allFilters: {},
		};
	},
	watch: {
		query: {
			immediate: true,
			deep: true,
			handler: debounce(function () {
				this.getData();
			}, 500),
		},
	},
	computed: {
		isUseDataProp() {
			return !this.request || !!this.data;
		},
		_headerCellStyle() {
			const style = {
				background: "#f8f9fa",
			};
			if (isFunction(this.headerCellStyle)) {
				const s = this.headerCellStyle();
				Object.assign(style, s);
			} else if (isObject(this.headerCellStyle)) {
				Object.assign(style, this.headerCellStyle);
			}

			return style;
		},
	},
	created() {},
	methods: {
		handleSizeChange(v) {
			this.pager.pageSize = v;
			this.pager.currentPage = 1;
			this.getData();
		},
		handleCurrentChange(v) {
			this.pager.currentPage = v;
			this.getData();
		},
		getData() {
			if (this.isUseDataProp) return;

			this.dataSource = [];
			this.loading = true;
			const query = this.query || {};
			this.request({
				...query,
				page: this.pager.currentPage,
				pageSize: this.pager.pageSize,
				isPage: true,
			})
				.then(({ data, pager }) => {
					this.dataSource = data || [];
					this.pager = pager;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		handleSortClick(event, column, givenOrder) {
			// console.log({ event, column, givenOrder });
		},
		filterChange(prop, value) {
			this.$set(this.allFilters, prop, value);
			this.$emit("filter-change", { ...this.allFilters });
		},

		// ------------ table 方法 ------------
		clearSelection(...p) {
			this.$refs?.elTable?.clearSelection(...p);
		},
		toggleRowSelection(...p) {
			this.$refs?.elTable?.toggleRowSelection(...p);
		},
		toggleAllSelection(...p) {
			this.$refs?.elTable?.toggleAllSelection(...p);
		},
		toggleRowExpansion(...p) {
			this.$refs?.elTable?.toggleRowExpansion(...p);
		},
		setCurrentRow(...p) {
			this.$refs?.elTable?.setCurrentRow(...p);
		},
		clearSort(...p) {
			this.$refs?.elTable?.clearSort(...p);
		},
		clearFilter(columnKey) {
			if (columnKey) {
				this.$set(this.allFilters, columnKey, []);
			} else {
				this.allFilters = {};
			}
			this.$emit("filter-change", { ...this.allFilters });
		},

		doLayout(...p) {
			this.$refs?.elTable?.doLayout(...p);
		},
		sort(...p) {
			this.$refs?.elTable?.sort(...p);
		},
	},
	render(h) {
		const {
			isUseDataProp,
			_events,
			$props,
			$slots,
			loading,
			pager,
			data,
			_headerCellStyle,
			dataSource,
			handleSizeChange,
			handleCurrentChange,
			filterChange,
			allFilters,
		} = this;

		// 事件
		const { "filter-change": _, ...on } = _events;

		const children = ($slots.default || []).filter(
			(i) => i?.tag?.indexOf("table-column") >= 0
		);
		if (children.length === 0) return null;

		const { paginationProps = {}, ...tableProps } = $props;

		return (
			<div class="table-wrapper" v-loading={loading}>
				{dataSource.length}
				<el-table
					ref="elTable"
					on={on}
					props={{
						...tableProps,
						data: isUseDataProp ? data : dataSource,
						headerCellStyle: _headerCellStyle,
					}}
				>
					{children.map((Vnode, $index) => {
						const { componentOptions, data } = Vnode;
						const header = data?.scopedSlots?.header;
						const scopedSlots = data?.scopedSlots?.default;
						const propsData = componentOptions.propsData;
						const slotsDefault = componentOptions?.children;
						const key = `${$index}-${JSON.stringify(propsData)}`;

						const {
							sortable,
							filters = [],
							filterMethod = empty,
							filterMultiple,
							...props
						} = propsData;

						const hasSort = sortable === "" || !!sortable;
						const hasFilter = !!filters?.length;

						return h(TableColumn, {
							key,
							props,
							scopedSlots: {
								default:
									scopedSlots || slotsDefault
										? function (scope) {
												return (
													scopedSlots?.(scope) ||
													slotsDefault ||
													scope.row[propsData.prop] ||
													null
												);
										  }
										: null,
								header: () => {
									const isHighlight =
										!!this.allFilters?.[propsData.prop]?.length;
									return [
										h(
											"div",
											{
												class: ["g-d-ib", { highlight: isHighlight }],
											},
											header?.({ column: propsData, $index }) || propsData.label
										),
										hasSort && h(HeaderSort, { props: {} }),
										hasFilter &&
											h(HeaderFilter, {
												props: {
													prop: propsData.prop,
													filters,
													filterMultiple,
													value: allFilters[propsData.prop],
												},
												on: {
													change: filterChange,
												},
											}),
									];
								},
							},
						});
					})}
				</el-table>
				{!isUseDataProp ? (
					<div class="g-p-20 g-jc-fe">
						<el-pagination
							on-size-change={handleSizeChange}
							on-current-change={handleCurrentChange}
							current-page={pager.currentPage}
							page-sizes={[20, 50, 100, 200]}
							page-size={pager.pageSize}
							layout="total, sizes, prev, pager, next, jumper"
							total={Number(pager.total)}
							props={{ ...paginationProps }}
						/>
					</div>
				) : null}
			</div>
		);
	},
};
</script>

<style lang="scss" scoped>
.table-wrapper {
	width: 100%;
}
.highlight {
	color: #409eff;
}
</style>