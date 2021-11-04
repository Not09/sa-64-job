import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบสั่งจองสินค้า</h1>
        <h4>Requirements</h4>
        <p>

        ระบบสั่งจองสินค้า เป็นระบบที่สมาชิกระบบ Farm mart สามารถ เข้ามาสั่งจองสินค้าใน farm mart ได้ 
        โดยสมาชิกระบบ Farm mart สามารถเลือกสินค้าที่ต้องการจอง จำนวนสินค้าที่ต้องการจอง และ วิธีการชำระเงิน ได้  
        และเมื่อสั่งจองสินค้า เสร็จแล้ว ระบบจะแสดงข้อความว่า สั่งจองสำเร็จ ต่อจากนั้นระบบจะบันทึกข้อมูลลงไปที่ฐานข้อมูลชื่อว่า 
        Preorder เนื่องจากสินค้าบางชนิดอาจมีจำนวนที่จำกัดเลยจำเป็นที่ต้องจะมีการสั่งจองก่อน (เช่น สินค้าตามฤดูกาล)
        ดังนั้น การสร้างระบบสั่งจองสินค้าจะช่วยให้สมาชิกระบบ Farm mart สามารถสั่งจองสินค้าได้ง่ายขึ้น และสามารถสั่งจอง
        สินค้าเวลาไหนก็ได้ ทำให้เกิดความสะดวกรวดเร็ว สมาชิกระบบ Farm mart ในการสั่งจองสินค้า

        </p>
      </Container>
    </div>
  );
}
export default Home;
