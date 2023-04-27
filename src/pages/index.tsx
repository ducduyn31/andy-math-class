import Layout from "@/layout/Layout";
import { ReactElement, useState } from "react";
import UserSelectBookModal from "@/components/UserSelectBookModal";
import UserSelectChapterModal from "@/components/UserSelectChapterModal";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string[]>([]);
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
        setStep={setStep}
      />
    </>
  );
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
