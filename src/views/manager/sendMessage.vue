<template>
  <div>
    <div id="pell"></div>
    <div>
      Text output:
      <div id="text-output"></div>
    </div>
  </div>
</template>
<script>
import 'pell/dist/pell.min.css';
import pell from 'pell';

export default {
  name: 'SendMessage',
  data() {
    return {
    };
  },
  mounted() {
    pell.init({
      element: document.getElementById('pell'),
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
      onChange: html => {
        document.getElementById('text-output').innerHTML = html;
      }
    });
  }
};
</script>
<style lang="less" scoped>

</style>
