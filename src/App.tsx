import { useState } from "react";
import "./App.css";
import {
  Col,
  Input,
  Row,
  Typography,
  Layout,
  Divider,
  Space,
  Radio,
  RadioChangeEvent,
} from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

function App() {
  const [valueConvert, setValueConvert] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [tabPosition, setTabPosition] = useState<any>("1");
  const [title, setTitle] = useState<any>("Text to camelCase");

  const handleChange = (value: any, tab: string) => {
    setValue(value);
    if (tab === "1") {
      setTitle("Text to camelCase");
      const newValue = value
        ?.trim()
        ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        ?.replace(/\s+/g, "");
      setValueConvert(newValue);
    } else if (tab === "2") {
      setTitle("Text to kebab-case (dash-case)");
      const newValue = value
        ?.trim()
        ?.replace(/([a-z])([A-Z])/g, "$1-$2")
        ?.replace(/[\s_]+/g, "-")
        ?.toLowerCase();
      setValueConvert(newValue);
    } else if (tab === "3") {
      setTitle("Text to Snake Case");
      const newValue = value
        ?.trim()
        ?.match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        ?.map((s: string) => s.toLowerCase())
        ?.join("_");
      setValueConvert(newValue);
    } else if (tab === "4") {
      setTitle("Text to Uppercase");
      const newValue = value?.trim()?.toUpperCase();
      setValueConvert(newValue);
    } else if (tab === "5") {
      setTitle("Text to Lower Case");
      const newValue = value?.trim()?.toLowerCase();
      setValueConvert(newValue);
    }
  };
  const resetValue = () => {
    setValue("");
  };

  function copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setActive(true);
    }
    const timeOutId = setTimeout(() => {
      setActive(false);
    }, 3000);
    return () => {
      clearTimeout(timeOutId);
    };
  }

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
    handleChange(value, e.target.value);
  };

  return (
    <div className="App">
      <Header
        style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      ></Header>
      <Space style={{ marginTop: 24, justifyContent: "center", width: "100%" }}>
        <Radio.Group
          value={tabPosition}
          onChange={changeTabPosition}
          buttonStyle="solid"
        >
          <Radio.Button value="1">camelCase</Radio.Button>
          <Radio.Button value="2">kebab-case</Radio.Button>
          <Radio.Button value="3">Snake Case</Radio.Button>
          <Radio.Button value="4">Uppercase</Radio.Button>
          <Radio.Button value="5">Lower Case</Radio.Button>
        </Radio.Group>
      </Space>
      <Content style={{ padding: "50px" }}>
        <Divider>
          <Title>{title}</Title>
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Paragraph>Paste your text here:</Paragraph>
            <TextArea
              rows={10}
              value={value}
              placeholder="Please type text ..."
              onChange={(e) => handleChange(e.target.value, tabPosition)}
              onClick={resetValue}
            />
          </Col>
          <Col span={12}>
            <Paragraph>Result:</Paragraph>
            <TextArea
              value={valueConvert}
              rows={10}
              readOnly
              className={`textareaResult ${active ? "active" : ""}`}
              onClick={() => copyToClipboard(valueConvert)}
            />
          </Col>
        </Row>
      </Content>
      <Header
        style={{ position: "fixed", bottom: 0, zIndex: 1, width: "100%" }}
      ></Header>
    </div>
  );
}

export default App;
