

# execCommand

execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令。处理Html数据时常用
```
document.execCommand(sCommand[,交互方式,动态参数])
```
- sCommand为指令参数（如下例中的”ForeColor”），
- 交互方式参数如果是true的话将显示对话框，如果为false的话，则不显示对话框
- 动态参数一般为一可用值或属性值（如下例中的”#BBDDCC”）。

##### 例子
指定字颜色
```
document.execCommand('ForeColor',false,'#BBDDCC'); 
```

##### 命令列表
```
1. 2D-Position 允许通过拖曳移动绝对定位的对象。  

2. AbsolutePosition 设定元素的 position 属性为“absolute”(绝对)。  

3. BackColor 设置或获取当前选中区的背景颜色。  

4. BlockDirLTR 目前尚未支持。  

5. BlockDirRTL 目前尚未支持。  

6. Bold 切换当前选中区的粗体显示与否。  

7. BrowseMode 目前尚未支持。  

8. Copy 将当前选中区复制到剪贴板。  

9. CreateBookmark 创建一个书签锚或获取当前选中区或插入点的书签锚的名称。  

10.CreateLink 在当前选中区上插入超级链接，或显示一个对话框允许用户指定要为当前选中区插入的超级链接的 URL。  

11.Cut 将当前选中区复制到剪贴板并删除之。  

12.Delete 删除当前选中区。  

13.DirLTR 目前尚未支持。  

14.DirRTL 目前尚未支持。  

15.EditMode 目前尚未支持。  

16.FontName 设置或获取当前选中区的字体。  

17.FontSize 设置或获取当前选中区的字体大小。  

18.ForeColor 设置或获取当前选中区的前景(文本)颜色。  

19.FormatBlock 设置当前块格式化标签。  

20.Indent 增加选中文本的缩进。  

21.InlineDirLTR 目前尚未支持。  

22.InlineDirRTL 目前尚未支持。  

23.InsertButton 用按钮控件覆盖当前选中区。  

24.InsertFieldset 用方框覆盖当前选中区。  

25.InsertHorizontalRule 用水平线覆盖当前选中区。  

26.InsertIFrame 用内嵌框架覆盖当前选中区。  

27.InsertImage 用图像覆盖当前选中区。  

28.InsertInputButton 用按钮控件覆盖当前选中区。  

29.InsertInputCheckbox 用复选框控件覆盖当前选中区。  

30.InsertInputFileUpload 用文件上载控件覆盖当前选中区。  

31.InsertInputHidden 插入隐藏控件覆盖当前选中区。  

32.InsertInputImage 用图像控件覆盖当前选中区。  

33.InsertInputPassword 用密码控件覆盖当前选中区。  

34.InsertInputRadio 用单选钮控件覆盖当前选中区。  

35.InsertInputReset 用重置控件覆盖当前选中区。  

36.InsertInputSubmit 用提交控件覆盖当前选中区。  

37.InsertInputText 用文本控件覆盖当前选中区。  

38.InsertMarquee 用空字幕覆盖当前选中区。  

39.InsertOrderedList 切换当前选中区是编号列表还是常规格式化块。  

40.InsertParagraph 用换行覆盖当前选中区。  

41.InsertSelectDropdown 用下拉框控件覆盖当前选中区。  

42.InsertSelectListbox 用列表框控件覆盖当前选中区。  

43.InsertTextArea 用多行文本输入控件覆盖当前选中区。  

44.InsertUnorderedList 切换当前选中区是项目符号列表还是常规格式化块。  

45.Italic 切换当前选中区斜体显示与否。  

46.JustifyCenter 将当前选中区在所在格式化块置中。  

47.JustifyFull 目前尚未支持。  

48.JustifyLeft 将当前选中区所在格式化块左对齐。  

49.JustifyNone 目前尚未支持。  

50.JustifyRight 将当前选中区所在格式化块右对齐。  

51.LiveResize 迫使 MSHTML 编辑器在缩放或移动过程中持续更新元素外观，而不是只在移动或缩放完成后更新。  

52.MultipleSelection 允许当用户按住 Shift 或 Ctrl 键时一次选中多于一个站点可选元素。  

53.Open 打开。  

54.Outdent 减少选中区所在格式化块的缩进。  

55.OverWrite 切换文本状态的插入和覆盖。  

56.Paste 用剪贴板内容覆盖当前选中区。  

57.PlayImage 目前尚未支持。  

58.Print 打开打印对话框以便用户可以打印当前页。  

59.Redo 重做。  

60.Refresh 刷新当前文档。  

61.RemoveFormat 从当前选中区中删除格式化标签。  

62.RemoveParaFormat 目前尚未支持。  

63.SaveAs 将当前 Web 页面保存为文件。  

64.SelectAll 选中整个文档。  

65.SizeToControl 目前尚未支持。  

66.SizeToControlHeight 目前尚未支持。  

67.SizeToControlWidth 目前尚未支持。  

68.Stop 停止。  

69.StopImage 目前尚未支持。  

70.StrikeThrough 目前尚未支持。  

71.Subscript 目前尚未支持。  

72.Superscript 目前尚未支持。  

73.UnBookmark 从当前选中区中删除全部书签。  

74.Underline 切换当前选中区的下划线显示与否。  

75.Undo 撤消。  

76.Unlink 从当前选中区中删除全部超级链接。  

77.Unselect 清除当前选中区的选中状态。   
```