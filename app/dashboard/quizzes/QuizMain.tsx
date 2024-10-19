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

interface Quiz {
  title: string;
  grade: string;
  subject: string;
  accuracy: string;
  difficulty: string;
  image: string;
  link: string;
}

const QuizMain: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const quizzes: Quiz[] = [
    {
      title: 'Class 10 Chemistry',
      grade: '10th',
      subject: 'Chemistry',
      accuracy: '69%',
      difficulty: 'Medium',
      image: 'https://quizizz.com/_media/quizzes/5f0dfcbf-d087-4d4b-8e50-e6b6f21e9315_200_200',
      link: 'https://quizizz.com/join/quiz/64002cfb5c6261001d5bed89/start',
    },
    {
      title: 'CLASS 11 PHYSICS',
      grade: '11th',
      subject: 'Physics',
      accuracy: '57%',
      difficulty: 'Hard',
      image: 'https://storage.needpix.com/rsynced_images/newtons-2891856_1280.jpg',
      link: 'https://quizizz.com/join/quiz/5f63a3e71ec31f001b5833bd/start',
    },
    {
      title: 'Computer Class 11 (Hard LVL)',
      grade: '11th',
      subject: 'Computer Science',
      accuracy: '64%',
      difficulty: 'Hard',
      image: 'https://quizizz.com/_media/quizzes/823934d7-ee5e-47aa-b1e5-1b4c4838280d_200_200',
      link: 'https://quizizz.com/join/quiz/61613503702bce001e67e26e/start?from=admin',
    },
    {
      title: 'English 12',
      grade: '12th',
      subject: 'English',
      accuracy: '64%',
      difficulty: 'Medium',
      image: 'https://quizizz.com/_media/quizzes/4b869ace-5c4c-439b-8fbc-15ba003612a1_900_900',
      link: 'https://quizizz.com/join/quiz/5e8075d731c435001b207229/start',
    },
    {
      title: 'Class 10 Science',
      grade: '10th',
      subject: 'Science',
      accuracy: '52%',
      difficulty: 'Hard',
      image: 'https://img.freepik.com/free-vector/science-word-theme_23-2148540555.jpg',
      link: 'https://quizizz.com/join/quiz/5ee2f49bdee823001b7891ea/start',
    },
    {
      title: 'Class 11 Maths',
      grade: '11th',
      subject: 'Maths',
      accuracy: '71%',
      difficulty: 'Medium',
      image: 'https://img.jagranjosh.com/imported/images/E/Articles/maths2.webp',
      link: 'https://quizizz.com/join/quiz/5f294d3472dcc3001b4733d6/start',
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
        <title>Play Exciting Quizzes - cyberX</title>
      </Head>
      <div className="px-2 lg:px-6 py-3 lg:py-8 bg-gray-100 min-h-screen">
        <div className="text-4xl font-bold text-gray-600 py-5">
          <h1>Play Exciting Quizzes</h1>
        </div>
        <div className="flex flex-wrap py-9 justify-center items-center md:space-x-2 lg:space-x-9 space-y-5 px-3">
            <div></div>
          {quizzes.map((quiz, index) => (
            <div
              className="border border-gray-400 shadow-lg rounded-lg h-[35rem] w-96 bg-white relative"
              key={index}
              data-aos="zoom-in"
            >
              <img
                src={quiz.image}
                alt={quiz.title}
                className="h-60 w-full rounded-tl-lg rounded-tr-lg"
              />
              <div className="py-3 px-4">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span className="font-semibold">{quiz.title}</span>
                  </Typography>
                  <div className="text-gray-700">
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Grade</span>:{' '}
                      {quiz.grade}
                    </p>
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Subject</span>:{' '}
                      {quiz.subject}
                    </p>
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Accuracy</span>:{' '}
                      {quiz.accuracy}
                    </p>
                    <p className="text-md py-1 pl-4">
                      <span className="font-bold text-green-700">Difficulty</span>:{' '}
                      {quiz.difficulty}
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
                  <span>{quizzes[modalIndex].title}</span>
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
                  src={quizzes[modalIndex].link}
                  title={quizzes[modalIndex].title}
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

export default QuizMain;
