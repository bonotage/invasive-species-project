import React, { useState } from "react";
import cx from "classnames";
import { RingLoader } from "react-spinners";
import { MdKeyboardTab } from "react-icons/md";
import scrollToComponent from "react-scroll-to-component";

import DialogBox from "./DialogBox";
import "./DialogBox.css";

import Game1 from "./Game1";
import Game2 from "./Game2";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { Route, Navigate } from "react-router";

import noviceImg from "./resources/squid-game-minimalist-characters-0.jpg";
import sorceressImg from "./resources/squid-game-minimalist-characters-0.jpg";
import knightImg from "./resources/squid-game-minimalist-characters-1.jpg";
import archerImg from "./resources/squid-game-minimalist-characters-2.jpg";
import bladeMasterImg from "./resources/squid-game-minimalist-characters-3.jpg";
import destroyerImg from "./resources/squid-game-minimalist-characters-4.jpg";
import summonerImg from "./resources/squid-game-minimalist-characters-5.jpg";
import shapeshifterImg from "./resources/squid-game-minimalist-characters-6.jpg";
import banditImg from "./resources/squid-game-minimalist-characters-7.jpg";
import phantomImg from "./resources/knight.jpg";
import styles from "./styles.module.css";
import {
  Header,
  Header2,
  Subheader,
  Content,
  CharacterBox,
  CharacterBox2,
} from "./components";

import audio from "./resources/danube.mp3";

const characterSelections = [
  { type: "Agribusiness", src: sorceressImg, src2: phantomImg },
  { type: "Lanternfly", src: knightImg },
  { type: "Citizen", src: shapeshifterImg },
  { type: "Conservationist", src: banditImg },
  { type: "Government", src: archerImg },
  { type: "Other Plants", src: bladeMasterImg },
  { type: "Farmer", src: destroyerImg },
  // { type: '', src: summonerImg },
  // { type: '', src: phantomImg },
];

const mappedCharSelections = characterSelections.reduce(
  (acc, { type, src }) => ({
    ...acc,
    [type]: src,
  }),
  {}
);

const useLevelUpScreen = ({ morphRef, morphedRef }) => {
  const [selected, setSelected] = React.useState(null);
  const [morphing, setMorphing] = React.useState(false);
  const [morphed, setMorphed] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [shutdown, setShutdown] = React.useState(false);

  const onSelect = (type) => (e) => {
    setSelected(type);
    // scrollToComponent(morphRef.current, {
    //   offset: 300,
    //   align: "bottom",
    //   duration: 1000,
    // });
  };

  const onMorph = () => {
    audioplayer.play();

    setMorphing(true);
    setTimeout(() => {
      setMorphing(false);
      setMorphed(true);
    }, 4000);
  };

  React.useEffect(() => {
    if (morphed && !ready) {
      scrollToComponent(morphedRef.current, {
        offset: 100,
        align: "middle",
        duration: 1000,
      });
      setTimeout(() => {
        setReady(true);
      }, 2000);
    }
  }, [morphed, morphedRef, ready]);

  React.useEffect(() => {
    if (ready && !shutdown) {
      setTimeout(() => {
        setShutdown(true);
      }, 7000);
      // audioplayer.pause();
    }
  }, [ready, shutdown]);

  return {
    selected,
    onSelect,
    morphed,
    morphing,
    onMorph,
    ready,
    shutdown,
  };
};

// const addBodyClass = ("homebody") => document.body.classList.add("homebody");
// document.body.style.backgroundColor = "#047373";

let audioplayer = new Audio(audio);
const start = () => {
  audio.play();
};

