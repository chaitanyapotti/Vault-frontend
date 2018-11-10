import React, { Component } from "react";

const images = {
  github: "/assets/Footer/github.png",
  telegram: "/assets/Footer/telegram.png",
  medium: "/assets/Footer/medium.png",
  facebook: "/assets/Footer/fb.png",
  twitter: "/assets/Footer/twitter.png"
};

class SocialLinks extends Component {
  render() {
    const { urls } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <a target="_blank" href={urls.github} rel="noopener noreferrer">
                <img id="git" className="push--left" src={images.github} width="20" height="20" alt="github" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.telegram} rel="noopener noreferrer">
                <img id="telegram" className="push--left" src={images.telegram} width="20" height="20" alt="telegram" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.medium} rel="noopener noreferrer">
                <img id="medium" className="push--left" src={images.medium} width="20" height="20" alt="medium" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.facebook} rel="noopener noreferrer">
                <img id="fb" className="push--left" src={images.facebook} width="20" height="20" alt="facebook" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.twitter} rel="noopener noreferrer">
                <img id="twitter" className="push--left" src={images.twitter} width="20" height="20" alt="twitter" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SocialLinks;
