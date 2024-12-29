import { AppLogo, SwitchButton } from "@/components/atoms";
import { useAppContext } from "@/context";
import { Col, Form } from "antd";
import { CustomForm, CustomFormItem, CustomRow, Nav } from "./styles";
import { ThemeEnum } from "@/types";

interface NavbarProps {
  value: boolean;
  toggleTheme: () => void;
}

const { useForm } = Form;

export function Navbar({ toggleTheme, value }: Readonly<NavbarProps>) {
  const [form] = useForm();
  const { theme } = useAppContext();

  function handleChangeTheme(): void {
    toggleTheme();
  }

  return (
    <Nav>
      <Col xs={2}>
        <AppLogo
          theme={theme == ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK}
        />
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
