<template>
  <div @click="click"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class Square extends Vue {
  @Prop({ type: Number, required: true })
  counter!: number;

  click(e: Event) {
    const el = e.target as HTMLDivElement;
    const id = el.id;
    // if (el.innerText !== "") return;
    // if (this.counter % 2 === 0) {
    //   el.innerText = "○";
    // } else {
    //   el.innerText = "☓";
    // }
    // this.$emit(`countUp`);
  }
}

export default Square;
</script>
