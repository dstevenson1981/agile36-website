"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the primary responsibility of a SAFe Scrum Master within an Agile Team?",
    options: {
      A: "Direct the team's day-to-day assignments",
      B: "Ensure the team follows Agile principles and removes barriers",
      C: "Approve all feature releases",
      D: "Define technical architecture"
    },
    correct: "B"
  },
  {
    id: 2,
    question: "During Iteration Planning, what should the team focus on establishing first?",
    options: {
      A: "A list of risks to escalate",
      B: "The upcoming iteration goal",
      C: "The final PI Objectives",
      D: "The measurement plan for business outcomes"
    },
    correct: "B"
  },
  {
    id: 3,
    question: "What is the purpose of the Daily Stand-Up?",
    options: {
      A: "Review completed PI Objectives",
      B: "Synchronize the team and identify blockers",
      C: "Assign tasks for the day",
      D: "Discuss architectural runway changes"
    },
    correct: "B"
  },
  {
    id: 4,
    question: "Which activity occurs during the Iteration Retrospective?",
    options: {
      A: "Present system-level demos to stakeholders",
      B: "Inspect team processes and define improvements",
      C: "Finalize acceptance of features",
      D: "Estimate upcoming features for the PI"
    },
    correct: "B"
  },
  {
    id: 5,
    question: "Which role is responsible for managing the Program Kanban?",
    options: {
      A: "Release Train Engineer",
      B: "Product Owner",
      C: "Scrum Master",
      D: "Architect"
    },
    correct: "A"
  },
  {
    id: 6,
    question: "Why is the System Demo important?",
    options: {
      A: "It displays integrated value from all teams on the ART",
      B: "It is used to approve PI budgets",
      C: "It eliminates the need for team demos",
      D: "It replaces solution demos"
    },
    correct: "A"
  },
  {
    id: 7,
    question: "What is the Product Owner primarily accountable for?",
    options: {
      A: "Updating the Program Backlog",
      B: "Prioritizing the Team Backlog",
      C: "Managing team performance reviews",
      D: "Directing iteration execution"
    },
    correct: "B"
  },
  {
    id: 8,
    question: "Which action supports relentless improvement?",
    options: {
      A: "Avoiding experiments that might fail",
      B: "Using retrospectives to identify improvement actions",
      C: "Skipping inspect and adapt when busy",
      D: "Limiting feedback loops"
    },
    correct: "B"
  },
  {
    id: 9,
    question: "What is the recommended SAFe approach to estimating work?",
    options: {
      A: "Exact hour-by-hour estimation",
      B: "Point-based relative estimation",
      C: "Financial cost estimation only",
      D: "Estimation based on lines of code"
    },
    correct: "B"
  },
  {
    id: 10,
    question: "Why are WIP limits important?",
    options: {
      A: "They help teams deliver value faster by reducing multitasking",
      B: "They restrict innovation",
      C: "They eliminate the need for standups",
      D: "They simplify Product Owner responsibilities"
    },
    correct: "A"
  },
  {
    id: 11,
    question: "What is the purpose of the Team PI Objective?",
    options: {
      A: "Describe a technical design",
      B: "Communicate the business intent of planned work",
      C: "Summarize the retrospective results",
      D: "Define the test strategy"
    },
    correct: "B"
  },
  {
    id: 12,
    question: "What should a Scrum Master encourage when a team member identifies a blocker?",
    options: {
      A: "Wait until the next retrospective to discuss it",
      B: "Raise it in the daily standup or immediately for removal",
      C: "Document it for leadership but take no action",
      D: "Ignore it if the iteration is nearly over"
    },
    correct: "B"
  },
  {
    id: 13,
    question: "What is the best way for a Scrum Master to support team self-management?",
    options: {
      A: "Assign tasks to members directly",
      B: "Facilitate collaboration and allow the team to decide how to work",
      C: "Create the team's iteration plan alone",
      D: "Monitor team hours daily"
    },
    correct: "B"
  },
  {
    id: 14,
    question: "What is an ART Sync designed to accomplish?",
    options: {
      A: "Provide detailed feature-level estimates",
      B: "Coordinate ART-level progress and risks",
      C: "Approve new value streams",
      D: "Review architectural runway"
    },
    correct: "B"
  },
  {
    id: 15,
    question: "During planning, what should a Scrum Master help the team evaluate?",
    options: {
      A: "Their capacity for the iteration",
      B: "The cost model of the entire PI",
      C: "Release timing for all features in the train",
      D: "Architectural compliance reports"
    },
    correct: "A"
  },
  {
    id: 16,
    question: "Which ceremony gives stakeholders visibility into the team's accomplishments?",
    options: {
      A: "Iteration Review",
      B: "ART Sync",
      C: "Daily Standup",
      D: "Backlog Refinement"
    },
    correct: "A"
  },
  {
    id: 17,
    question: "What does the Scrum Master do during the Inspect and Adapt event?",
    options: {
      A: "Finalize team-level feature designs",
      B: "Facilitate problem-solving and improvement workshops",
      C: "Assign improvement tasks",
      D: "Approve PI milestones"
    },
    correct: "B"
  },
  {
    id: 18,
    question: "Why is a cross-functional, stable team important in SAFe?",
    options: {
      A: "It reduces the need for Product Owners",
      B: "It minimizes handoffs and produces faster value flow",
      C: "It simplifies deployment pipelines",
      D: "It focuses teams on only technical work"
    },
    correct: "B"
  },
  {
    id: 19,
    question: "What is the purpose of the IP Iteration?",
    options: {
      A: "Deliver a large batch of features",
      B: "Allow for innovation, improvement, and readiness for the next PI",
      C: "Finalize all defects from the PI",
      D: "Replace team demos"
    },
    correct: "B"
  },
  {
    id: 20,
    question: "What is one sign a Scrum Master may need to coach the team further?",
    options: {
      A: "They hold daily standups",
      B: "They consistently exceed sustainable pace",
      C: "They collaborate on backlog refinement",
      D: "They raise risks early"
    },
    correct: "B"
  },
  {
    id: 21,
    question: "Which phrase best describes a Scrum Master's mindset?",
    options: {
      A: "Command and control",
      B: "Servant leadership",
      C: "Top-down management",
      D: "Directive coaching"
    },
    correct: "B"
  },
  {
    id: 22,
    question: "Which event helps the team maintain a clear understanding of upcoming work?",
    options: {
      A: "System Demo",
      B: "Backlog Refinement",
      C: "Inspect and Adapt",
      D: "IP Iteration"
    },
    correct: "B"
  },
  {
    id: 23,
    question: "What should the Scrum Master do when conflict arises in the team?",
    options: {
      A: "Suppress disagreements",
      B: "Facilitate constructive dialogue",
      C: "Reassign team members",
      D: "Allow it to escalate"
    },
    correct: "B"
  },
  {
    id: 24,
    question: "Which element of SAFe helps teams better understand dependencies?",
    options: {
      A: "Program Kanban",
      B: "PI Planning",
      C: "Daily Standup",
      D: "Iteration Review"
    },
    correct: "B"
  },
  {
    id: 25,
    question: "What happens when teams maintain a sustainable pace?",
    options: {
      A: "Higher long-term productivity and quality",
      B: "Longer lead times",
      C: "More defects",
      D: "More handoffs"
    },
    correct: "A"
  },
  {
    id: 26,
    question: "What is the purpose of pairing and swarming?",
    options: {
      A: "Assigning work only to specialists",
      B: "Increasing collaboration to complete work faster",
      C: "Eliminating iteration goals",
      D: "Reducing the need for testing"
    },
    correct: "B"
  },
  {
    id: 27,
    question: "Which SAFe tool helps visualize and address ART-wide risks?",
    options: {
      A: "ROAM board",
      B: "Kanban board",
      C: "Iteration Backlog",
      D: "Definition of Done"
    },
    correct: "A"
  },
  {
    id: 28,
    question: "What is the Scrum Master's role during the team's Iteration Review?",
    options: {
      A: "Approve feature acceptance",
      B: "Facilitate the session and support effective feedback",
      C: "Present architectural changes",
      D: "Approve incremental funding"
    },
    correct: "B"
  },
  {
    id: 29,
    question: "Which activity is the Scrum Master expected to support before PI Planning?",
    options: {
      A: "Backlog readiness for the team",
      B: "Finalizing all story acceptance tests",
      C: "Approving the team's PI budget",
      D: "Creating deployment pipelines"
    },
    correct: "A"
  },
  {
    id: 30,
    question: "Why is psychological safety important on Agile teams?",
    options: {
      A: "It reduces the need for retrospectives",
      B: "It encourages open communication, experimentation, and learning",
      C: "It ensures all work is documented",
      D: "It eliminates the need for coaching"
    },
    correct: "B"
  },
  {
    id: 31,
    question: "Which statement describes a high-performing Agile team?",
    options: {
      A: "Work is primarily assigned by the Scrum Master",
      B: "They collaborate, self-organize, and deliver value consistently",
      C: "They work in isolation to maximize focus",
      D: "They rely on management for all decisions"
    },
    correct: "B"
  },
  {
    id: 32,
    question: "What is the Scrum Master's responsibility during the PI execution phase?",
    options: {
      A: "Manage multiple team backlogs",
      B: "Remove impediments and support flow across the team and ART",
      C: "Approve features",
      D: "Directly manage the release process"
    },
    correct: "B"
  },
  {
    id: 33,
    question: "What is the benefit of the Definition of Done?",
    options: {
      A: "It guarantees release timing",
      B: "It ensures work meets agreed quality standards",
      C: "It replaces acceptance criteria",
      D: "It describes business outcomes"
    },
    correct: "B"
  },
  {
    id: 34,
    question: "What is one reason a team might struggle with meeting Iteration commitments?",
    options: {
      A: "They refine their backlog regularly",
      B: "They frequently pull in unplanned work",
      C: "They maintain WIP limits",
      D: "They collaborate on sizing"
    },
    correct: "B"
  },
  {
    id: 35,
    question: "During PI Planning, what should the Scrum Master help identify?",
    options: {
      A: "Coding standards",
      B: "Risks, dependencies, and capacity limits",
      C: "Story point conversions to hours",
      D: "Exact release date commitments"
    },
    correct: "B"
  },
  {
    id: 36,
    question: "What is a key outcome of successful PI Planning?",
    options: {
      A: "A complete list of defects",
      B: "A shared understanding of objectives across teams",
      C: "Finalized test scripts",
      D: "Updated architectural runway"
    },
    correct: "B"
  },
  {
    id: 37,
    question: "Which role leads ART-level coaching?",
    options: {
      A: "System Architect",
      B: "Release Train Engineer",
      C: "Product Owner",
      D: "Scrum Master"
    },
    correct: "B"
  },
  {
    id: 38,
    question: "What should teams focus on when sizing stories?",
    options: {
      A: "Precision down to the hour",
      B: "Relative complexity and effort",
      C: "Financial cost",
      D: "Architectural runway"
    },
    correct: "B"
  },
  {
    id: 39,
    question: "What is the main benefit of limiting batch sizes?",
    options: {
      A: "Faster feedback and shorter delivery cycles",
      B: "More documentation",
      C: "Fewer planning sessions",
      D: "Higher complexity"
    },
    correct: "A"
  },
  {
    id: 40,
    question: "Why is the team demo valuable?",
    options: {
      A: "It provides transparency into the team's work and progress",
      B: "It replaces system demos",
      C: "It is used for budgeting",
      D: "It validates architecture"
    },
    correct: "A"
  },
  {
    id: 41,
    question: "What should the Scrum Master do if the team struggles with estimation?",
    options: {
      A: "Estimate everything for the team",
      B: "Coach on relative estimation practices",
      C: "Remove story points altogether",
      D: "Assign story points based on hours"
    },
    correct: "B"
  },
  {
    id: 42,
    question: "What does the Scrum Master use to help visualize workflow and bottlenecks?",
    options: {
      A: "Team charter",
      B: "Kanban board",
      C: "Portfolio canvas",
      D: "Architectural map"
    },
    correct: "B"
  },
  {
    id: 43,
    question: "Which action supports improving flow within the team?",
    options: {
      A: "Increasing WIP",
      B: "Frequent context switching",
      C: "Identifying bottlenecks early",
      D: "Creating larger batches"
    },
    correct: "C"
  },
  {
    id: 44,
    question: "What is one characteristic of effective servant leadership?",
    options: {
      A: "Commanding team actions",
      B: "Putting the needs of the team first",
      C: "Controlling all decisions",
      D: "Enforcing strict hierarchy"
    },
    correct: "B"
  },
  {
    id: 45,
    question: "Brand-new question: Which activity best reflects a Scrum Master removing organizational impediments?",
    options: {
      A: "Finalizing the team's PI roadmap",
      B: "Escalating systemic blockers that affect multiple teams",
      C: "Assigning backlog items directly",
      D: "Approving architectural designs"
    },
    correct: "B"
  }
];

