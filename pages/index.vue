<template>
  <div class="min-h-[100vh] w-full flex justify-center items-center bg-blue-100">
    <div class="w-[400px] h-[500px] flex flex-col items-center bg-red-100">
      <h1>○☓ゲーム</h1>
      <div class="h-[50px] bg-red-600">
        <h2 class="" v-if="winner">{{`${gameResult}`}}</h2>
      </div>
      <section class="my-5">
        <div
          :class="`flex w-[300px] h-[100px] ${col !== 3 && `border-b-2 border-gray-500`}`"
          v-for="col in 3"
          :key="col"
        >
          <div
            v-for="row in 3"
            :key="`${col}-${row}`"
            :id="`${col}-${row}`"
            :class="`${row !== 3 && `border-r-2 border-gray-500`} text-6xl w-1/3 flex justify-center items-center cursor-pointer square`"
            @click="clickSquare"
          >
          </div>
        </div>
      </section>
      <button @click="reset" class="bg-green-100 rounded px-3 py-1">リセット</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import Row from "~/components/div.vue";

@Component({
  components: {
    // Row,
  },
})
class Index extends Vue {
  elSquare: HTMLDivElement[] = []
  mounted() {
    const htmlCollection = document.getElementsByClassName(`square`)
    this.elSquare = Array.from(htmlCollection) as HTMLDivElement[]
  }

  winner: string = ""
  get gameResult() {
    if(this.winner === "引き分け") return this.winner
    return `${this.winner}の勝ち`
  }

  counter = 0
  reset() {
    this.winner = ""
    this.counter = 0;
    this.elSquare.forEach(el => {
      el.innerText = "";
    })
  }

  // 勝ちパターン
  winningConditions = [
    ["1-1", "1-2", "1-3"],
    ["1-1", "2-2", "3-3"],
    ["1-1", "2-1", "3-1"],
    ["1-2", "2-2", "3-2"],
    ["1-3", "2-3", "3-3"],
    ["1-3", "2-2", "3-1"],
    ["2-1", "2-2", "2-3"],
    ["3-1", "3-2", "3-3"],
  ]

  judge() {
    const squareState: Record<string, string> = this.elSquare.reduce((acc, next) => {
      return {...acc, [next.id]: next.innerText}
    }, {})

    let blankSquareNum = 0;
    Object.values(squareState).forEach(el => {
      if(el === "") blankSquareNum += 1;
    })

    const winner: string[] | [] =  this.winningConditions.map(el => {
      return el.map(key => {
        return squareState[key]
      })
      .reduce((acc, next) => {
        if(acc === next) {
          return next
        }
        return ""
      })
    })
    .filter(el => el !== "");

    if(!blankSquareNum) {
      if(winner[0]) return winner[0]
      return '引き分け';
    }
    return winner[0]
  }

  clickSquare(e: Event) {
    if(this.winner) return
    const el = e.target as HTMLDivElement
    if (el.innerText !== "") return;
    if (this.counter % 2 === 0) {
      el.innerText = "○";
    } else {
      el.innerText = "☓";
    }
    this.counter += 1;

    const result = this.judge()
    if(result) {
      this.winner = result
    }
  }

}

export default Index;
</script>
