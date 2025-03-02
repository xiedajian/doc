


# NFC 工作模式 分类

传统的NFC卡有三种模式：点对点，读卡器和卡模拟。

前两种技术使用比较广泛，比如两个手机对对碰后可以传输文件采用的是点对点模式，而把公交卡贴在手机背面就可以读出余额和交易记录采用的即是读卡器模式。

卡模拟模式则是我们所说的将手机模拟成为一张卡片，基于这种技术，NFC 结合增强安全机制能够在手机等移动设备上使用“虚拟化”智能卡。

- 读卡器模式：数据在NFC芯片中，可以简单理解成“刷标签”。NFC标签是不需要外部供电的。当支持NFC的外设向NFC读写数据时，它会发送某种磁场，而这个磁场会自动的向NFC标签供电。
- 点对点模式：与蓝牙、红外差不多，用于不同NFC设备之间进行数据交换，其有效距离一般不能超过4厘米，传输速度快
- 卡模拟模式：卡数据复制到外部，数据在支持NFC的手机或其它电子设备中，可以简单理解成“刷手机”。


## 卡模拟模式：安全芯片SE 和 HCE

NFC 的传统卡模拟是基于安全芯片SE 的卡模拟，一个带有安全芯片 SE 的NFC 卡模拟设备，当一个用户用设备靠近 NFC 终端读卡器时,设备上的 NFC 控制器直接将所有的数据送至安全芯片中。

2013年底,安卓操作系统4.4以上版本支持了HCE(host-based card emulation,主机卡模拟)技术,该技术使基于操作系统应用软件直接实现卡模拟技术成为可能,不再要求手机中必须存在安全单元。


## HCE 云化

在没有安全模块的情况下，HCE 支付方案保存芯片卡个人化数据的方式有两种 ：一种是完全以软件的加密算法来保存 ；另一种是将个人化数据保存在外部。

万事达卡与 Visa 都不约而同地选择了后者，采用将安全模块“云化”，也就是将个人化数据保存在云端，手机客户端仅提供指令传输平台的方式。

HCE 云化将带来借力发展的机遇 ：
- 大幅提高商户收银效率
- 二是为受理商户带来更多商业机会和年轻时尚的客户群。
- 三是促进手机厂商的产品销售。只要具备 NFC 功能的安卓手机都可以使用 HCE 云支付

