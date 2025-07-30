import React, { useState } from "react";
import { translate } from "../../translations/translate";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { changePage, changeGamePage } from "../../reducers/page";

function SignIn(props) {
  const { lang, signSubmit } = props;
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  function handleChange(type, e) {
    switch (type) {
      case "user":
        setUser(e.target.value);
        break;
      case "pass":
        setPass(e.target.value);
        break;
      default:
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setMessage(`Connected wallet: ${address}`);

        if (typeof signSubmit === "function") {
          signSubmit({
            emit: "signin_send",
            payload: { user: address, pass: "" },
          });
        }

        dispatch(changePage("Salon"));
        dispatch(changeGamePage("dashboard"));
      } catch (error) {
        setMessage("Wallet connection failed!");
        console.error(error);
      }
    } else {
      setMessage("Please install MetaMask!");
    }
  }

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <div className="sign_in_container">
      <Form>
        <Row>
          <Col sm={4} className="label_container d-none d-sm-block">
            <div className="label">
              {translate({ lang: lang, info: "user" })}
            </div>
          </Col>
          <Col sm={8} className="input_container">
            <input
              placeholder={translate({ lang: lang, info: "user" })}
              className="input_light"
              type="text"
              value={user}
              onChange={(e) => handleChange("user", e)}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="label_container d-none d-sm-block">
            <div className="label">
              {translate({ lang: lang, info: "password" })}
            </div>
          </Col>
          <Col sm={8} className="input_container">
            <input
              placeholder={translate({ lang: lang, info: "password" })}
              className="input_light"
              type={visible ? "text" : "password"}
              value={pass}
              onChange={(e) => handleChange("pass", e)}
            />
            <div className="input_eye" onClick={() => handleVisible()}>
              {visible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="button"
              onClick={handleSubmit}
              className="mybutton button_fullcolor"
            >
              {translate({ lang: lang, info: "sign_in" })}
            </Button>
            {message && (
              <div
                className="mt-2 text-center"
                style={{
                  color:
                    message.includes("failed") || message.includes("install")
                      ? "red"
                      : "green",
                }}
              >
                {message}
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SignIn;
