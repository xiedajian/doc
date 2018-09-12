

# sortable

拖动库	（不依赖jq）

官网： http://rubaxa.github.io/Sortable/

GitHub： https://github.com/RubaXa/Sortable


 sortable 是一个JavaScript库，用于在现代浏览器和触摸设备上重新排序拖放列表。

 没有jQuery。支持Meteor，AngularJS，React，Polymer，Knockout和任何CSS库，例如Bootstrap。 

## 特征

支持触摸设备和现代浏览器（包括IE9）

可以从一个列表拖动到另一个列表或在同一列表中

移动项目时的CSS动画

支持拖动手柄和可选文本（优于voidberg的html5sortable）

智能自动滚动

使用原生HTML5拖放API构建

支持任何CSS库

支持 Vue , react , angular


## 使用

npm install sortablejs --save


```
	<ul id="items">
		<li>item 1</li>
		<li>item 2</li>
		<li>item 3</li>
	</ul>




	var el = document.getElementById('items');
	var sortable = Sortable.create(el);

```

## Options

```

	var sortable = new Sortable(el, {
		group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
		sort: true,  // sorting inside list
		delay: 0, // time in milliseconds to define when the sorting should start
		touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
		disabled: false, // Disables the sortable if set to true.
		store: null,  // @see Store
		animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
		handle: ".my-handle",  // Drag handle selector within list items
		filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
		preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
		draggable: ".item",  // Specifies which items inside the element should be draggable
		ghostClass: "sortable-ghost",  // Class name for the drop placeholder
		chosenClass: "sortable-chosen",  // Class name for the chosen item
		dragClass: "sortable-drag",  // Class name for the dragging item
		dataIdAttr: 'data-id',

		forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

		fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
		fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
		fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

		scroll: true, // or HTMLElement
		scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
		scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
		scrollSpeed: 10, // px

		setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
			dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
		},

		// Element is chosen
		onChoose: function (/**Event*/evt) {
			evt.oldIndex;  // element index within parent
		},

		// Element dragging started
		onStart: function (/**Event*/evt) {
			evt.oldIndex;  // element index within parent
		},

		// Element dragging ended
		onEnd: function (/**Event*/evt) {
			var itemEl = evt.item;  // dragged HTMLElement
			evt.to;    // target list
			evt.from;  // previous list
			evt.oldIndex;  // element's old index within old parent
			evt.newIndex;  // element's new index within new parent
		},

		// Element is dropped into the list from another list
		onAdd: function (/**Event*/evt) {
			// same properties as onEnd
		},

		// Changed sorting within list
		onUpdate: function (/**Event*/evt) {
			// same properties as onEnd
		},

		// Called by any change to the list (add / update / remove)
		onSort: function (/**Event*/evt) {
			// same properties as onEnd
		},

		// Element is removed from the list into another list
		onRemove: function (/**Event*/evt) {
			// same properties as onEnd
		},

		// Attempt to drag a filtered element
		onFilter: function (/**Event*/evt) {
			var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
		},

		// Event when you move an item in the list or between lists
		onMove: function (/**Event*/evt, /**Event*/originalEvent) {
			// Example: http://jsbin.com/tuyafe/1/edit?js,output
			evt.dragged; // dragged HTMLElement
			evt.draggedRect; // TextRectangle {left, top, right и bottom}
			evt.related; // HTMLElement on which have guided
			evt.relatedRect; // TextRectangle
			originalEvent.clientY; // mouse position
			// return false; — for cancel
		},

		// Called when creating a clone of element
		onClone: function (/**Event*/evt) {
			var origEl = evt.item;
			var cloneEl = evt.clone;
		}
	});


```
