import { Col, Row, Typography } from "antd";

export function HomePage() {
  return (
    <Row
      gutter={[0, 16]}
      justify="center"
      style={{
        padding: "0 0.5rem",
      }}
    >
      <Col xs={24}>
        <Typography>Carbon Footprint Introduction</Typography>
      </Col>
      <Col xs={24}>
        <Typography>
          Understanding and calculating your carbon footprint is a critical step
          toward reducing personal environmental impact. This process involves
          identifying the primary contributors to your emissions across major
          areas of life, such as housing, travel, food, products, and services.
          By assessing consumption patterns and applying emissions factors to
          these areas, individuals can pinpoint effective opportunities for
          carbon reduction.
        </Typography>
      </Col>
      <Col xs={24}>
        <Typography>
          In housing, emissions stem from energy usage, water consumption, and
          waste management. Personal contributions are determined by dividing
          household totals by the number of residents, and emissions are
          calculated using factors specific to energy sources like electricity
          or gas. While construction emissions are significant, they are
          typically excluded from personal assessments, focusing instead on
          direct and indirect energy impacts.
        </Typography>
      </Col>
      <Col xs={24}>
        <Typography>
          Travel-related emissions depend on the modes of transport used and the
          distances traveled. Calculations include emissions from fuel
          consumption, vehicle production, and maintenance, as well as public
          transit and air travel. Understanding these contributions allows for
          better choices, such as favoring efficient vehicles or public
          transport to reduce overall emissions.
        </Typography>
      </Col>
      <Col xs={24}>
        <Typography>
          Diet plays a major role in carbon emissions, influenced by food
          production, processing, and wastage. Different food groups carry
          varying emissions factors, with plant-based options generally being
          more sustainable than meat or dairy. Reducing food waste and choosing
          local, seasonal products can significantly lower the food footprint.
        </Typography>
      </Col>
      <Col xs={24}>
        <Typography>
          Emissions from products are tied to manufacturing and supply chains,
          while services contribute through operational processes. Simplifying
          the assessment by grouping expenditures into categories like
          electronics or healthcare allows for broad estimations of
          environmental impact. Conscious consumption and prioritizing
          sustainable products and services can help minimize these emissions.
        </Typography>
      </Col>
      <Col xs={24}>
        <Typography>
          In conclusion, calculating your carbon footprint provides valuable
          insights into how daily activities contribute to environmental harm.
          By targeting areas with the highest impact and making sustainable
          choices, individuals can actively participate in reducing global
          carbon emissions and fostering a healthier planet.
        </Typography>
      </Col>
    </Row>
  );
}
