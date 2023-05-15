function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(l){ return l.toUpperCase() });
  }

module.exports = capitalizeWords