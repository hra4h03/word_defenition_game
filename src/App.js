import React, { useEffect, useState, useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import { Answer } from "./components/Answer";
import { Loader } from "./components/Loader";
import { useLocalStorage } from "./hooks/useLocalStorage";
const storageName = "gameInfo";
const key = "udydrloa7v16d3bo5dmmvutycbxaht4021wxrfu09nrhzmhcd";

const randomWordURL =
  "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=1&maxLength=-1&limit=4&api_key=" +
  key;

const selectRandomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];

function App() {
  const getAPI = useFetch();
  const [words, setWords] = useState([]);
  const [rightWord, setRightWord] = useState(null);

  const { getItem, setItem } = useLocalStorage();

  const [gameInfo, setGameInfo] = useState(() =>
    getItem(storageName)
      ? getItem(storageName)
      : {
          question: 1,
          rightAnswers: 0,
          tries: 0,
        }
  );
  useEffect(() => {
    setItem(storageName, gameInfo);
  }, [gameInfo, setItem]);

  const wordDefenitionURL = useMemo(() => {
    return rightWord?.word && !rightWord?.defenition
      ? `https://api.wordnik.com/v4/word.json/${rightWord.word}/definitions?limit=20&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=${key}`
      : false;
  }, [rightWord]);

  useEffect(() => {
    if (wordDefenitionURL) {
      setTimeout(async () => {
        let d = await getAPI(wordDefenitionURL);
        setRightWord((c) => ({ ...c, defenition: d[1]?.text }));
      }, 2000);
    }
  }, [getAPI, wordDefenitionURL]);

  useEffect(() => {
    getAPI(randomWordURL).then((d) => {
      setWords(() => d);
      setRightWord(() => ({
        word: selectRandomEl(d)?.word,
      }));
    });
  }, [getAPI, gameInfo.question]);

  useEffect(() => {
    console.log("getAPI changed");
  }, [getAPI]);
  useEffect(() => {
    console.group("right word");
    console.log("right word");
    console.log(rightWord);
    console.groupEnd();
  }, [rightWord]);

  const [bodyColor, setBodyColor] = useState([]);
  const clickHandler = (isRight, addClass) => {
    if (isRight) {
      addClass("right_answer");
      addClass("right_answer_text");
      setBodyColor(["right_answer"]);
      setTimeout(() => {
        setGameInfo((gameInfo) => ({
          rightAnswers: gameInfo.rightAnswers + 1,
          question: gameInfo.question + 1,
          tries: gameInfo.tries + 1,
        }));
      }, 1000);
    } else {
      setGameInfo((gameInfo) => ({
        ...gameInfo,
        tries: gameInfo.tries + 1,
      }));

      setBodyColor(["wrong_answer"]);
      addClass("wrong_answer");
      addClass("wrong_answer_text");
    }
  };
  return (
    <div
      style={{
        transition: "all 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
      className={bodyColor.join(" ")}
    >
      <div className="question_card">
        <div className="game_info">
          <div>
            Question: {gameInfo.question}&nbsp; | &nbsp;Right Answers:{" "}
            {gameInfo.rightAnswers}
          </div>
          <div>
            Accuracy:&nbsp;
            {`${
              Math.round((gameInfo.rightAnswers / gameInfo.tries) * 100)
                ? Math.round((gameInfo.rightAnswers / gameInfo.tries) * 100)
                : 0
            }%`}
          </div>
        </div>
        {rightWord?.defenition ? (
          <div className="game_section">
            <div
              className="question_defenition"
              dangerouslySetInnerHTML={{
                __html: rightWord?.defenition,
              }}
            ></div>
            <div className="question_answers">
              {words.length &&
                rightWord?.word &&
                words.map(({ word }, i) => (
                  <Answer
                    key={i}
                    word={word}
                    isRight={!!(word === rightWord?.word)}
                    clickHandler={clickHandler}
                  />
                ))}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default App;
