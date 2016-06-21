module.exports = escapeRegexp;

function escapeRegexp(s){
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};
