<template>
    <div class="remote">
        <component :is="currentView" v-bind="$props"/> 
    </div>
</template>
<script>
import Axios from 'axios';
import '@/utils/less.min';


export default {
    props:{
        url:{
            type:String,
            default(){
                return null;
            }
        }
    },
    data(){
        return {
            resData:null,
            cssId:null,
        }
    },
    computed:{
        currentView(){
            if(!this.resData)return {template:"<div class='remoteInfo'>正在加载中。。。</div>"};
            const tplData = this.resolveStr(this.resData);
            let ponentObj = new Function(`return ${tplData.sctipts.slice(tplData.sctipts.indexOf('{'),tplData.sctipts.lastIndexOf('}')+1)}`)();
            ponentObj.template = tplData.templates;
            this.$el.setAttribute('class',`remote css${this.cssId}`);
            if(!document.querySelector(`style[id=css${this.cssId}]`)){//防止重复创建
                let cssStr = `
                    .css${this.cssId}{
                        ${tplData.styles}
                    }
                `;
                this.resolveCss(cssStr);
            }
            return ponentObj;
        }
    },
    watch:{
        url(){
            this.getData();
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getId() {
            var d = new Date().getTime();
            var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
            return uid;
        },
        resolveCss(lessInput){
            less.render(lessInput).then(function(output) {
                let style = document.createElement("style");
                style.setAttribute("type", "text/css");
                style.setAttribute("id",'css' + this.cssId);
                if(style.styleSheet)// IE
                    style.styleSheet.cssText = output.css;
                else {// w3c
                    var cssText = document.createTextNode(output.css);
                    style.appendChild(cssText);
                }
                var heads = document.getElementsByTagName("head");
                if(heads.length)
                    heads[0].appendChild(style);
                else
                    document.documentElement.appendChild(style);
            }.bind(this));
        },
        resolveStr(str){
            return {
                templates:str.match(/<template>([\s\S]*)<\/template>/)[1],
                sctipts:str.match(/<script.*>([\s\S]*)<\/script>/)[1],
                styles:str.match(/<style.*>([\s\S]*)<\/style>/)[1],
            }
        },
        async getData(){
            let remoteData = this.$store.getters.getRemoteByUrl(this.url);
            if(remoteData){
                this.resData = remoteData.resData;
                this.cssId = remoteData.cssId;
            }else{
                const res = await Axios.get(this.$props.url);
                this.cssId = this.getId();
                this.resData = res.data;
                this.$store.dispatch('doAction',{
                    event:'addRemote',
                    data:{url:this.url,cssId:this.cssId,resData:this.resData}
                });
            }        
        }
    }
}
</script>