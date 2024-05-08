<template>
  <div class="time-wrapper g-d-if g-fd-c g-p-10 g-us-n">
    <dl v-for="item of times" :key="item.label" class="g-p-0 g-m-0 g-ai-fs">
      <dt class="g-p-0 g-p-t-10 g-m-0 g-fs-0 g-d-f g-fd-c">
        <span class="g-fs-16">{{ item.label }}</span>
        <span class="g-fs-14">{{item.year}}/{{ item.month }}/{{ item.day }}</span>
      </dt>

      <dd class="g-d-f g-fd-c g-p-0 g-m-0 g-fg-1 g-mw-0">
        <ul class="g-d-f">
          <li v-for="(option, i) of item.options" :key="i" class="g-d-f g-fg-1 g-mw-0 g-fd-c">
            <span class="g-d-f g-p-l-2 g-p-tb-4">{{ `${option.hours}:00` }}</span>
            <p 
							:class="[
								'g-w-100per g-c-p g-t-i g-d-f g-fd-c g-fs-12 g-p-lr-4 g-p-tb-6 g-w-100per g-fg-1',
								{
									'is-obsoleted': option.obsoleted,
									'is-occupies': !!option.occupier,
									'is-myself': !!option.occupier && option.occupier.iphone === myIphone && option.occupier.name === myName
								}
							]"
							@click="handleSelect(option)"
						>
							<template v-if="!!option.occupier">
								<span class="g-d-b g-e-1 g-fs-14 g-lh-1 g-c-b">{{ option.occupier.name }}</span>
								<span class="g-d-b g-e-1 g-m-t-2 g-lh-1" style="color: #545965">{{ option.occupier.iphone }}</span>
								<span class="g-d-b g-e-1 g-m-t-2 g-lh-1" style="color: #545965">{{ `${option.hours}:00~${option.hours+1}:00` }}</span>
							</template>
							<span v-else class="g-w-100per g-h-100per g-jc-ai-c">
								<i class="el-icon-circle-plus g-fs-20 g-t-i" style="color: #a2c1ff;"></i>
							</span>
            </p>
          </li>
        </ul>
      </dd>
      
    </dl>
  </div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			times: [],
			myName: "哈哈哈",
			myIphone: "17681886744",

			occupier: [
				{
					name: "李三",
					iphone: "17682453965",
					year: 2024,
					month: 5,
					day: 8,
					hours: 4,
				},
				{
					name: "李三",
					iphone: "17682453965",
					year: 2024,
					month: 5,
					day: 8,
					hours: 9,
				},
				{
					name: "李三",
					iphone: "17682453965",
					year: 2024,
					month: 5,
					day: 9,
					hours: 9,
				},
			],
		};
	},

	methods: {
		init() {
			const today = new Date();
			const curYear = today.getFullYear();
			const curMonth = today.getMonth() + 1;
			const curDay = today.getDate();
			const curHours = today.getHours();

			const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
			const nextYear = tomorrow.getFullYear();
			const nextMonth = tomorrow.getMonth() + 1;
			const nextDay = tomorrow.getDate();

			this.times = [
				{
					label: "今日",
					year: curYear,
					month: curMonth,
					day: curDay,
					options: new Array(24).fill(true).map((t, i) => {
						const temp = this.occupier.find(
							(o) =>
								o.year === curYear &&
								o.month === curMonth &&
								o.day === curDay &&
								o.hours === i
						);

						if (temp) {
							temp.myself =
								temp &&
								temp.name === this.myName &&
								temp.iphone === this.myIphone;
						}

						return {
							year: curYear,
							month: curMonth,
							day: curDay,
							hours: i,
							obsoleted: i < curHours,
							occupier: temp,
						};
					}),
				},
				{
					label: "明日",
					year: nextYear,
					month: nextMonth,
					day: nextDay,
					options: new Array(24).fill(true).map((t, i) => {
						const temp = this.occupier.find(
							(o) =>
								o.year === nextYear &&
								o.month === nextMonth &&
								o.day === nextDay &&
								o.hours === i
						);
						if (temp) {
							temp.myself =
								temp &&
								temp.name === this.myName &&
								temp.iphone === this.myIphone;
						}
						return {
							year: nextYear,
							month: nextMonth,
							day: nextDay,
							hours: i,
							obsoleted: false,
							occupier: temp,
						};
					}),
				},
			];
		},
		handleSelect(data) {
			const { occupier, obsoleted, ...others } = data;
			if (obsoleted) return;
			if (occupier) {
				if (occupier.myself) {
					const index = this.occupier.findIndex((i) => {
						return (
							i.year === occupier.year &&
							i.month === occupier.month &&
							i.day === occupier.day &&
							i.hours === occupier.hours &&
							i.name === occupier.name &&
							i.iphone === occupier.iphone
						);
					});
					if (index >= 0) {
						this.occupier.splice(index, 1);
					}
				}
			} else {
				this.occupier.push({
					name: this.myName,
					iphone: this.myIphone,
					year: 2024,
					month: 5,
					day: 8,
					hours: 4,
					...others,
				});
			}
			this.init();
		},
	},
	created() {
		this.init();
	},
	mounted() {},
	// beforeCreate() {},
	// beforeMount() {},
	// beforeUpdate() {},
	// updated() {},
	// beforeDestroy() {},
	// destroyed() {},
};
</script>

<style lang="scss" scoped>
.bc-3b78f2 {
	background-color: #3b78f2;
}
.bc-f2b93a {
	background-color: #f2b93a;
}
.time-wrapper {
	max-width: 100%;
	dt {
		width: 70px;
	}
	& > dl + dl {
		border-top: 1px solid #e1e5e8;
	}
	color: #606570;
	ul {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}
	li {
		// width: 85px;
		border-left: 1px solid #e1e5e8;
		p {
			height: 58px;
			// background-color: #f2f6ff;
			border-top-width: 3px;
			border-top-style: solid;
			border-top-color: transparent;
			.el-icon-circle-plus {
				opacity: 0;
			}
			// border-top: 3px solid #3b78f2;
			// background-color: rgba(59, 120, 242, 0.4);
			&.is-obsoleted {
				cursor: not-allowed;
				background: linear-gradient(
					135deg,
					#eaeaea 25%,
					#fff 0,
					#fff 50%,
					#eaeaea 0,
					#eaeaea 75%,
					#fff 0
				);
				background-size: 35px 35px;
				opacity: 0.5;
			}
			&.is-occupies {
				cursor: not-allowed;
				background: none;
				border-top-color: rgb(242 185 58);
				background-color: rgba(242, 185, 58, 0.4);
			}
			&.is-obsoleted.is-occupies {
				opacity: 0.5;
			}
			&.is-myself {
				cursor: pointer;
				border-top-color: #3b78f2;
				background-color: rgba(59, 120, 242, 0.4);
			}
			background-color: #f2f6ff;
			&:not(.is-obsoleted):hover {
				.el-icon-circle-plus {
					opacity: 1;
				}
			}
		}
	}
}
</style>