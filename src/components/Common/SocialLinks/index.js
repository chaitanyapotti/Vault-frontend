import React, { Component } from "react";

const images = {
  github: "assets/Footer/github.png",
  telegram: "assets/Footer/telegram.png",
  medium: "assets/Footer/medium.png",
  facebook: "assets/Footer/fb.png",
  twitter: "assets/Footer/twitter.png"
};

class SocialLinks extends Component {
  render() {
    const { urls } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <a target="_blank" href={urls.github}>
                <img className="push--right" src={images.github} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.telegram}>
                <img className="push--right" src={images.telegram} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.medium}>
                <img className="push--right" src={images.medium} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.facebook}>
                <img className="push--right" src={images.facebook} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.twitter}>
                <img className="push--right" src={images.twitter} width="20" height="20" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SocialLinks;