const Home = ({ childToParent }) => {
  const morphRef = React.createRef();
  const morphedRef = React.createRef();
  const { selected, onSelect, morphing, morphed, onMorph, ready, shutdown } =
    useLevelUpScreen({
      morphRef,
      morphedRef,
    });

  const startGame = shutdown;
  //   if (startGame) {
  //     setTimeout( () => {console.log("starting game")}, 10000)}

  childToParent(startGame);

  // const [startGame, setStartGame] = useState(false);

  // let history = useNavigate();
  // if (shutdown) {
  //   history.push("./Game1");
  // }

  // setTimeout(() => setStartGame(true), 1000)
  document.body.style.backgroundColor = "#047373";

  if (!startGame) {
    // return (
    //   <div>
    //     <DialogBox />
    //   </div>
    // );

    return (
      <div>
        <Game2></Game2>
      </div>
    );
  } else
    return (
      <body class="homebody">
        <div
          className={cx(styles.root, {
            [styles.shutdown]: shutdown,
            [styles.rootTransition]: morphed,
          })}
        >
          <Header>
            Welcome to <em>The Game</em>
          </Header>
          {/* <Content>
        <CharacterBox
          style={{ width: 200, height: 150 }}
          imgProps={{ src: noviceImg }}
          disableFlashing
        />
      </Content> */}
          {/* <Subheader>Congratulations on reaching level 10!</Subheader> */}
          <div style={{ margin: "25px auto" }}>
            <Subheader>Align with a player to begin</Subheader>
            <Subheader></Subheader>
            <Content display="grid">
              {characterSelections.map((props, index) => (
                <CharacterBox
                  key={`char_selection_${index}`}
                  onClick={onSelect(props.type)}
                  isSelected={selected === props.type}
                  {...props}
                />
              ))}
            </Content>
          </div>
          {/* 
      <div
        ref={morphRef}
        className={cx(styles.morph, {
          [styles.hidden]: !selected,
        })}
      >
        <MdKeyboardTab className={styles.morphArrow} />
        <button
          ref={morphRef}
          name='morph'
          type='button'
          className={styles.morph}
          // style={{ opacity: morphed ? '0.4' : 1 }}
          // onClick={onMorph}
          disabled={morphed}
        >
          Learn More
        </button>
        <MdKeyboardTab className={styles.morphArrowFlipped} />
      </div> */}

          <div
            className={cx({
              [styles.morphed]: morphed,
              [styles.hidden]: !selected,
            })}
          >
            <Header2> {selected} Player Stats</Header2>
            <Content>
              <CharacterBox
                ref={morphedRef}
                type={selected}
                headerProps={{ className: styles.unique }}
                imgProps={{ src: mappedCharSelections[selected] }}
                // src={phantomImg}
              />
              <DialogBox />
            </Content>
            {/* <Subheader>
          You have morphed into a <em>{selected}</em>
        </Subheader> */}
          </div>

          <div
            ref={morphRef}
            className={cx(styles.morph, {
              [styles.hidden]: !selected,
            })}
          >
            <MdKeyboardTab className={styles.morphArrow} />
            <button
              ref={morphRef}
              name="morph"
              type="button"
              className={styles.morph}
              style={{ opacity: morphed ? "0.4" : 1 }}
              onClick={onMorph}
              disabled={morphed}
            >
              {morphing ? "Selecting..." : morphed ? "Please Wait" : "Select"}
            </button>
            <MdKeyboardTab className={styles.morphArrowFlipped} />
          </div>

          <div
            className={cx({
              [styles.morphed]: morphed,
              [styles.hidden]: !morphed,
            })}
          >
            <Header2>We will now commence Game 1</Header2>
            <Content>
              {/* <CharacterBox
              ref={morphedRef}
              type={selected}
              headerProps={{ className: styles.unique }}
              imgProps={{ src: mappedCharSelections[selected] }}
              src={phantomImg}
            /> */}
            </Content>
            <Subheader>
              {/* You have morphed into a <em>{selected}</em> */}
              {/* ~Imagine the Blue Danube is playing right now~ */}
            </Subheader>
          </div>
          <div
            className={cx(styles.next, {
              [styles.hidden]: !ready,
            })}
          >
            <div>
              <RingLoader size={60} color="rgb(213, 202, 255)" loading />
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </body>
    );
};

export default Home;

// index.js:1

//        Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
//     at Navigate (http://localhost:3000/static/js/vendors~main.chunk.js:88645:5)
//     at Router (http://localhost:3000/static/js/vendors~main.chunk.js:88695:15)
//     at BrowserRouter (http://localhost:3000/static/js/vendors~main.chunk.js:88210:5)
//     at App (http://localhost:3000/static/js/main.chunk.js:218:7)
