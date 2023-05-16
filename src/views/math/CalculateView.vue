<template>
  <a-tabs>
    <a-tab-pane key="1" tab="➕ 加法"><AdditionView /></a-tab-pane>
    <a-tab-pane key="2" tab="➖ 减法"><SubtractionView /></a-tab-pane>
    <a-tab-pane key="3" tab="✖️ 乘法"><MultiplicationView /></a-tab-pane>
    <a-tab-pane key="4" tab="➗️ 除法"><DivisionView /></a-tab-pane>
    <a-tab-pane key="5" tab="🧮 测试">
      <a-form :label-col="{ span: 3, offset: 1}">
        <a-form-item label="题型">
          <a-space>
            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
              <a-checkbox
                  v-model:checked="checkAll"
                  :indeterminate="indeterminate"
                  @change="onCheckAllChange"
              >
                全部
              </a-checkbox>
            </div>
            <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
          </a-space>
        </a-form-item>
        <a-form-item label="题数">
          <a-input-number v-model:value="size" :min="1"></a-input-number>
        </a-form-item>
        <a-form-item label="运算数">
          <a-input-number v-model:value="partNum" :min="2"></a-input-number>
        </a-form-item>
        <a-form-item label="位数">
          <a-input-number v-model:value="digitNum" :min="1"></a-input-number>
        </a-form-item>
        <a-form-item label="混合运算">
          <a-switch v-model:checked="enableMix"></a-switch>
        </a-form-item>
        <a-form-item label="及格线">
          <a-input-number v-model:value="passLine" :min="1" :max="100"></a-input-number>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="startTest">开始答题</a-button>
          <a-button @click="reset" style="margin-left: 10px">重置</a-button>
        </a-form-item>
      </a-form>
      <a-form v-if="puzzlesList.length > 0" :label-col="{ span: 4, offset: 1}">
        <a-form-item label="开始时间">{{ new Date(startTime) }}</a-form-item>
        <a-form-item v-for="(p, i) in puzzlesList" :key="p" :label="p+'🟰'" :colon="false">
          <a-input-number v-model:value="answers[i]" :disabled="score !== undefined"></a-input-number>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submit" :disabled="score !== undefined">交卷</a-button>
        </a-form-item>
      </a-form>
      <a-form v-if="scoreHis.length > 0" :label-col="{ span: 4, offset: 1}">
        <a-form-item label="历史成绩" v-if="scoreHis.length > 0">
          <a-space direction="horizontal">
            <a-typography-title
                v-for="(score, i) in scoreHis"
                :key="i"
                :type="score >= passLine ? 'success' : 'danger'"
            >
              {{ score }}
            </a-typography-title>
          </a-space>
        </a-form-item>
      </a-form>
      <a-form v-if="score !== undefined" :label-col="{ span: 4, offset: 1}">
        <a-form-item label="耗时">{{ getTimeString(endTime - startTime) }}</a-form-item>
        <a-form-item label="成绩">
          <a-typography-title
              underline
              :type="score >= passLine ? 'success' : 'danger'"
          >
            {{ score }}
          </a-typography-title>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import AdditionView from "@/components/math/AdditionView.vue";
import SubtractionView from "@/components/math/SubtractionView.vue";
import MultiplicationView from "@/components/math/MultiplicationView.vue";
import DivisionView from "@/components/math/DivisionView.vue";

export default {
  name: "CalculateView",
  components: {AdditionView, SubtractionView, MultiplicationView, DivisionView},
  data() {
    return {
      plainOptions: ['➕', '➖', '✖️', '➗'],
      indeterminate: true,
      checkAll: false,
      checkedList: ['➕'],
      size: 10,
      passLine: 60,
      partNum: 2,
      digitNum: 1,
      enableMix: false,
      puzzlesList: [],
      answers: [],
      score: undefined,
      scoreHis: [],
      startTime: undefined,
      endTime: undefined
    };
  },
  methods: {
    onCheckAllChange(e) {
      this.checkedList = e.target.checked ? this.plainOptions : [];
      this.indeterminate = false;
    },
    startTest() {
      this.score = undefined;
      this.puzzlesList = [];
      for (let i = 0; i < this.size; i++) {
        let puzzles = '';
        let operator = this.checkedList[Number((Math.random() * (this.checkedList.length - 1)).toFixed(0))];
        for (let j = 0; j < this.partNum; j++) {
          if (j > 0) {
            if (this.enableMix) {
              puzzles += ` ${this.checkedList[Number((Math.random() * (this.checkedList.length - 1)).toFixed(0))]} `
            } else {
              puzzles += ` ${operator} `
            }
          }
          for (let k = 0; k < this.digitNum; k++) {
            if (k === 0 && this.digitNum > 1) {
              puzzles += 1 + Number((Math.random() * 8).toFixed(0))
            } else {
              puzzles += (Math.random() * 9).toFixed(0)
            }
          }
        }
        this.puzzlesList.push(puzzles);
      }
      this.startTime = Date.now();
    },
    reset() {
      this.checkedList = ['➕'];
      this.size = 10;
      this.passLine = 60;
      this.partNum = 2;
      this.digitNum = 1;
      this.enableMix = false;
      this.puzzlesList = [];
      this.score = undefined;
    },
    submit() {
      this.endTime = Date.now();
      let rightCnt = 0;
      for (let i = 0; i < this.puzzlesList.length; i++) {
        const result = eval(this.puzzlesList[i]
            .replaceAll('➕', '+')
            .replaceAll('➖', '-')
            .replaceAll('✖️', '*')
            .replaceAll('➗', '/')
        )
        if (result === this.answers[i]) {
          rightCnt++;
        }
      }
      this.score = (rightCnt / this.puzzlesList.length * 100).toFixed(1)
      if (this.score.endsWith('.0')) {
        this.score = this.score.substring(0, this.score.indexOf('.0'));
      }

      this.scoreHis.push(this.score);
    },
    getTimeString(time) {
      let timeString = '';
      if (time > 1000 * 60 * 60) {
        timeString += `${Math.floor(time / (1000 * 60 * 60))} 小时`;
        time = time % (1000 * 60 * 60);
      }
      if (time > 1000 * 60) {
        timeString += `${Math.floor(time / (1000 * 60))} 分钟`;
        time = time % (1000 * 60);
      }
      timeString += `${Math.floor(time / 1000)} 秒`;
      time = time % 1000;
      timeString += `${time} 毫秒`;
      return timeString;
    },
  },
  watch: {
    checkedList(val) {
      this.indeterminate = !!val.length && val.length < this.plainOptions.length;
      this.checkAll = val.length === this.plainOptions.length;
    }
  },
}
</script>

<style scoped>

</style>
