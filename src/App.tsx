import { useState } from "react";
import "./App.css";
import { Col, Input, Row, Typography, Layout, Menu } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

function App() {
  const [valueConvert, setValueConvert] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    const newValue = e.target.value
      .trim()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
    setValueConvert(newValue);
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
  return (
    <div className="App">
      <Header
        style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      ></Header>
      <Content style={{ padding: "50px" }}>
        <Title level={2}>Text to camelCase Online Conterter</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Paragraph>Paste your text here:</Paragraph>
            <TextArea
              rows={10}
              value={value}
              placeholder="Please type text ..."
              onChange={(e) => handleChange(e)}
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
    </div>
  );
}

export default App;
