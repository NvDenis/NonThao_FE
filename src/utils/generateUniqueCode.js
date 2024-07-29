function generateUniqueCode(data) {
  // Lấy ngày tháng năm hiện tại
  let now = new Date();
  let year = now.getFullYear().toString();
  let month = (now.getMonth() + 1).toString().padStart(2, "0");
  let day = now.getDate().toString().padStart(2, "0");
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  // Tạo chuỗi ngày tháng năm
  let dateStr = year + month + day + hours + minutes + seconds;

  // Hàm băm đơn giản để tạo ra chuỗi ngẫu nhiên từ chuỗi ngày tháng năm
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Chuyển đổi thành 32-bit integer
    }
    return hash;
  }

  // Lấy giá trị băm của chuỗi ngày tháng năm
  let hash = hashCode(dateStr);

  // Chuyển đổi giá trị băm thành chuỗi ký tự
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += characters[Math.abs(hash) % characters.length];
    hash = Math.floor(hash / characters.length);
  }

  const uniqueCode = data
    .split(" ")
    .map((item) => {
      return item[0].toUpperCase();
    })
    .join("");

  return data + " " + uniqueCode + "-" + code;
}

export default generateUniqueCode;
