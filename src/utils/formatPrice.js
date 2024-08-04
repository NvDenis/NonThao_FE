const formatPrice = (value) => {
  if (!value) {
    console.error("Value not valid", value);
  }
  // Bước 1: Loại bỏ ký tự không phải số
  const numericValue = value.replace(/\D/g, "");

  // Bước 2 và 3: Đảo ngược chuỗi và thêm dấu phẩy
  const reversedAndFormatted = numericValue
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})(?=\d)/g, "$1,");

  // Bước 4: Đảo ngược lại chuỗi để có định dạng cuối cùng
  return reversedAndFormatted.split("").reverse().join("");
};

export default formatPrice;
