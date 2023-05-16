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
    <a-tab-pane key="2" tab="测试">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="起始字母">
              <a-select v-model:value="startIndex" :options="startLetters"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="终止字母">
              <a-select v-model:value="endIndex" :options="endLetters"></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="text-align: center; margin-top: 20px">
          <a-col :span="24">
            <button class="letter-box test">
              {{ testLetter }}
            </button>
          </a-col>
          <a-col :span="12">
            <a-button @click="randomTest" size="large" type="primary">Random</a-button>
          </a-col>
          <a-col :span="12">
            <a-button @click="playAudio(this.testLetter)"><sound-two-tone /></a-button>
          </a-col>
        </a-row>
        <a-row style="text-align: center; margin-top: 50px">
          <a-col :span="12">测试次数：{{ testCount }}</a-col>
          <a-col :span="12">
            <a-button @click="this.testCount = 0">clear</a-button>
          </a-col>
        </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import {useBreadItem} from "@/stores/breadItem";
import { SoundTwoTone } from '@ant-design/icons-vue';

export default {
  name: "LetterView",
  components: {
    SoundTwoTone,
  },
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      audioUrl: '',
      lowercase: "abcdefghijklmnopqrstuvwxyz".split(''),
      uppercase:  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
      testLetter: '',
      testCount: 0,
      startLetters: [],
      endLetters: [],
      startIndex: undefined,
      endIndex: undefined,
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
    },
    randomTest() {
      const dif = this.endIndex - this.startIndex;
      const testIndex = Number((dif * Math.random()).toFixed(0));

      const type = Math.random().toFixed(0)
      if (type === '0') {
        this.testLetter = this.uppercase[this.startIndex + testIndex];
      } else {
        this.testLetter = this.lowercase[this.startIndex + testIndex];
      }
      this.testCount++;
    },
  },
  beforeMount() {
    const items = useBreadItem();
    items.set({ name: '英语', href: 'english'}, '字母');

    for (const l in this.uppercase) {
      this.startLetters.push({
        label: this.uppercase[l],
        value: Number(l),
      })
    }
  },
  mounted() {
    this.startIndex = 0;
    this.endIndex = this.uppercase.length - 1;
  },
  watch: {
    startIndex(si) {
      this.endLetters = [];
      for (let i=si; i<this.uppercase.length; i++) {
        this.endLetters.push({
          label: this.uppercase[i],
          value: i,
        })
      }
      if (this.startIndex > this.endIndex) {
        this.endIndex = this.uppercase.length - 1;
      }
    }
  }
}
</script>

<style scoped>
.letter-box {
  width: 200px;
  height: 200px;
  margin: 20px;
  border: solid 1px #d9d9d9;
  font-size: 50px;
  line-height: 200px;
  text-align: center;
  /*background-image: url("/item-bg.jpg");*/
  background: var(--image-background);
  background-size: var(--image-background-size);
  color: #000;
}
.letter-box:hover{
  border-color: #40a9ff;
  color: #40a9ff;
}
.letter-box.test{
  font-size: 100px;
}
</style>
