import { useMemo, useState } from "react";
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

  const finished = useMemo(() => {
    return currentQuestionId + 1 === questions.length;
  }, [currentQuestionId, questions.length]);

  if (!questions || questions.length === 0) return null;

  return (
    <div className={"flex justify-center items-center"}>
      <div className="card lg:w-9/12 bg-base-100 shadow-xl whitespace-normal">
        <div className="card-body">
          {!finished && (
            <>
              <h2 className="card-title">
                Question {currentQuestionId + 1} / {questions.length}
              </h2>
              <img
                src={`https://placehold.co/600x400?text=Question+Image+${currentQuestion.name}`}
                className={"rounded-3xl"}
                alt={currentQuestion.name}
              />
              {shouldShowAnswer && <p>{currentQuestion.description}</p>}
              {shouldShowAnswer ? (
                answers.map((answer) => (
                  <img
                    key={answer.id}
                    alt={answer.name}
                    src={`https://placehold.co/600x400?text=${answer.name}`}
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
                    if (currentQuestionId !== questions.length) {
                      toast.success(
                        `Finished question ${currentQuestionId + 1}`
                      );
                      setShouldShowAnswer(false);
                      next();
                    }
                  }}
                >
                  {currentQuestionId == questions.length - 1
                    ? "Finish"
                    : "Next"}
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
              <button className={"btn mt-5"} onClick={() => setStateAt(0)}>
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
