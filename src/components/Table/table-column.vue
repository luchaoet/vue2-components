<script>
export default {
	name: "table-column",
	props: {
		uuid: String,
		type: {
			type: String,
			default: "default",
		},
		label: String,
		className: String,
		labelClassName: String,
		property: String,
		prop: String,
		width: {},
		minWidth: {},
		renderHeader: Function,
		sortable: {
			type: [Boolean, String],
			default: false,
		},
		sortMethod: Function,
		sortBy: [String, Function, Array],
		resizable: {
			type: Boolean,
			default: true,
		},
		columnKey: String,
		align: String,
		headerAlign: String,
		showTooltipWhenOverflow: Boolean,
		showOverflowTooltip: Boolean,
		fixed: [Boolean, String],
		formatter: Function,
		selectable: Function,
		reserveSelection: Boolean,
		filterMethod: Function,
		filteredValue: Array,
		filters: Array,
		filterPlacement: String,
		filterMultiple: {
			type: Boolean,
			default: true,
		},
		index: [Number, Function],
		sortOrders: {
			type: Array,
			default() {
				return ["ascending", "descending", null];
			},
			validator(val) {
				return val.every(
					(order) => ["ascending", "descending", null].indexOf(order) > -1
				);
			},
		},
	},
	render() {
		return null;
	},
};
</script>