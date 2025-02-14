


const cache = {}; // 用于缓存请求的对象
const ongoingRequests = {}; // 用于跟踪正在进行的请求
const CACHE_DURATION = 5000; // 缓存有效时间，单位为毫秒
const getCacheKey = (params) => {
	// return `${new URLSearchParams(params).toString()}`; // 生成唯一的缓存键
	const { chart: { dataSource }, current, filterList, pageCode } = params; // 从params中提取需要作为缓存键的字段
	let businessKey = dataSource?.businessKey || '';
	return `${businessKey}-${current}-${JSON.stringify(filterList)}-${pageCode}`; // 生成唯一的缓存键
}

// 得到图表的更新数据
export function getUpdateChartInfo(params) {
	const cacheKey = getCacheKey(params);
	// console.log(cacheKey)
	const currentTime = Date.now();

	// 检查缓存是否有效
	if (cache[cacheKey] && (currentTime - cache[cacheKey].timestamp < CACHE_DURATION)) {
		return Promise.resolve(cache[cacheKey].response); // 返回缓存的数据
	}

	// 检查是否有正在进行的请求
	if (ongoingRequests[cacheKey]) {
		return ongoingRequests[cacheKey]; // 返回正在进行的请求的 Promise
	}

	// 创建新的请求
	const requestPromise = Vue.prototype.$dataRoomAxios.post('/bigScreen/chart/data/chart', params).then(response => {
		cache[cacheKey] = {
			response: response,
			timestamp: Date.now() // 更新缓存时间
		};
		delete ongoingRequests[cacheKey]; // 请求完成后，移除正在进行的请求
		return response; // 返回数据
	}).catch(error => {
		delete ongoingRequests[cacheKey]; // 请求失败后，移除正在进行的请求
		throw error; // 抛出错误
	});

	ongoingRequests[cacheKey] = requestPromise; // 存储正在进行的请求
	return requestPromise; // 返回请求的 Promise
}