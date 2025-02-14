[timers](https://github.com/Kelin2025/vue-timers)




```
{
  // Name of timer
  // Default: timer key (with object notation)
  name: String,

  // Tick callback or method name from component
  // Note: callback is binded to component instance
  // Default: name
  callback: Function/String,

  // Autostart timer from created hook
  // Default: false
  autostart: Boolean,

  // Set true to repeat (with setInterval) or false (setTimeout)
  // Default: false
  repeat: Boolean,

  // Set true to call first tick immediate 
  // Note: repeat must be true too
  // Default: false
  immediate: Boolean,

  // Time between ticks
  // Default: 1000
  time: Number
  
  // Switch timer`s status between activated and deactivated
  // Default: false
  isSwitchTab: Boolean
}
```