<template>
  <section class="my-5">
    <section>
      {{ timer }}
      <br />
      {{ timer - startTime }}
    </section>
    <button class="btn btn-primary" @click="startTimer">Start</button>
    <button class="btn btn-primary" @click="stopTimer">Stop</button>
  </section>
</template>

<script>
export default {
  name: 'Stopwatch',
  layout: 'default',

  data() {
    return {
      timer: 0,
      startTime: 0,
      intervalHandle: null,
    }
  },

  methods: {
    startTimer() {
      this.startTime = new Date().getTime()
      this.intervalHandle = setInterval(() => {
        this.timer = new Date().getTime()
      }, 50)
    },
    stopTimer() {
      clearInterval(this.intervalHandle)
      this.intervalHandle = null
    },
  },
}
</script>
