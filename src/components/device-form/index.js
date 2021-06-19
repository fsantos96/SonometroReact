
import {
    Link
  } from "react-router-dom";
  import {
    Container,
    Button,
    Form,
    Row,
    Col
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import * as apiService from '../../services/apiService';
  import { Redirect } from 'react-router';

  const React = require('react');
  const { useEffect, useState} = require('react');

  const DeviceFormComponent = (props) => {
    var deviceId = props.location.search.split("=");
    deviceId = deviceId.length > 1 ? deviceId[1] : '';
    const [deviceData, setDeviceData] = useState(null);
    const [deptoValue, setDeptoValue] = useState('');
    const [enableValue, setEnableValue] = useState('');

    useEffect(() => {
      apiService.getDeviceList(deviceId).then((data) => {
        if(data.devices && deviceId) {
            console.log(data);
          setDeviceData(data.devices[0]);
          setDeptoValue(data.devices[0].depto);
          setEnableValue(data.devices[0].enabled)
        }
      })
    }, [])

    const saveData = () => {
        apiService.updateDevice({
            ...deviceData,
            enabled: enableValue,
            depto: deptoValue
        }).then((data) => {
            window.location.href = "/device"
        })
    };
    return (
      <Container>
        <Row className="mt-4">
          <Col className="mb-4" sm={12} md={12} lg={12}>
            <Link to="/device">
              <Button variant="primary" type="button">
                  Volver
              </Button>
            </Link>
          </Col>
          <Col className="mb-4" sm={12} md={12} lg={12}>
            <h1>Editando el dispositivo {deviceData ? deviceData.code : ''}</h1>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <Form>
              <Col sm={12} md={12} lg={12}>
                <Form.Group>
                  <Form.Label>Departamento</Form.Label>
                  <Form.Control  type="text" onChange={(event) => setDeptoValue(event.target.value)} name="deviceDepto" required value={deptoValue} />
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group>
                  <Form.Label className="mr-3">Estado: </Form.Label>
                  <Form.Check onClick={() => setEnableValue(true)} inline label="Habilitar" name="deviceEnable" type="checkbox" id="deviceEnable" checked={enableValue} />
                  <Form.Check onClick={() => setEnableValue(false)} inline label="Deshabilitar" name="deviceEnable" type="checkbox" id="deviceEnable" checked={!enableValue} />
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
              <Button variant="primary" type="button" onClick={saveData}>
                  Guardar
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
  export default DeviceFormComponent
  