

npm 文档： https://www.npmjs.com/package/nodemailer
github : https://github.com/nodemailer/nodemailer
文档： https://nodemailer.com/about/
参考文档：https://www.jianshu.com/p/04e596da7d33

# nodemailer

Nodemailer是一个简单易用的Node.js邮件发送组件


# Nodemailer的主要特点包括：

- 支持Unicode编码
- 支持Window系统环境
- 支持HTML内容和普通文本内容
- 支持附件(传送大附件)
- 支持HTML内容中嵌入图片
- 支持SSL/STARTTLS安全的邮件发送
- 支持内置的transport方法和其他插件实现的transport方法
- 支持自定义插件处理消息
- 支持XOAUTH2登录验证



# 安装

```
npm install nodemailer --save
```


# 使用

先上一个例子：
```
'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

```


1. 要发送电子邮件，您需要一个传输器对象

```
let transporter = nodemailer.createTransport(transport[, defaults])
```
- transporter将成为一个能够发送邮件的对象
- transport是传输配置对象，连接URL或传输插件实例
- defaults是一个定义邮件选项默认值的对象

2. 一旦你有一个运输车对象，你可以用它发送邮件：

```
transporter.sendMail(data[, callback])
```

- data定义邮件内容
- callback是一个可选的回调函数，在消息传递或失败后运行

*如果邮件包含多个收件人，则如果接受至少一个收件人，则认为该邮件已发送*



# 发出个真实的邮件

这里我使用了我的qq邮箱给163邮箱发送email。

```
const nodemailer = require('nodemailer');

// 开启一个 SMTP 连接池
let transporter = nodemailer.createTransport({
	host: 'smtp.163.com',
	secureConnection: true, // use SSL
	port: 465,   // SMTP 端口
	secure: true, // secure:true for port 465, secure:false for port 587
	auth: {
		user: 'test@163.com',
		pass: 'test' // 邮箱需要使用授权码
	}
});

// 设置邮件内容（谁发送什么给谁）
let mailOptions = {
	from: '"xiedajian 👻" <test@163.com>', // 发件人
	// to: 'xx1@qq.com, xx2@qq.com', // 收件人
	to: '172265972@qq.com', // 收件人
	subject: 'Hello ✔', // 主题
	text: '这是一封来自 Node.js 的测试邮件', // plain text body
	html: '<b>这是一封来自 Node.js 的测试邮件</b>', // html body
	// 下面是发送附件，不需要就注释掉
	attachments: [{
		filename: 'test.md',
		path: '../README.md'
	},
		{
			filename: 'content',
			content: '发送内容'
		}
	]
};

// 使用先前创建的传输器的 sendMail 方法传递消息对象
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log(`Message: ${info.messageId}`);
	console.log(`sent: ${info.response}`);
});

```


# qq邮箱设置 smtp

qq 邮箱首页 - 设置 - 账号 - POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务 - IMAP/SMTP服务 -开启

# 163邮箱设置 smtp

设置 - smtp - 授权码


# 遇到的问题

## 535 错误

认证失败：

可能是账号密码错误
链接资源池时加 ssl：secureConnection: true,
QQ 的 host 是 smtp.qq.com；163 的 host 是 smtp.163.com

## 553 错误

发件人和认证的邮箱地址不一致

auth.user 需要与 from 中的邮箱一致