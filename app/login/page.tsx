import { Col, Row } from "antd"

export default function Page() {
  return (
    <Row>
      <Col span={12}>Left column</Col>
      <Col span={12}>
        <h1 className="text-xl">Login Page</h1>
        <h2>
          Get started by editing <strong>app/login/page.tsx</strong>
        </h2>
      </Col>
    </Row>
  )
}
