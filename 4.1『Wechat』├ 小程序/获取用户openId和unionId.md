

# openid




# unionId


一个微信开放平台下的相同主体的App、公众号、小程序的unionid是相同的，这样就可以锁定是不是同一个用户

微信针对不同的用户在不同的应用下都有唯一的一个openId, 但是要想确定用户是不是同一个用户，就需要靠unionid来区分

同一个微信开放平台下的相同主体的 App、公众号、小程序，如果用户已经关注公众号，或者曾经登录过App或公众号，则用户打开小程序时，开发者可以直接通过 wx.login 获取到该用户UnionID，无须用户再次授权
（解读：用户如果没有登录过app，也没有登录过公众号，也没有关注过公众号的情况下，小程序中通过 wx.login 是获取不到 unionid的）
 
UnionId 机制文档：https://developers.weixin.qq.com/miniprogram/dev/api/unionID.html

UnionID获取途径

- 绑定了开发者帐号的小程序，可以通过下面3种途径获取UnionID。

- 调用接口wx.getUserInfo，从解密数据中获取UnionID。注意本接口需要用户授权，请开发者妥善处理用户拒绝授权后的情况。

- 如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。开发者可以直接通过wx.login获取到该用户UnionID，无须用户再次授权。

- 如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。开发者也可以直接通过wx.login获取到该用户UnionID，无须用户再次授权



# 用到的API

- wx.login(obj)
- wx.getUserInfo(obj)

*注意：getUserInfo此接口有调整，使用该接口将不再出现授权弹窗，请使用<button open-type="getUserInfo"></button>*

# 坑：

我们一般都是先获取到微信的 unionid，然后再通过 unionid 去登录自己的网站，就可以关联到用户在自己网站上的 user_id，但是在小程序登录中，有时候可以获取到 unionid，有时候获取不到，在获取不到 unionid 的情况下，用户无法正常登录网站。

原因：同一个微信开放平台下的相同主体的 App、公众号、小程序，如果用户已经关注公众号，或者曾经登录过App或公众号，则用户打开小程序时，开发者可以直接通过 wx.login 获取到该用户UnionID，无须用户再次授权
（解读：用户如果没有登录过app，也没有登录过公众号，也没有关注过公众号的情况下，小程序中通过 wx.login 是获取不到 unionid的）

所有就有两种情况:

1. 一般情况，用户登录过关联的其他公众号
   
   使用 wx.login 获取code，传到后端，code换openid，unionId

   ```
      //1.login
      wx.login({
        success: function(data) {

          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              self.globalData.openid = res.data.openid
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
          })

        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })

   ```





2. 用户没有用过关联的公众号等

    这时候 wx.login 就获取不到 unionId 了。需要使用 wx.getUserInfo

    解决思路：通过带登录态的 wx.getUserInfo 获取到用户的加密数据 encryptedData 和加密算法的初始向量iv，然后将 encryptdata、iv 以及 code传给后端，后端再去通过接收到的encryptedData、iv以、code 以及之前的 session_key 解密出用户的 openid、unionid 等

    ```
      wx.getUserInfo({
        withCredentials:false,
        success:(obj)=>{
         
            wx.request({
                url: openIdUrl,
                data: {
                    code: data.code,
                    encryptedData : obj.encryptedData,
                    iv : obj.iv,
                },
                success: function(res) {
                    self.globalData.openid = res.data.openid
                },
                fail: function(res) {
                    console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                }
            })


        }
      })

    ```
 

实际项目中，需要将两种情况整合使用
  
两种方案：
 
　　第一种：（ 前端判断是否有 unionid ）wx.login 向后端上传 code 并且后端返回数据以后，前端判断返回值中是否有 unionid 或者 unionid 是否为 null，null 的情况下去调用带有用户登录态的wx.getUserInfo()，然后再将微信返回的  encryptedData 和 iv 返回给后端，后端解密出相应的信息后再返回给前端；
 
　　第二种：（ 后端判断是否有 unionid ）前端调用 wx.login(), wx.getUserInfo() ,把 code,encryptedData 和 iv 返回给后端，后端在拿到前端 code 之后去请求微信的接口拿 unionid，如果返回的 unionid 为空，再用的 encryptedData、iv以及之前的 session_key 解密出 unionid，后端解密出相应的信息后再返回给前端