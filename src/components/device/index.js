
  import {
    Link
  } from "react-router-dom";
  import {
    Container,
    Table,
    Row,
    Col,
    Button
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../manager/manager.css';
  import * as apiService from '../../services/apiService';
  const React = require('react');
  const { useEffect, useState} = require('react');

  const DeviceComponent = (props) => {
    const [deviceList, setDeviceList] = useState([]);
 
    useEffect(() => {
      console.log("dice")
      apiService.getDeviceList().then((data) => {
        console.log(data)
        console.log("dice2")
        if(data.devices && data.devices.length) {
          setDeviceList(data.devices)
        }
      })
    }, []);

    const handlerClick = (id) => {
      const deviceToUpdate = deviceList.find(d => d.id == id);
      deviceToUpdate.enabled = !deviceToUpdate.enabled;
      apiService.updateDevice(deviceToUpdate).then((data) => {
        if(data.devices && data.devices.length) {
          setDeviceList(data.devices)
        }
      })
    }

    const handlerDelete = (id) => {
      apiService.deleteDevice(id).then((data) => {
        setDeviceList(data.devices)
      })
    }

    return (
      <Container className="mt-5 justify-center">
        <Link to="/">
          <Button variant="primary" type="button">
              Volver
          </Button>
        </Link>
        <h1 className="mt-4">Lista de dispositivos disponibles</h1>
        
        <Table className="mt-5 table-device" bordered hover size="md">
          <thead>
            <tr>
              <th className="thead-emails">Codigo</th>
              <th className="thead-emails">Fecha instalacion</th>
              <th className="thead-emails">departamento</th>
              <th className="thead-emails">estado</th>
              <th class="thead-emails"></th>
            </tr>
          </thead>
          <tbody>
            {
              deviceList.map((device) => {
                return (
                  <tr>
                    <td>{device.id}</td>
                    <td>{device.date}</td>
                    <td>{device.depto}</td>
                    <td>{ device.enabled ? 'Habilitado' : 'Deshabilitado'}</td>
                    <td>
                      <Row sm={6} md={6} lg={6}>
                        <Col sm={6} md={6} lg={6}>
                          <Link to={`/device/form?id=${device.id}`}><Button variant="warning">Editar</Button></Link>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                          <Button onClick={() => handlerDelete(device.id)} variant="danger">Borrar</Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Container>
    )
  }

  export default DeviceComponent
  