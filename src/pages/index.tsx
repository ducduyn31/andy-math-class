import Layout from "@/layout/Layout";
import { ReactElement, useState } from "react";
import UserSelectBookModal from "@/components/UserSelectBookModal";
import UserSelectChapterModal from "@/components/UserSelectChapterModal";
import QuestionAnswerPanel from "@/components/QuestionAnswerPanel";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [finished, setFinished] = useState(false);
  return (
    <>
      <UserSelectBookModal
        show={step == 0}
        setSelectedBook={setSelectedBook}
        selectedBook={selectedBook}
        setStep={setStep}
      />
      <UserSelectChapterModal
        show={step == 1}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
        setFinished={setFinished}
        setCurrentQuestion={setCurrentQuestion}
        setStep={setStep}
      />
      <QuestionAnswerPanel
        selectedQuestions={selectedQuestions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        finished={finished}
        setFinished={setFinished}
        show={step == 3}
        setStep={setStep}
      />
    </>
  );
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
