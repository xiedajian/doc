<template>
  <!-- 新的：接口对其了H5 -->
  <view class="content" :style="{height,width}">
    <!-- #ifdef APP-PLUS || H5 -->
    <view @click="echarts.onClick" :rOption="rOption" :change:rOption="echarts.messageChanged" style="height: 100%;width: 100%;" :prop="option"
      :change:prop="echarts.updateEcharts" :id="canvasId"></view>
    <!-- #endif -->

  </view>
</template>
 
<script>

let ctx;
let chart;
function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}
export default {
  props: {
    canvasId: {
      type: String,
      default: 'ec-canvas',
    },
    ec: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
    },
 
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '500rpx',
    },
  },
  computed: {
    eOption() {
      return JSON.stringify(this.option);
    },
  },
  data() {
    return {
      isUseNewCanvas: true,
      rOption: null,
      // chart: null,
    };
  },
 
  mounted() {
    // #ifdef APP-PLUS || H5
    this.$nextTick(() => {
      this.rOption = {
        canvasId: this.canvasId,
        ...this.option,
      };
    });
    //  #endif
  },
  methods: {


    touchStart(e) {
    },
    setOption(option) {
      // #ifndef APP-PLUS || H5
      chart.setOption(option);
      //  #endif
      // #ifdef APP-PLUS || H5
      this.rOption = { ...option };
      //  #endif
    },
    touchMove(e) {
    },
    touchEnd(e) {
    },
 
    onViewClick(e) {
    },
  },
};
</script>
 
 
 
<script module="echarts" lang="renderjs">
	// #ifdef  APP-PLUS || H5
	import * as echarts from 'echarts'
 
 
 
	let myChart
	export default {
		data() {
			return {
				Coption: null,
				CcanvasId: null,
				// chart: null
			}
		},
		mounted() {
			// #ifdef  APP-PLUS || H5
			// this.$nextTick(() => {
			// 	this.initl()
			// })
			// #endif
 
		},
		methods: {
 
			initl() {
				// console.log('app&H5')
			},
			initEcharts() {
				myChart = echarts.init(document.getElementById(this.CcanvasId))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.Coption)
	
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
 
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			},
			messageChanged(newVal, oldVal, ins, vm) {
				if(newVal.canvasId){
					this.CcanvasId = newVal.canvasId
					delete newVal.canvasId
					this.Coption = newVal
					this.initEcharts()
				}else{
					myChart.setOption(newVal)
				}
				
			}
		}
	}
	// #endif
</script>
