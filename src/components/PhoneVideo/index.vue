<template>
  <div class="wrapper" :style="style">
    <video ref="videoRef" autoplay muted></video>
  </div>
</template>

<script>
import mpegts from "mpegts.js";
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
		this.$nextTick(() => {
			if (mpegts.getFeatureList().mseLivePlayback) {
				const flvPlayer = mpegts.createPlayer({
					type: "flv",
					isLive: true,
					url: `https://flv-1.xsnewmedia.com/live?port=1935&app=demo&stream=${this.stream}`,
				});
				this.flvPlayer = flvPlayer;
				flvPlayer.attachMediaElement(this.$refs.videoRef);
				flvPlayer.load();
				flvPlayer.play();
			}
		});
	},
	beforeDestroy() {
		this.flvPlayer && this.flvPlayer.destroy();
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
