/* eslint camelcase: 0 */

import React from "react";
import { Link } from "react-router-dom";
import { Col, Grid, Row } from "../../../helpers/react-flexbox-grid";

const FooterPartial = () => (
  <div id="footer" className="ftr-cnt push-top--50">
    <Grid>
      <Row className="push-top--50">
        <Col lg={2}>
          <div className="ftr-logo" />
        </Col>
        <Col lg={2}>
          <div className="txt-l txt-ddbld flush fnt-mli">KNOW MORE</div>
          <div className="txt txt-bld push-half--top opacity-70 fnt-italic">
            <div>
              <a href="https://storage.googleapis.com/electus/whitepaper.pdf" target="_blank" rel="noopener noreferrer" alt="whitepaper">
                White Paper
              </a>
            </div>
            <div>
              <a href="https://medium.com/@ParthaB/" target="_blank" rel="noopener noreferrer" alt="blog">
                Blog
              </a>
            </div>
          </div>
        </Col>

        <Col lg={2} className="push-mob--top15">
          <div className="txt-l txt-ddbld flush fnt-mli">SOFTWARES</div>
          <div className="txt txt-bld push-half--top opacity-70 fnt-italic">
            <Link to="/">
              <div>Vault</div>
            </Link>
            <Link to="/apex">
              <div>Apex</div>
            </Link>
            <Link to="/polis">
              <div>Polis</div>
            </Link>
          </div>
        </Col>

        <Col lg={2} className="push-mob--top15">
          <div className="txt-l txt-ddbld flush fnt-mli">LEGAL</div>
          <div className="txt txt-bld  push-half--top opacity-70 fnt-italic">
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
          </div>
        </Col>

        <Col lg={4} className="push-mob--top15">
          <div className="txt-l txt-ddbld flush fnt-mli">FIND US ON</div>
          <div>
            <table id="foottable" style={{ fontSize: "22px", color: "#9ab4d3" }} width="100%">
              <tbody>
                <tr>
                  <td>
                    <a target="_blank" id="footer" className="opacity-70" rel="noopener noreferrer" href="https://github.com/chaitanyapotti">
                      <img id="git" src="/assets/Footer/github.png" alt="git-logo" />
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      id="footer"
                      className="opacity-70"
                      rel="noopener noreferrer"
                      href="https://t.me/joinchat/FwqASEdUSqFIPNBNwPZzfg"
                    >
                      <img id="telegram" src="/assets/Footer/telegram.png" alt="telegram-logo" />
                    </a>
                  </td>
                  <td>
                    <a target="_blank" id="footer" className="opacity-70" rel="noopener noreferrer" href="https://medium.com/@ParthaB/">
                      <img id="medium" src="/assets/Footer/medium.png" alt="medium-logo" />
                    </a>
                  </td>
                  {/* <td>
                  <a
                    target="_blank"
                    id="footer"
                    className="opacity-70"
                    rel="noopener noreferrer"
                    href="https://www.reddit.com/r/electusnetwork"
                  >
                    <img src="assets/Footer/redit.png" alt="redit-logo" />
                  </a>
                </td> */}
                  <td>
                    <a target="_blank" id="footer" className="opacity-70" rel="noopener noreferrer" href="https://www.reddit.com/r/ElectusNetwork/">
                      <img id="reddit" src="/assets/Footer/reddit.png" alt="reddit-logo" />
                    </a>
                  </td>
                  <td>
                    <a target="_blank" id="footer" className="opacity-70" rel="noopener noreferrer" href="https://www.twitter.com/ElectusNetwork">
                      <img id="twitter" src="/assets/Footer/twitter.png" alt="twitter-logo" />
                    </a>
                  </td>
                  {/* <td>
                  <a
                    target="_blank"
                    id="footer"
                    className="opacity-70"
                    rel="noopener noreferrer"
                    href="https://discord.gg/uReJZ46"
                  >
                    <img src="/assets/Footer/discord.png" alt="discord-logo" />
                  </a>
                </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col className="text-right opacity-70 push--top fnt-ps">©Electus Foundation 2018 all rights reserved</Col>
      </Row>
    </Grid>
  </div>
);

export default FooterPartial;
