export function getPrice(roomType, start, end) {
  let pricing = {
    A: 100,
    B: 80,
    C: 50,
  };
  let diff = parseInt((new Date(end) - new Date(start)) / 1000 / 3600);
  console.log(roomType, diff * (pricing[roomType] || 0));
  return diff * (pricing[roomType] || 0) || 0;
}
