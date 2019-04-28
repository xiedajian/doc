
angular的口号，一套框架，多个平台

为了实现跨平台，就必须磨平兼容性，所有angular统一了API接口，定义了一些抽象类，

Render
RootRender
ElementRef
TemplateRef
ViewREf
ComponentRef
ViewContainerRef


# ElementRef

应用层不能直接操作dom（因为不同平台）情况不同，所有通过中间层ElementRef来封装不同平台中的native元素（浏览器端就是指dom）

```
export class ElementRef{
	
	public nativeElemet:ang;
	
	constructor(nativeElement:any){
		this.nativeElement=nativeElement;
	}
}
```

简单应用，改变div元素的背景颜色

```
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <div>Hello {{ name }}</div>
  `,
})
export class AppComponent {

  name: string = 'Semlinker';
  //在构造函数会导致获取不到，因为构造函数时候，页面子元素还没有创建
  constructor(private elementRef: ElementRef) {
    let divEle = this.elementRef.nativeElement.querySelector('div');
    console.dir(divEle);
	//divEle .style.backgroundColor = 'red';
  }
}
```

