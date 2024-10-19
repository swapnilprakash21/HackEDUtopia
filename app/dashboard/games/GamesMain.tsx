"use client"

/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Game {
  title: string;
  grade: string;
  subject: string;
  accuracy: string;
  difficulty: string;
  image: string;
  link: string;
}

const GamesMain: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const Games: Game[] = [
    {
      title: 'Animal Wisdom',
      grade: '8th - 12th',
      subject: 'Science',
      accuracy: '72%',
      difficulty: 'Medium',
      image: 'https://cloud.educaplay.com/r1/img/actividadFROGGY_JUMPS.webp?v=1729161249',
      link: 'https://www.educaplay.com/game/11012648-animal_wisdom.html',
    },
    {
      title: 'The Photosynthesis Process',
      grade: '6th - 8th',
      subject: 'Biology',
      accuracy: '89%',
      difficulty: 'Easy',
      image: 'https://cloud.educaplay.com/r1/img/actividadRELACIONAR_COLUMNAS.webp?v=1729161249',
      link: 'https://www.educaplay.com/game/7450284-the_photosynthesis_process.html',
    },
    {
      title: 'Heat and Light',
      grade: '10th - 12th',
      subject: 'Physics',
      accuracy: '64%',
      difficulty: 'Hard',
      image: 'https://cloud.educaplay.com/r1/img/actividadCOMPLETAR.webp?v=1729161249',
      link: 'https://www.educaplay.com/game/2869310-5_1_heat_and_light.html',
    },
    {
      title: 'The ecological footprint',
      grade: '5th - 8th',
      subject: 'Science',
      accuracy: '84%',
      difficulty: 'Easy',
      image: 'https://cloud.educaplay.com/r1/img/actividadTEST.webp?v=1729161249',
      link: 'https://www.educaplay.com/game/17298985-la_huella_ecologica.html',
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      disable: 'mobile',
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpened ? 'hidden' : 'auto';
  }, [modalOpened]);

  const closeModal = () => {
    setModalOpened(false);
    setModalIndex(null);
  };

  const openModal = (index: number) => {
    setModalOpened(true);
    setModalIndex(index);
  };

  return (
    <>
      <Head>
        <title>Play Exciting Gamezes - cyberX</title>
      </Head>
      <div className="px-2 lg:px-6 py-3 lg:py-8 bg-gray-100 min-h-screen">
        <div className="text-4xl font-bold text-gray-600 py-5">
          <h1>Play Exciting Games</h1>
        </div>
        <div className="flex flex-wrap py-9 justify-center items-center md:space-x-2 lg:space-x-9 space-y-5 px-3">
            <div></div>
          {Games.map((Game, index) => (
            <div
              className="border border-gray-400 shadow-lg rounded-lg h-[35rem] w-96 bg-white relative"
              key={index}
              data-aos="zoom-in"
            >
              <img
                src={Game.image}
                alt={Game.title}
                className="h-60 rounded-tl-lg rounded-tr-lg w-full"
              />
              <div className="py-3 px-4">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span className="font-semibold">{Game.title}</span>
                  </Typography>
                  <div className="text-gray-700">
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Grade</span>:{' '}
                      {Game.grade}
                    </p>
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Subject</span>:{' '}
                      {Game.subject}
                    </p>
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Accuracy</span>:{' '}
                      {Game.accuracy}
                    </p>
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Difficulty</span>:{' '}
                      {Game.difficulty}
                    </p>
                  </div>
                </CardContent>
                <CardActions>
                  <div
                    onClick={() => {
                      openModal(index);
                    }}
                    className="absolute bottom-6"
                  >
                    <Button variant="outlined" color="warning">
                      Play Now
                    </Button>
                  </div>
                </CardActions>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalOpened && modalIndex !== null && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-40 box-border">
          <div className="flex justify-center h-full w-full">
            <div className="bg-white shadow-lg w-full h-full py-2 absolute top-0 overflow-hidden">
              <div className="flex justify-between items-center p-2 px-6">
                <div className="text-lg md:text-3xl font-semibold">
                  <span>{Games[modalIndex].title}</span>
                </div>
                <button
                  onClick={closeModal}
                  className="text-4xl font-bold text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="flex justify-center items-center h-[94.5%] py-2">
                <iframe
                  className="h-full box-border w-full bg-[url('/images/loading.gif')] bg-center bg-no-repeat"
                  src={Games[modalIndex].link}
                  title={Games[modalIndex].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ backgroundSize: '2.7rem' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GamesMain;
