import { Vue, Component } from 'vue-property-decorator';


/**
 * 字节对象转字符串
 * @param {Object} arr
 */
const byteToString = function(arr) {
	if (typeof arr === 'string') {
		return arr;
	}

	var str = '',
		_arr = arr;

	for (var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);

		if (v && one.length == 8) {
			var bytesLength = v[0].length;

			var store = _arr[i].toString(2).slice(7 - bytesLength);

			for (var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}

			str += String.fromCharCode(parseInt(store, 2));

			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
};

/**
 * 字符串转字节
 * @param {Object} str
 */
const string2ArrayBuffer = function(str) {
	// 首先将字符串转为16进制
	let val = '';
	for (let i = 0; i < str.length; i++) {
		if (val === '') {
			val = str.charCodeAt(i).toString(16);
		} else {
			val += ',' + str.charCodeAt(i).toString(16);
		}
	}
	// 将16进制转化为ArrayBuffer
	return new Uint8Array(
		val.match(/[\da-f]{2}/gi).map(function(h) {
			return parseInt(h, 16);
		})
	).buffer;
};
/**
 * 格式化得到aid值
 * @param {Object} buffer
 */
const ab2hex = function(buffer) {
	var hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),

		function(bit) {
			return ('00' + bit.toString(16)).slice(-2);
		}
	);
	return hexArr.join('');
};

enum HCECode {
	CODE_0 = 'OK',
	CODE_13000 = '当前设备不支持NFC',
	CODE_13001 = '当前设备支持NFC，但系统NFC开关未开启',
	CODE_13002 = '当前设备支持NFC，但不支持HCE',
	CODE_13003 = 'AID列表参数格式错误',
	CODE_13004 = '未设置微信为默认NFC支付应用',
	CODE_13005 = '返回的指令不合法',
	CODE_13006 = '注册AID失败'
}
const tab = {};
// aid
let aid = [];
// NFC实例对象
let NFCAdapter: any = null;
// NFC标签对象
let NFCTab: any = null;
@Component
export default class Index extends Vue {
	// 视图提示
	private title: string = '初始化...';
	// 视图内容
	private content: string = '';
	// 支持写入
	private isWrite: boolean = false;
	// 数据
	private id: string = '1001';
	private payload: string = 'zhouyihao';
	private type: string = '周意豪';
	private read: object = {
		id: '',
		payload: '',
		type: ''
	};

	// 初始化 NFC 模块。获取实例
	initDevice() {
		NFCAdapter = wx.getNFCAdapter();
		console.log(NFCAdapter);
		tab = {
			'ISO-DEP': NFCAdapter.getIsoDep(),
			'MIFARE Classic': NFCAdapter.getMifareClassic(),
			'MIFARE Ultraligh': NFCAdapter.getMifareUltralight(),
			NDEF: NFCAdapter.getNdef(),
			'NFC-A': NFCAdapter.getNfcA(),
			'NFC-B': NFCAdapter.getNfcB(),
			'NFC-F': NFCAdapter.getNfcF(),
			'NFC-V': NFCAdapter.getNfcV()
		};
		this.NFClistener();
	}
	//  触发监听NFG事件
	NFClistener() {
		NFCAdapter.startDiscovery({
			success: res => {
				this.title = '请将设备放入识别区NFC';
				console.log(res);
			},
			fail: error => {
				this.title = '刷新重试';
				console.error(error);
			},
			complete: res => {
				console.log(res);
			}
		});
		// 监听 NFC 标签
		NFCAdapter.onDiscovered(callback => {
			console.log('onDiscovered callback=>', callback);
			let aid = parseInt(ab2hex(callback.id), 16);
			console.log(aid);
			if (callback.messages) {
				let cordsArray = callback.messages[0].records;
				cordsArray.find(item => {
					this.read.payload = byteToString(new Uint8Array(item.payload));
					this.read.id = byteToString(new Uint8Array(item.id));
					this.read.type = byteToString(new Uint8Array(item.type));
				});
			}

			if (callback.techs.length != 0) {
				this.title = '识别成功！';
				this.content = '可支持标签：';
				callback.techs.forEach((res, index) => {
					console.log(res);
					if (index != 0) {
						this.content += '、';
					}
					this.content += res;
					// 支持写入
					if (res == 'NDEF') {
						this.isWrite = true;
					}
				});
			} else {
				this.title = '无效设备';
				console.log('无效设备');
			}
		});
	}
	/* 设备标签 */
	initTab(item): any {
		let NFCTab = tab[item];
		NFCTab.connect({
			success: res => {
				this.title = '连接设备成功';
				console.log(res);
			},
			fail: error => {
				this.title = '连接设备失败';
				console.error(error);
			},
			complete: res => {
				console.log(res);
			}
		});
		return NFCTab;
	}
	/* 获取ATQA信息 */
	getAtqa() {
		NFCTab.getAtqa({
			success: res => {
				console.log(res);
			},
			fail: error => {
				console.error(error);
			},
			complete: res => {
				console.log(res);
			}
		});
	}
	/* 获取最大传输长度 */
	getMaxTransceiveLength() {
		NFCTab.getMaxTransceiveLength({
			success: res => {
				console.log(res);
			},
			fail: error => {
				console.error(error);
			},
			complete: res => {
				console.log(res);
			}
		});
	}
	/* 获取SAK信息 */
	getSak() {
		NFCTab.getSak({
			success: res => {
				console.log(res);
			},
			fail: error => {
				console.error(error);
			},
			complete: res => {
				console.log(res);
			}
		});
	}
	/**
	 * 写入数据
	 */
	async writeData() {
		// 获取初始化标签对象——连接设备
		NFCTab = await this.initTab('NDEF');
		// 准备写入的数据
		// let data:Array<string> = new Array('maker');
		const records = [
			{
				id: string2ArrayBuffer(this.id),
				payload: string2ArrayBuffer(this.payload),
				type: string2ArrayBuffer(this.type),
				tnf: 2
			}
		];
		// 执行写入
		NFCTab.writeNdefMessage({
			records: records,
			success: res => {
				this.title = '数据写入成功';
				console.log(res);
			},
			fail: error => {
				this.title = '数据写入失败';
				console.error(error);
			},
			complete: res => {
				this.closeConnect(NFCTab);
				this.isWrite = false
				this.title = "请将设备放入识别区NFC"
				console.log(res);
			}
		});
	}
	// 关闭 连接
	closeConnect(NFCTab) {
		NFCTab.close({
			success: res => {
				this.title = '清除标签连接成功';
				console.log('清除标签连接成功');
			},
			fail: error => {
				this.title = '清除标签连接失败';
				console.error('清除标签连接失败');
			},
			complete: res => {
				console.log(res);
			}
		});
	}
	/* 取消取消监听 NFC Tag */
	closeNFC() {
		NFCAdapter.offDiscovered(callback => {});
		NFCAdapter.stopDiscovery();
	}
	onLoad() {
		this.initDevice();
	}
	onShow() {}
	onUnload() {
		this.closeNFC();
	}
	onHide() {}
}
