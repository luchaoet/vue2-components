<template>
  <div class="home">
    <!-- <nav class="g-jc-c g-p-tb-20">
      <router-link to="/table" class="g-p-10">Table Page</router-link>
      <router-link to="/about" class="g-p-10">About Page</router-link>
    </nav> -->
    <div class="g-jc-ai-c">
      <PhoneVideo 
        name="HUAWEI nova 5 Pro" 
        stream="XSM2350407E-0"
      />
    </div>
  </div>
</template>

<script>
import PhoneVideo from "@/components/PhoneVideo";
export default {
	name: "HomeView",
	components: { PhoneVideo },
	created() {},
};
</script>

<style lang="scss" scoped>
</style>
