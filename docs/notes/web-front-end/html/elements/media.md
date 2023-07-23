# HTML 媒体标签

## 音频

### \<audio>

<div :class="$style.playground">
  <audio controls :src="audioUrl"></audio>
</div>

```html{0}
<audio controls src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_alert_chime_short_musical_notification_cute_child_like_001_64918.mp3?_=1"></audio>
```

---

### 自定义样式修改

https://blog.shahednasser.com/how-to-style-an-audio-element/

::: details 控制面板：`audio::-webkit-media-controls-panel`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example1"
  ></audio>
</div>

```css
audio::-webkit-media-controls-panel {
  background-color: skyblue;
}
```

:::

::: details 静音按钮：`audio::-webkit-media-controls-mute-button`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example2"
  ></audio>
</div>

```css
audio::-webkit-media-controls-mute-button {
  background-color: skyblue;
  border-radius: 50%;
}
```

:::

::: details 播放按钮：`audio::-webkit-media-controls-play-button`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example3"
  ></audio>
</div>

```css
audio::-webkit-media-controls-play-button {
  background-color: skyblue;
  border-radius: 50%;
}
```

:::

::: details 当前时间：`audio::-webkit-media-controls-current-time-display`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example4"
  ></audio>
</div>

```css
audio::-webkit-media-controls-current-time-display {
  color: skyblue;
}
```

:::

::: details 剩余时间：`audio::-webkit-media-controls-time-remaining-display`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example5"
  ></audio>
</div>

```css
audio::-webkit-media-controls-time-remaining-display {
  color: skyblue;
}
```

:::

::: details 播放进度时间轴：`audio::-webkit-media-controls-timeline`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example6"
  ></audio>
</div>

```css
audio::-webkit-media-controls-timeline {
  background-color: skyblue;
  border-radius: 25px;
  margin-left: 10px;
  margin-right: 10px;
}
```

:::

::: details 音量滑块：`audio::-webkit-media-controls-volume-slider`

<div :class="$style.playground">
  <audio 
    controls 
    :src="audioUrl" 
    :class="$style.example7"
  ></audio>
</div>

```css
audio::-webkit-media-controls-volume-slider {
  background-color: skyblue;
  border-radius: 25px;
}
```

:::

::: details 其他

```css{0}
audio::-webkit-media-controls-timeline-container { /* */ }
audio::-webkit-media-controls-volume-slider-container { /* */ }
audio::-webkit-media-controls-seek-back-button { /* */ }
audio::-webkit-media-controls-seek-forward-button { /* */ }
audio::-webkit-media-controls-fullscreen-button { /* */ }
audio::-webkit-media-controls-rewind-button { /* */ }
audio::-webkit-media-controls-return-to-realtime-button { /* */ }
audio::-webkit-media-controls-toggle-closed-captions-button { /* */ }
```

:::

---

### 常见音频格式

## 视频

### \<video>

---

### 常见视频格式

https://www.w3schools.com/html/html_media.asp

<!-- 本文中用到的逻辑 -->
<script setup>
import { ref } from 'vue'

const audioUrl= ref("https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_alert_chime_short_musical_notification_cute_child_like_001_64918.mp3?_=1")
</script>

<!-- 本文中用到的样式 -->
<style module>
.playground {
    background-color: #f9f9f9;
    color: black;
    padding: 1rem;
    border: 1px solid grey;
    margin-top: 16px;
}
.example1::-webkit-media-controls-panel,
.example2::-webkit-media-controls-mute-button,
.example3::-webkit-media-controls-play-button,
.example6::-webkit-media-controls-timeline,
.example7::-webkit-media-controls-volume-slider {
  background-color: skyblue;
}
.example2::-webkit-media-controls-mute-button,
.example3::-webkit-media-controls-play-button {
  border-radius: 50%;
}
.example4::-webkit-media-controls-current-time-display, 
.example5::-webkit-media-controls-time-remaining-display {
  color: skyblue;
}
.example6::-webkit-media-controls-timeline, 
.example7::-webkit-media-controls-volume-slider {
  border-radius: 25px;
}
.example6::-webkit-media-controls-timeline {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
