<template>
  <div>
    <div id="pell"></div>
    <div>
      Text output:
      <div id="text-output"></div>
      HTML output:
      <pre id="html-output"></pre>
    </div>
  </div>
</template>
<script>
import pell from 'pell';

export default {
  name: 'SendMessage',
  data() {
    return {

    };
  },
  mounted() {
    pell.init({
      actions: [
        'bold',
        { name: 'italic', icon: '&#9786;', title: 'Zitalic' },
        'underline'
      ],
      classes: {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        editor: 'pell-editor'
      },
      onChange: (html) => {
        document.getElementById('text-output').innerHTML = html;
        document.getElementById('html-output').textContent = html;
      },
      root: 'pell'
    });
  }
};
</script>
<style lang="less">

</style>
