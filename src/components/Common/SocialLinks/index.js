import React, { Component } from "react";

const images = {
  github: "https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png",
  telegram: "https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png",
  medium: "https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png",
  facebook: "https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png",
  twitter: "https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png"
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
                <img src={images.github} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.telegram}>
                <img src={images.telegram} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.medium}>
                <img src={images.medium} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.facebook}>
                <img src={images.facebook} width="20" height="20" />
              </a>
            </td>
            <td>
              <a target="_blank" href={urls.twitter}>
                <img src={images.twitter} width="20" height="20" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SocialLinks;
