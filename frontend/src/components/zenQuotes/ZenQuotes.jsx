import axios from "@services/axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Stack, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./zenQuotes.css";
import { AuthContext } from "../../context/AuthContext";

const ZenQuotes = (props) => {
  const { showSearch, zenContent } = props;
  const [quote, setQuote] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const rand = Math.floor(Math.random() * 1643);

  const SearchHandel = () => {
    // const url = "https://zenquotes.io/api/random/";
    const url = "https://type.fit/api/quotes";
    axios
      .get(url)
      .then((response) => {
        setQuote(response.data[rand]);
        setDataLoaded(true);
        console.log(quote);
      })
      .catch((err) => console.log(err));
  };

  const createZenPost = async (e) => {
    e.preventDefault();
    const nPost = {
      userId: user._id,
      postContent: "zenquote",
      zenContent: quote,
      postTitle: "Zenquote",
      postType: "zenquote",
      username: user.username,
      likes: [],
      comments: [],
      profilePic: "src/assets/images/icon.png",
    };
    try {
      await axios.post("/posts", nPost);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (zenContent) {
      setQuote(zenContent);
    } else {
      SearchHandel();
    }
  }, []);

  return (
    <Container>
      <Card className="">
        {showSearch ? (
          <div>
            <Card.Title className="title">
              Get your daily Zen inspiration
            </Card.Title>

            <Button
              onClick={SearchHandel}
              className="mx-auto d-block"
              variant="outline-secondary"
            >
              Give me more inspiration
            </Button>
          </div>
        ) : null}
        {/* <h2>{dataLoaded ? quote.text : null}</h2> */}
        <h2>{quote.text}</h2>
        <h5>{quote.author}</h5>

        {showSearch ? (
          <Button className="" onClick={createZenPost}>
            Share the quote
          </Button>
        ) : null}
      </Card>
    </Container>
  );
};
export default ZenQuotes;
