
```
        formOptions: {
          inline: true,
          submitBtnText: "查询",
          width: 80,
          forms: [
			  
				{
				  prop: "vehicleNo",
				  label: "车牌号",
				  placeholder: "请输入",
				  clearable: true
				},	  
				
				
			  {
			    prop: "recognitionResult",
			    label: "识别结果",
			    placeholder: "请选择",
			    clearable: true,
			    itemType: "select",
				labelKey: "label",
				valueKey: "value",
			    // default: 0,
			    options: () => [
					{label:'name',value:'xiedajian'},
					{label:'name',value:'xiedajian'},
					{label:'name',value:'xiedajian'},
				]
			  },
			  
			  

			  {
			    prop: "companyNo",
			    label: "企业名称",
			    placeholder: "请选择",
			    clearable: true,
			    itemType: "select",
			    selectUrl: "/basic/companies",
			    labelKey: "managerName",
			    valueKey: "companyNo",
			    filterable: true,
			    onData: data => {
			      if (data && data.length) {
			        this.companySelect = data.map(v => ({
			          id: v.companyNo,
			          name: v.managerName
			        }));
			      }
			    }
			  },
			  {
			    prop: ["startDate", "endDate"],
			    label: "日期范围",
			    itemType: "daterange",
			    clearable: false,
			    dayRange: 7
			  }
			  
            {
              prop: "startDate",
              label: "起始时间",
              itemType: "date",
              clearable: true,
              pickerOptions(form) {
                return {
                  disabledDate(time) {
                    const endDateVal = new Date(form.endDate).getTime();
                    if (endDateVal) {
                      return time.getTime() > endDateVal;
                    }
                  }
                };
              }
            },
            {
              prop: "endDate",
              label: "结束时间",
              itemType: "date",
              clearable: true,
              pickerOptions(form) {
                return {
                  disabledDate(time) {
                    const beginDateVal = new Date(form.startDate).getTime();
                    if (beginDateVal) {
                      return time.getTime() < beginDateVal - 86400000;
                    }
                  }
                };
              }
            }
          ]
        }
```