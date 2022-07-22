const showElipsis = (str) => str.length >= 10 ? str.substring(0, 9) + "..." : str

export {
  showElipsis
}