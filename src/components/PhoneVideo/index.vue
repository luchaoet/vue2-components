<template>
  <div class="g-d-f">
		<div class="wrapper" :style="style">
			<video ref="videoRef" autoplay muted></video>
		</div>
		<div class="g-fd-c">
			<el-button>返回</el-button>
			<el-button>返回桌面</el-button>
			<el-button>应用列表</el-button>
		</div>
	</div>
</template>

<script>
import mpegts from "mpegts.js";
import { request } from "@/utils";

export default {
	props: {
		name: String,
		stream: String,
	},
	data() {
		return {
			resolvingPower: {
				"HUAWEI nova 5 Pro": {
					width: 1080,
					height: 2340,
				},
			},
			flvPlayer: null,
		};
	},
	computed: {
		style() {
			const { width, height } = this.resolvingPower[this.name];
			return {
				width: (width / 10) * 3 + "px",
				height: (height / 10) * 3 + "px",
			};
		},
	},
	created() {
		this.getMobileList();
		this.$nextTick(() => {
			if (mpegts.getFeatureList().mseLivePlayback) {
				const flvPlayer = mpegts.createPlayer({
					type: "flv",
					isLive: true,
					url: `https://flv-0.xsnewmedia.com/live?port=1935&app=demo&stream=${this.stream}`,
				});
				this.flvPlayer = flvPlayer;
				flvPlayer.attachMediaElement(this.$refs.videoRef);
				flvPlayer?.load();
				flvPlayer?.play();
			}
		});
	},
	beforeDestroy() {
		this.flvPlayer && this.flvPlayer.destroy();
	},
	methods: {
		touch(data) {
			request({
				url: "/prod-api/robot/device/touch",
				method: "post",
				data,
			}).then((res) => {
				console.log(res);
			});
		},
		getMobileList() {
			request({
				url: "/prod-api/robot/mobile/list",
				method: "get",
				data: {
					queryTaskData: true,
					queryUserData: true,
					queryDeviceData: true,
					size: 10,
					current: 1,
					total: 2730,
				},
			}).then((res) => {
				console.log(res);
			});
		},
		// https://zk.xsnewmedia.com/prod-api/robot/mobile/list?queryTaskData=true&queryUserData=true&queryDeviceData=true&size=10&current=1&total=2730
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	display: inline-flex;
	flex-shrink: 0;
	video {
		width: 100%;
		height: 100%;
	}
}
</style>
