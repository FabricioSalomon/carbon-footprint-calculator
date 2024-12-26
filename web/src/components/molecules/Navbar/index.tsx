import { Col, Form } from "antd";
import {
  CustomForm,
  CustomFormItem,
  CustomRow,
  CustomSwitch,
  Nav,
} from "./styles";

interface NavbarProps {
  value: boolean;
  toggleTheme: () => void;
}

const { useForm } = Form;

export function Navbar({ toggleTheme, value }: Readonly<NavbarProps>) {
  const [form] = useForm();

  function handleChangeTheme() {
    toggleTheme();
  }

  return (
    <Nav>
      <CustomForm
        form={form}
        initialValues={{
          theme: value,
        }}
      >
        <CustomRow justify="end">
          <Col>
            <CustomFormItem name={["theme"]}>
              <CustomSwitch
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
