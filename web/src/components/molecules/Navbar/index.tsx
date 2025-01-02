import { AppLogo, SwitchButton } from "@/components/atoms";
import { Col, Form } from "antd";
import { CustomForm, CustomFormItem, CustomRow, Nav } from "./styles";

interface NavbarProps {
  value: boolean;
  toggleTheme: () => void;
}

const { useForm } = Form;

export function Navbar({ toggleTheme, value }: Readonly<NavbarProps>) {
  const [form] = useForm();

  function handleChangeTheme(): void {
    toggleTheme();
  }

  return (
    <Nav>
      <Col
        xs={2}
        style={{
          maxWidth: "70px",
        }}
      >
        <AppLogo />
      </Col>
      <CustomForm
        name="theme"
        form={form}
        initialValues={{
          theme: value,
        }}
      >
        <CustomRow justify="end">
          <Col>
            <CustomFormItem name={["theme"]}>
              <SwitchButton
                checkedChildren="Dark"
                unCheckedChildren="Light"
                onChange={handleChangeTheme}
              />
            </CustomFormItem>
          </Col>
        </CustomRow>
      </CustomForm>
    </Nav>
  );
}
