# 问题分析：img标签的src属性只能设置url，不能设置这次请求的header。

既然这样，能不能通过别的方式先把图片下载下来然后再给img标签作展示，
相当于把src属性的下载和展示分成了两步，先调用接口获取到了数据，然后再把数据给展示出来，
也就是src里的值不是一个url地址而是一个数据流。


可以这样，首先通过Object.defineProperty定义一个authSrc属性用来替换src属性的值，
然后在window.onload里等dom加载完以后去再下载图片。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Proxy Image</title>
    <script>
        Object.defineProperty(Image.prototype, 'authsrc', {
            writable : true,
            enumerable : true,
            configurable : true
        })
        window.onload = () => {
            let img = document.getElementById('img');
            let url = img.getAttribute('authsrc');
            let request = new XMLHttpRequest();
            request.responseType = 'blob';
            request.open('get', url, true);
            request.setRequestHeader('Authorization', '凭证信息');
            request.onreadystatechange = e => {
                if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                    img.src = URL.createObjectURL(request.response);
                    img.onload = () => {
                        URL.revokeObjectURL(img.src);
                    }
                }
            };
            request.send(null);
        }
   </script>
</head>
<body>
	<img width="100" height="100" id="img" authsrc="http://threex.top/images/image_201909111450326.jpg">
</body>
</html>
```

这样虽然可以实现功能，但是每次还需要执行额外的脚本，不能在Dom加载完的时候自动去下载展示，不够优雅。


能不能自动去下载展示呢


# 方式一：通过自定义元素加载

自定义元素不太了解的可以参考这里 ![Using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)，这里还有个w3c的草案autonomous-custom-element。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Proxy Image</title>
    <script>
        let requestImage = function (url, element) {
            let request = new XMLHttpRequest();
            request.responseType = 'blob';
            request.open('get', url, true);
            request.setRequestHeader('Authorization', '凭证信息');
            request.onreadystatechange = e => {
                if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                    element.src = URL.createObjectURL(request.response);
                    element.onload = () => {
                        URL.revokeObjectURL(element.src);
                    }
                }
            };
            request.send(null);
        }

        class AuthImg extends HTMLImageElement {
            constructor() {
                super();
                this._lastUrl = '';
            }

            static get observedAttributes() {
                return ['authSrc'];
            }

            connectedCallback() {
                let url = this.getAttribute('authSrc');
                if (url !== this._lastUrl) {
                    this._lastUrl = url;
                    requestImage(url, this);
                }
                console.log('connectedCallback() is called.');
            }
        }

        window.customElements.define('auth-img', AuthImg, {extends: 'img'});
    </script>
</head>
<body>
<img width="100" height="100" is="auth-img"
     authSrc="http://threex.top/images/image_201909111450326.jpg">
</body>
</html>
```


# 方式二： 利用Node作请求转发

```
http.createServer((request, response) => {
    let config = {
        host: 'xxx.com',
        method: 'GET',
        path: request.url,
        headers: {
            Authorization: '用户凭证'
        }
    };

    let proxyRequest = http.request(config, proxyResponse => {
        proxyResponse.on('data', data => {
            response.write(data, 'image/jpg');
        });
        proxyResponse.on('end', () => {
            response.end();
        });
        response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    })

    request.on('data', data => {
        proxyRequest.write(data, 'image/jpg');
    })
    request.on('end', () => {
        proxyRequest.end();
    })
});

app.listen(port, () => {
    console.log('has start proxy server!');
})
```



# vue 组件封装

```

<template>
  <img
    width="56"
    height="39"
    ref="img"
  />
</template>
<script>
export default {
  props: {
    src: "",
  },
  mounted() {
    let img = this.$refs.img;
    console.log(img);
    let url = this.src;
    let request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("get", url, true);
    request.setRequestHeader("Authorization", "Bearer + token" );
    request.onreadystatechange = (e) => {
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
        img.src = URL.createObjectURL(request.response);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        };
      }
    };
    request.send(null);
  },
};
</script>
```