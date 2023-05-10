import React, { useState } from "react";
import toast from "react-hot-toast";
import { Question } from "@/models";
import { useStateList } from "react-use";
import { useGetAnswersAsync } from "@/hooks/use-get-answers-async";

interface Props {
  questions: Question[];
}

export const QuestionAnswerPanel: React.FC<Props> = ({ questions }) => {
  const {
    state: currentQuestion,
    currentIndex: currentQuestionId,
    setStateAt,
    next,
    prev,
  } = useStateList(questions);

  const [shouldShowAnswer, setShouldShowAnswer] = useState(false);
  const { getAnswers, answers } = useGetAnswersAsync();

  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const imageUrl = (id: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/class-questions/${id}`;

  return (
    <div className={"flex justify-center items-center"}>
      <div className="card lg:w-9/12 bg-base-100 shadow-xl whitespace-normal">
        <div className="card-body">
          {!finished && (
            <>
              <h2 className="card-title">
                Question {currentQuestionId + 1} / {questions.length}
              </h2>
              {currentQuestion?.questionImages?.map((image) => (
                <img
                  key={image}
                  src={imageUrl(image)}
                  className={"rounded-3xl"}
                  alt={currentQuestion.name}
                />
              ))}
              {shouldShowAnswer && <p>{currentQuestion.description}</p>}
              {shouldShowAnswer ? (
                answers.map((answer) => (
                  <img
                    key={answer.id}
                    alt={answer.name}
                    src={imageUrl(answer.name)}
                    className={"rounded-3xl"}
                  />
                ))
              ) : (
                <button
                  className="btn btn-primary mt-5"
                  onClick={() => {
                    setShouldShowAnswer(true);
                    getAnswers(currentQuestion.id);
                  }}
                >
                  Show Answer
                </button>
              )}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-secondary"
                  disabled={currentQuestionId == 0}
                  onClick={prev}
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (currentQuestionId < questions.length - 1) {
                      toast.success(
                        `Finished question ${currentQuestionId + 1}`
                      );
                      setShouldShowAnswer(false);
                      next();
                    } else {
                      setFinished(true);
                    }
                  }}
                >
                  {currentQuestionId < questions.length - 1 ? "Next" : "Finish"}
                </button>
              </div>
            </>
          )}

          {finished && (
            <div className={"flex flex-col justify-between min-h-[250px]"}>
              <h1 className={"text-center text-2xl"}>
                Congratulations, you have finished all {questions.length}{" "}
                questions!
              </h1>
              <h1 className={"text-center text-5xl"}>&#127881; &#127881;</h1>
              <button
                className={"btn mt-5"}
                onClick={() => {
                  setStateAt(0);
                  setFinished(false);
                }}
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerPanel;
