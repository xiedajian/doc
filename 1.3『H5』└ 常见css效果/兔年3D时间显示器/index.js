class Timergenerator {
    constructor(options) {
      this.options = options;
      this.minWidth = 700;
      this.animationKey = null;
      this.timeout = null;
      this.countdown = document.getElementsByClassName("countdown_3d");
      this.init();
    }
    init() {
      this.onresize();
      window.onresize = this.onresize.bind(this);
    }
    onresize() {
      const { countdown, animationKey, onresize, options } = this;
      let { width, height } = options.getWidth();
      if (width < this.minWidth) {
        width = this.minWidth;
      } else {
        if (window.innerWidth < width) {
          width = window.innerWidth;
        }
        if (window.innerHeight < height) {
          height = window.innerHeight;
        }
      }
  
      try {
        const main = document.getElementsByClassName("main")[0];
        if (main) {
          main.style.width = width + "px";
          main.style.height = height + "px";
          let marginTB = (window.innerHeight - height) / 2;
          marginTB = marginTB < 0 ? 0 : marginTB;
          let marginLR = (window.innerWidth - width) / 2;
          marginLR = marginLR < 0 ? 0 : marginLR;
          main.style.margin = marginTB + "px " + marginLR + "px";
        }
        if (countdown) {
          const w = (width - width * 0.2) / 6;
          countdown[0].style.setProperty("--w", w.toFixed(2) + "px");
          let lastTime = new Date().getTime();
          this.setHtml();
          const animateFunction = () => {
            const curTime = new Date().getTime();
            if (curTime - lastTime >= 1000) {
              this.setHtml();
              lastTime = curTime;
            }
            this.animationKey = requestAnimationFrame(animateFunction);
          };
          animateFunction();
        }
      } catch (err) {
        if (animationKey) {
          window.cancelAnimationFrame(animationKey);
        }
      }
    }
    getTime() {
      const newTime = new Date();
  
      const year = newTime.getFullYear();
  
      const month = newTime.getMonth() + 1;
      const _month = month < 10 ? "0" + month : month;
      let nMonth = (month + 1) % 12;
      nMonth = nMonth < 10 ? "0" + nMonth : nMonth;
  
      let day = newTime.getDate();
      day = day < 10 ? "0" + day : day;
      let tomorrow = new Date(
        newTime.getTime() + 24 * 60 * 60 * 1000
      ).getDate();
      tomorrow = tomorrow < 10 ? "0" + tomorrow : tomorrow;
  
      const hour = newTime.getHours();
      const _hour = hour < 10 ? "0" + hour : hour;
      let nHour = (newTime.getHours() + 1) % 60;
      nHour = nHour < 10 ? "0" + nHour : nHour;
  
      const minute = newTime.getMinutes();
      const _minute = minute < 10 ? "0" + minute : minute;
      let nMinute = (newTime.getMinutes() + 1) % 60;
      nMinute = nMinute < 10 ? "0" + nMinute : nMinute;
  
      const second = newTime.getSeconds();
      const _second = second < 10 ? "0" + second : second;
      let nSecond = (newTime.getSeconds() + 1) % 60;
      nSecond = nSecond < 10 ? "0" + nSecond : nSecond;
  
      const times = [
        {
          label: "year",
          time: year,
          next: year + 1
        },
        {
          label: "month",
          time: _month,
          next: nMonth
        },
        {
          label: "day",
          time: day,
          next: tomorrow
        },
        {
          label: "hour",
          time: _hour,
          next: nHour
        },
        {
          label: "minute",
          time: _minute,
          next: nMinute
        },
        {
          label: "second",
          time: _second,
          next: nSecond
        }
      ];
      return JSON.parse(JSON.stringify(times));
    }
    updateTime() {
      const times = this.getTime();
      for (let i = 0; i < times.length; i++) {
        const wrapper = document.getElementsByClassName("wrapper")[i];
        if (wrapper) {
          const block = [...wrapper.childNodes].find(
            (item) => item.classList && item.classList.contains("block")
          );
          if (times[i].time != this.curTimes[i].time) {
            if (!wrapper.classList.contains("rotate")) {
              wrapper.classList.add("rotate");
              this.timeout = setTimeout(() => {
                wrapper.classList.remove("rotate");
                this.curTimes[i] = {
                  ...times[i]
                  // time: times[i].next,
                  //   next: times[i].time
                };
                block.setAttribute("content-before", times[i].time);
                block.setAttribute("content-after", times[i].next);
              }, 500);
            }
          }
        }
      }
    }
    setHtml() {
      if (document.getElementsByClassName("wrapper").length < 1) {
        this.curTimes = this.getTime();
        const { curTimes } = this;
        let str = "";
        for (let i = 0; i < curTimes.length; i++) {
          const current = curTimes[i];
          str +=
            `<div class="wrapper">
                  ` +
            (current.label == "year"
              ? `<div class="rabbit">
                  <div class="head"></div>    
                  <div class="body"><div class="foot"></div>
                  </div>    
                  </div>`
              : "") +
            (current.label == "month" ? `<div class="radish"></div>` : "") +
            `
                      <div class="block" content-before="` +
            current.time +
            `" content-after="` +
            current.next +
            `"></div>
                  </div>`;
          if (this.countdown) {
            this.countdown[0].innerHTML = str;
          }
        }
      } else {
        this.updateTime();
      }
    }
  }
  new Timergenerator({
    getWidth: () => ({
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8
    })
  });