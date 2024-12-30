import { CustomButton } from "@/components/atoms";
import { useAppContext } from "@/context";
import { FileAddFilled, HomeFilled, UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { Container } from "./styles";
import { Pages } from "./types";

export function Footer() {
  const router = useRouter();
  const { currentPage, handleSelectPage } = useAppContext();

  const pages: Pages[] = [
    {
      key: 1,
      icon: <HomeFilled />,
      url: "/",
    },
    {
      key: 2,
      icon: <FileAddFilled />,
      url: "/form",
    },
    {
      key: 3,
      icon: <UserOutlined />,
      url: "/profile",
    },
  ];

  function handleClick(key: number, url: string): void {
    if (key === currentPage) {
      return;
    }
    handleSelectPage(key);
    router.push(url);
  }

  return (
    <Container justify="center" align="middle">
      <Col xs={20} sm={16} md={12}>
        <Row justify="space-between" align="middle">
          {pages.map(({ icon, key, url }) => (
            <Col key={key}>
              <CustomButton
                size="large"
                icon={icon}
                onClick={() => handleClick(key, url)}
                hierarchy={key === currentPage ? "primary" : "tertiary"}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
}