export default function ScrumMasterPracticeExam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const handleAnswerSelect = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (answeredQuestions === totalQuestions) {
      setShowResults(true);
    } else {
      const unanswered = totalQuestions - answeredQuestions;
      if (confirm(`You have ${unanswered} unanswered question(s). Are you sure you want to submit?`)) {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    };
  };

  const getWrongAnswers = () => {
    return questions.filter((q) => {
      const userAnswer = answers[q.id];
      return userAnswer && userAnswer !== q.correct;
    });
  };

  // Start timer when component mounts
  useEffect(() => {
    if (!timeStarted) {
      setTimeStarted(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showResults) {
    const score = calculateScore();
    const wrongAnswers = getWrongAnswers();

    return (
      <main className="min-h-screen bg-[#f0f9ff]">
        {/* Header */}
        <header className="w-full bg-[#e8f0f5] border-b border-gray-200 sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center">
                <div className="h-28 sm:h-32 w-auto">
                  <Image
                    src="/Agile36Logo.png"
                    alt="Agile36 Logo"
                    width={360}
                    height={128}
                    className="h-28 sm:h-32 w-auto object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
          </nav>
        </header>

        {/* Results Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Practice Exam Results
              </h1>

              {/* Score Display */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-br from-blue-500 to-blue-700 rounded-full p-8 mb-4">
                  <div className="text-white">
                    <div className="text-5xl font-bold">{score.percentage}%</div>
                    <div className="text-lg mt-2">
                      {score.correct} / {score.total} Correct
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">
                  {score.percentage >= 80 
                    ? "🎉 Excellent! You're well prepared for the exam!"
                    : score.percentage >= 60
                    ? "👍 Good effort! Review the incorrect answers to improve."
                    : "📚 Keep studying! Review all questions and try again."}
                </p>
              </div>

              {/* Wrong Answers Section */}
              {wrongAnswers.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Questions You Got Wrong ({wrongAnswers.length})
                  </h2>
                  <div className="space-y-6">
                    {wrongAnswers.map((question) => {
                      const userAnswer = answers[question.id];
                      return (
                        <div
                          key={question.id}
                          className="border-2 border-red-200 rounded-lg p-6 bg-red-50"
                        >
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                                Question {question.id}
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                              {question.question}
                            </p>
                          </div>

                          <div className="space-y-2 mb-4">
                            {Object.entries(question.options).map(([key, value]) => {
                              const isCorrect = key === question.correct;
                              const isUserAnswer = key === userAnswer;
                              let bgColor = "bg-white";
                              let borderColor = "border-gray-300";

                              if (isCorrect) {
                                bgColor = "bg-green-100";
                                borderColor = "border-green-500";
                              } else if (isUserAnswer) {
                                bgColor = "bg-red-100";
                                borderColor = "border-red-500";
                              }

                              return (
                                <div
                                  key={key}
                                  className={`${bgColor} ${borderColor} border-2 rounded-lg p-3 flex items-start gap-3`}
                                >
                                  <span
                                    className={`font-bold ${
                                      isCorrect
                                        ? "text-green-700"
                                        : isUserAnswer
                                        ? "text-red-700"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {key}.
                                  </span>
                                  <span
                                    className={`flex-1 ${
                                      isCorrect
                                        ? "text-green-900 font-semibold"
                                        : isUserAnswer
                                        ? "text-red-900"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {value}
                                    {isCorrect && (
                                      <span className="ml-2 text-green-700 font-bold">
                                        ✓ Correct Answer
                                      </span>
                                    )}
                                    {isUserAnswer && !isCorrect && (
                                      <span className="ml-2 text-red-700 font-bold">
                                        ✗ Your Answer
                                      </span>
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => setShowRetakeModal(true)}
                  className="flex-1 bg-[#01203d] hover:bg-[#023a6b] text-white font-bold py-3 px-6 rounded-md transition-colors text-center"
                >
                  Retake Exam
                </button>
                <Link
                  href="/test"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors text-center"
                >
                  Back to Practice Tests
                </Link>
              </div>

              {/* Retake Exam Modal */}
              {showRetakeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                    <button
                      onClick={() => setShowRetakeModal(false)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-600 text-xl">×</span>
                    </button>
                    <div className="text-center">
                      <div className="mb-4">
                        <svg
                          className="mx-auto h-12 w-12 text-[#fa4a23]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        One Practice Test Limit
                      </h3>
                      <p className="text-gray-700 mb-6">
                        You can only take one practice test. Please contact us if you need additional attempts.
                      </p>
                      <button
                        onClick={() => setShowRetakeModal(false)}
                        className="w-full bg-[#01203d] hover:bg-[#023a6b] text-white font-bold py-3 px-6 rounded-md transition-colors"
                      >
                        Understood
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f9ff]">
      {/* Header */}
      <header className="w-full bg-[#e8f0f5] border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="h-28 sm:h-32 w-auto">
                <Image
                  src="/Agile36Logo.png"
                  alt="Agile36 Logo"
                  width={360}
                  height={128}
                  className="h-28 sm:h-32 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="text-sm font-semibold text-gray-700">
              SAFe Scrum Master Practice Exam
            </div>
          </div>
        </nav>
      </header>

      {/* Exam Section */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {answeredQuestions} / {totalQuestions} Answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#fa4a23] h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {Object.entries(currentQuestion.options).map(([key, value]) => {
                  const isSelected = answers[currentQuestion.id] === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-[#fa4a23] bg-[#fff5f3]"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`font-bold ${
                            isSelected ? "text-[#fa4a23]" : "text-gray-700"
                          }`}
                        >
                          {key}.
                        </span>
                        <span
                          className={`flex-1 ${
                            isSelected ? "text-gray-900 font-medium" : "text-gray-700"
                          }`}
                        >
                          {value}
                        </span>
                        {isSelected && (
                          <svg
                            className="w-5 h-5 text-[#fa4a23]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                currentQuestionIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              ← Previous
            </button>

            <div className="text-lg font-semibold text-gray-700">
              {currentQuestionIndex + 1} / {totalQuestions}
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[#01203d] hover:bg-[#023a6b] text-white rounded-md font-semibold transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#fa4a23] hover:bg-[#e03d1a] text-white rounded-md font-semibold transition-colors"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}



