
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
  import './index.css';
  import * as apiService from '../../services/apiService';
  const React = require('react');
  const { useEffect, useState} = require('react');

  const AlarmComponent = (props) => {
    const [alertList, setAlertList] = useState([]);
    
    useEffect(() => {
      apiService.getAlertList().then((data) => {
        setAlertList(data.alerts);   
      })
    }, []);

    return (
      <Container className="mt-5 justify-center">
        <Link to="/">
          <Button variant="primary" type="button">
              Volver
          </Button>
        </Link>
        <h1 className="mt-4">Lista de alarmas</h1>
       
        <Table className="mt-5 table-alert" bordered hover size="md">
          <thead>
            <tr>
              <th className="thead-emails">Depto</th>
              <th className="thead-emails">Dispositivo</th>
              <th className="thead-emails">Fecha</th>
              <th className="thead-emails">Duracion</th>
            </tr>
          </thead>
          <tbody>
            {
              alertList.map((alert) => {
                return (
                  <tr>
                    <td>{alert.depto}</td>
                    <td>{alert.deviceCode}</td>
                    <td>{alert.date}</td>
                    <td>{alert.duration}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Container>
    )
  }

  export default AlarmComponent
  