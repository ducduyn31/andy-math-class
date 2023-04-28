import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  selectedQuestions: number;
  show: boolean;
  setStep: any;
  currentQuestion: number;
  setCurrentQuestion: any;
  finished: boolean;
  setFinished: any;
}
const QuestionAnswerPanel: React.FC<Props> = ({
  selectedQuestions,
  show,
  setStep,
  currentQuestion,
  setCurrentQuestion,
  finished,
  setFinished,
}) => {
  if (!show) return <></>;

  return (
    <div className={"flex justify-center items-center"}>
      <div className="card lg:w-9/12 bg-base-100 shadow-xl whitespace-normal">
        <div className="card-body">
          {!finished && (
            <>
              <h2 className="card-title">
                Question {currentQuestion} / {selectedQuestions}
              </h2>
              <img
                src={`https://placehold.co/600x400?text=Question+Image+${currentQuestion}`}
                className={"rounded-3xl"}
              />

              <img
                src={`https://placehold.co/600x400?text=Answer+Image+${currentQuestion}`}
                className={"rounded-3xl"}
              />
              <div className="card-actions justify-end">
                <button
                  className="btn btn-secondary"
                  disabled={currentQuestion == 1}
                  onClick={() =>
                    setCurrentQuestion((prevState: number) =>
                      Math.max(prevState - 1, 0)
                    )
                  }
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (currentQuestion !== selectedQuestions) {
                      toast.success(`Finished question ${currentQuestion}`);
                      setCurrentQuestion((prevState: number) =>
                        Math.min(prevState + 1, selectedQuestions)
                      );
                    } else {
                      setFinished(true);
                    }
                  }}
                >
                  {currentQuestion == selectedQuestions ? "Finish" : "Next"}
                </button>
              </div>
            </>
          )}

          {finished && (
            <div className={"flex flex-col justify-between min-h-[250px]"}>
              <h1 className={"text-center text-2xl"}>
                Congratulations, you have finished all {selectedQuestions}{" "}
                questions!
              </h1>
              <h1 className={"text-center text-5xl"}>&#127881; &#127881;</h1>
              <button className={"btn mt-5"} onClick={() => setStep(0)}>
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
