import non_ket_1 from "./src/assets/images/non_ket_1.jpg";
import non_ket_2 from "./src/assets/images/non_ket_2.jpg";
import non_ket_3 from "./src/assets/images/non_ket_3.jpg";
import non_ket_4 from "./src/assets/images/non_ket_4.jpg";
import non_cao_boi_1 from "./src/assets/images/non_cao_boi_1.jpg";
import non_cao_boi_2 from "./src/assets/images/non_cao_boi_2.jpg";

const products = [
  {
    _id: 1,
    name: "Nón kết",
    id_category: 1,
    units: [
      {
        color: "#000000",
        price: 100000,
        images: [non_ket_1, non_ket_2],
      },
      {
        color: "#1677ff",
        price: 150000,
        images: [non_ket_3, non_ket_4],
      },
      {
        color: "#ffffff",
        price: 250000,
        images: [non_ket_2, non_ket_1],
      },
    ],
    status: true,
    active: true,
    desc: "Description",
    sold: 1,
  },
  {
    _id: 2,
    name: "Nón cao bồi",
    id_category: 4,
    units: [
      {
        color: "#000000",
        price: 1000000,
        images: [non_cao_boi_1, non_cao_boi_2],
      },
    ],
    status: true,
    active: true,
    desc: "Description",
    sold: 1,
  },
];

const categories = [
  {
    _id: 1,
    name: "NÓN KẾT",
  },
  {
    _id: 2,
    name: "NÓN DA",
  },
  {
    _id: 3,
    name: "NÓN ĐAN TAY",
  },
  {
    _id: 4,
    name: "NÓN VÀNH",
  },
  {
    _id: 5,
    name: "NÓN PHỚT",
  },
  {
    _id: 6,
    name: "NÓN TRẺ EM",
  },
];

export { products, categories };
