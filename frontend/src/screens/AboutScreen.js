import React from 'react'
import './styles.css'
import {Row, Col} from 'react-bootstrap'

const AboutScreen = () => {
    return (
    <div className = "mainAbout">
        <Row className="justify-content-md-center">
            <Col xs lg="2" className="info">
            <strong>Что такое цифровая одежда? </strong>
            Цифровая одежды - это одежда, существующая исключительно в цифровом формате, то есть в формате 3D-моделей. Такая одежда добавляется на фотографию пользователя.
            </Col>
            <Col xs lg="2" className="info">
            <strong>В чем состоит причина разработки цифровой одежды?</strong>
            В основе актуальности разработки лежат проблемы, связанные с экологической и эпидемиологической ситуации в мире, в частности проблемы, связанные с производством, транспортировкой и последующей продажей одежды.
            </Col>
            <Col xs lg="2" className="info">
            <strong>В чем заключается цель разработки?</strong>
            Цели разработки заключаются в уменьшении использовании природных ресурсов при производстве цифровой одежды, обеспечение безопасной примерки одежды в период карантина и предоставление возможности пользователям, заботящимся о своем образе в социальных сетях приобрести цифровой образ
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs lg="2" className="info">
            <strong>What is digital clothing?</strong>
            Digital clothing is clothing that exists exclusively in digital format, that is, in the format of 3D models. Such clothes are added to the users’ photo </Col>
            <Col xs lg="2" className="info">
            <strong>What is the reason for developing digital clothing?</strong>
            The relevance of the development is based on problems related to the environmental and epidemiological situation in the world, in particular, problems related to the production, transportation and subsequent sale of clothing.
            </Col>
            <Col xs lg="2" className="info">
            <strong> What is the purpose of the development?</strong>
            The goals of the development are to reduce the use of natural resources in the production of digital clothing, to ensure the safe fitting of clothing during the quarantine period, and to enable users who care about their image on social networks to purchase a digital clothes          </Col>
        </Row>
    </div>
    )
}

export default AboutScreen
