export default function pagination(rawdata = [], curr) {
  let pages = Math.ceil(rawdata.length / 6);
  if (curr > pages || rawdata.length == 0) return;

  let start = curr * 6;
  let end = start + 5;

  if (curr == 0) {
    start = 0;
    end = 5;
  }

  return rawdata.filter((_, idx) => idx >= start && idx <= end);
}
