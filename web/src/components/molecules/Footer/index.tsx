import { CustomButton } from "@/components/atoms";
import { useAppContext } from "@/context";
import { FileAddFilled, HomeFilled, UserOutlined } from "@ant-design/icons";
import { Col } from "antd";
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
    <Container justify="space-between" align="middle">
      {pages.map(({ icon, key, url }) => (
        <Col key={key}>
          <CustomButton
            onClick={() => handleClick(key, url)}
            size="large"
            icon={icon}
            hierarchy={key === currentPage ? "primary" : "secondary"}
          />
        </Col>
      ))}
    </Container>
  );
}
