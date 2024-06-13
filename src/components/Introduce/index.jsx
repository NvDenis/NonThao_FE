import { Button, Col, Row, Typography, Carousel, Image } from "antd";
import styles from "./Introduce.module.css";
import banner1 from "../../assets/images/banner_2.jpg";

const Introduce = () => {
  return (
    <Row className={styles.container}>
      <Col
        xs={{
          span: 24,
          order: 1,
        }}
        md={{
          span: 24,
          order: 1,
        }}
        sm={{
          span: 24,
          order: 1,
        }}
        lg={{
          span: 24,
          order: 1,
        }}
        xl={{
          span: 12,
        }}
        className={styles.containerLeft}
      >
        <div className={styles.wrapperLeft}>
          <Typography.Title className={styles.title}>Nón thảo</Typography.Title>
          <Typography.Text className={styles.desc}>
            Nón được hoàn thiện với chất lượng cao, giá thành rẻ, phù hợp với mọi lứa tuổi
          </Typography.Text>
          <Button type="primary" href="#products">
            Xem thêm 👇
          </Button>
        </div>
      </Col>
      <Col
        lg={{
          span: 24,
        }}
        xl={{
          span: 12,
          order: 1,
        }}
        className={styles.containerRight}
      >
        <Carousel arrows infinite={true} className={styles.carousel}>
          <Image width={700} height={400} preview={false} src={banner1} />
          <Image width={700} height={400} preview={false} src={banner1} />
          <Image width={700} height={400} preview={false} src={banner1} />
          <Image width={700} height={400} preview={false} src={banner1} />
        </Carousel>
      </Col>
    </Row>
  );
};
export default Introduce;
