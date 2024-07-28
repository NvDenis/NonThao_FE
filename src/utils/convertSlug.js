const convertToSlug = (text) => {
  // Bảng chữ cái có dấu và không dấu
  const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ";
  const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  // Chuyển chữ có dấu thành không dấu
  let updatedText = text
    .split("")
    .map((char, index) => {
      const indexInFrom = from.indexOf(char);
      return indexInFrom !== -1 ? to[indexInFrom] : char;
    })
    .join("");
  // Chuyển khoảng trắng thành dấu gạch ngang và chuyển về chữ thường
  updatedText = updatedText.replace(/\s+/g, "-").toLowerCase();
  // Loại bỏ các ký tự không phải là chữ cái, số hoặc gạch ngang
  updatedText = updatedText.replace(/[^a-z0-9-]/g, "");
  return updatedText;
};

export default convertToSlug;
