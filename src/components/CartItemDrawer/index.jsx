const CartItemDrawer = ({ item }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Image src={item.img} preview={false} height={80} width={80} />
        <div>
          <p>{item.name}</p>
          <div>
            <span>
              {item.quantity} x {item.price}
            </span>
          </div>
        </div>
      </div>
      <DeleteOutlined />
    </div>
  );
};
export default CartItemDrawer;
