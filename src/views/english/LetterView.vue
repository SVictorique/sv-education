<template>
  <a-tabs>
    <a-tab-pane key="1" tab="学习">
      <audio id="audio-player" :src="audioUrl" autoplay="false"></audio>
      <a-row>
        <button
            class="letter-box"
            v-for="(char, index) in uppercase"
            :key="char"
            @click="playAudio(char)"
        >
          {{char}} {{lowercase[index]}}
        </button>
      </a-row>
    </a-tab-pane>
    <a-tab-pane key="2" tab="测试"></a-tab-pane>
  </a-tabs>
</template>

<script>
import {useBreadItem} from "@/stores/breadItem";

export default {
  name: "LetterView",
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      audioUrl: '',
      lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
  },
  methods: {
    playAudio(letter) {
      const url = `${this.baseUrl}/audio/letters/${letter.toUpperCase()}.wav`
      const audio = document.getElementById('audio-player')
      if (this.audioUrl === url) {
        audio.play()
      } else {
        this.audioUrl = url;
        audio.oncanplay = () => {
          audio.play()
        };
      }
    }
  },
  beforeMount() {
    const items = useBreadItem()
    items.set('英语', '字母')
  }
}
</script>

<style scoped>
.letter-box {
  width: 200px;
  height: 200px;
  margin: 20px;
  border: solid 1px #d9d9d9;
  background-color: #ffffff;
  font-size: 50px;
  line-height: 200px;
  text-align: center;
}
.letter-box:hover{
  border-color: #40a9ff;
  color: #40a9ff;
}
</style>
