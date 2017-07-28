function datePadding(val) {
  return val > 9 ? val : `0${val}`;
}

export default {
  formatDate(val) {
    const date = new Date(val);
    return `${date.toLocaleDateString()}  ${datePadding(date.getHours())}:${datePadding(date.getMinutes())}:${datePadding(date.getSeconds())}`;
  }
};
