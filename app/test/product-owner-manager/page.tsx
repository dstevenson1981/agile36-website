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
    question: "What is the primary accountability of a Product Owner in SAFe?",
    options: {
      A: "Managing architectural runway",
      B: "Prioritizing and refining the Team Backlog",
      C: "Coordinating the Agile Release Train",
      D: "Ensuring compliance with budgeting guardrails"
    },
    correct: "B"
  },
  {
    id: 2,
    question: "During PI Planning, what is the Product Manager's main focus?",
    options: {
      A: "Detailing test scripts for teams",
      B: "Communicating vision and prioritizing features",
      C: "Assigning capacity for each team",
      D: "Facilitating retrospective discussions"
    },
    correct: "B"
  },
  {
    id: 3,
    question: "Which statement best describes the relationship between Product Owners and Product Managers?",
    options: {
      A: "They operate independently with no overlap in responsibilities",
      B: "Product Managers ensure strategic alignment, while Product Owners focus on team-level execution",
      C: "Product Owners define vision, Product Managers deliver stories",
      D: "They share a single backlog"
    },
    correct: "B"
  },
  {
    id: 4,
    question: "Why are Features sized to fit within a single PI?",
    options: {
      A: "To simplify story writing",
      B: "To allow incremental learning and predictable delivery",
      C: "To reduce the number of dependencies",
      D: "To eliminate the need for acceptance criteria"
    },
    correct: "B"
  },
  {
    id: 5,
    question: "Which activity helps Product Owners ensure stories meet their intended value?",
    options: {
      A: "Running the System Demo",
      B: "Maintaining alignment with acceptance criteria",
      C: "Creating deployment pipelines",
      D: "Managing the Program Kanban"
    },
    correct: "B"
  },
  {
    id: 6,
    question: "What is the purpose of the Program Backlog?",
    options: {
      A: "Store team-level tasks",
      B: "Hold prioritized features for the ART",
      C: "Track defects from previous PIs",
      D: "Document architectural spikes"
    },
    correct: "B"
  },
  {
    id: 7,
    question: "What should a Feature include to be ready for implementation?",
    options: {
      A: "System-level test cases",
      B: "Completed UX design and technical tasks",
      C: "A clear benefit hypothesis and acceptance criteria",
      D: "All user stories completed"
    },
    correct: "C"
  },
  {
    id: 8,
    question: "Who is responsible for accepting stories during the iteration?",
    options: {
      A: "Release Train Engineer",
      B: "Product Director",
      C: "Product Owner",
      D: "System Architect"
    },
    correct: "C"
  },
  {
    id: 9,
    question: "Which event provides visibility into cross-team progress on the ART?",
    options: {
      A: "Iteration Review",
      B: "Team Sync",
      C: "System Demo",
      D: "PO Sync"
    },
    correct: "C"
  },
  {
    id: 10,
    question: "What is the benefit of splitting a large Feature?",
    options: {
      A: "It reduces dependency mapping",
      B: "It increases innovation time",
      C: "It enables faster feedback and more predictable flow",
      D: "It decreases architectural involvement"
    },
    correct: "C"
  },
  {
    id: 11,
    question: "What is the purpose of the PO Sync?",
    options: {
      A: "Align Product Owners and Product Managers on priorities and progress",
      B: "Review architectural runway",
      C: "Approve new budgets",
      D: "Schedule deployment windows"
    },
    correct: "A"
  },
  {
    id: 12,
    question: "Why do Agile teams use story points?",
    options: {
      A: "To calculate financial cost",
      B: "To estimate relative effort and complexity",
      C: "To determine release schedules",
      D: "To assign work to team members"
    },
    correct: "B"
  },
  {
    id: 13,
    question: "Who determines priority in the Team Backlog?",
    options: {
      A: "Scrum Master",
      B: "Product Owner",
      C: "Architect",
      D: "RTE"
    },
    correct: "B"
  },
  {
    id: 14,
    question: "Which practice helps validate whether a feature provides value?",
    options: {
      A: "Peer review",
      B: "Exploratory testing",
      C: "Benefit hypothesis evaluation",
      D: "Iteration retrospective"
    },
    correct: "C"
  },
  {
    id: 15,
    question: "What is the purpose of refinement sessions?",
    options: {
      A: "Present system-level demos",
      B: "Break features into stories and clarify details",
      C: "Evaluate strategic themes",
      D: "Approve PI budgets"
    },
    correct: "B"
  },
  {
    id: 16,
    question: "What is included in a good user story?",
    options: {
      A: "Detailed technical design",
      B: "Acceptance criteria that outline conditions of satisfaction",
      C: "Exact implementation approach",
      D: "All future tasks required"
    },
    correct: "B"
  },
  {
    id: 17,
    question: "Why is a shared Iteration Goal important?",
    options: {
      A: "It dictates the team's exact workflow",
      B: "It ensures alignment on the value delivered in the iteration",
      C: "It determines the release plan",
      D: "It sets WIP limits"
    },
    correct: "B"
  },
  {
    id: 18,
    question: "Which activity occurs during PI Planning?",
    options: {
      A: "Writing system-level test cases",
      B: "Defining Team PI Objectives",
      C: "Assigning team budgets",
      D: "Forming new Agile teams"
    },
    correct: "B"
  },
  {
    id: 19,
    question: "Why are enablers important?",
    options: {
      A: "They replace the need for features",
      B: "They support architecture and enable future functionality",
      C: "They define system demos",
      D: "They remove the need for spikes"
    },
    correct: "B"
  },
  {
    id: 20,
    question: "What is a key output of PI Planning?",
    options: {
      A: "Portfolio Strategy",
      B: "PI Objectives and draft plans from each team",
      C: "Final production deployment",
      D: "Approved release budgets"
    },
    correct: "B"
  },
  {
    id: 21,
    question: "Which statement describes uncommitted objectives?",
    options: {
      A: "They are mandatory for completion",
      B: "They represent stretch work teams may deliver if capacity allows",
      C: "They are not considered during PI execution",
      D: "They replace committed objectives"
    },
    correct: "B"
  },
  {
    id: 22,
    question: "What is the benefit of continuous customer collaboration?",
    options: {
      A: "It reduces the number of iterations needed",
      B: "It ensures solutions remain valuable and aligned with customer needs",
      C: "It guarantees architectural compliance",
      D: "It eliminates defects"
    },
    correct: "B"
  },
  {
    id: 23,
    question: "Why is the System Demo essential for ART alignment?",
    options: {
      A: "It approves PI budgets",
      B: "It shows integrated value across teams for stakeholder review",
      C: "It replaces team demos",
      D: "It finalizes acceptance criteria"
    },
    correct: "B"
  },
  {
    id: 24,
    question: "Which activity helps ensure a story is ready for acceptance?",
    options: {
      A: "Iteration retrospective",
      B: "Verification that acceptance criteria have been met",
      C: "PO Sync",
      D: "WSJF scoring"
    },
    correct: "B"
  },
  {
    id: 25,
    question: "Which role ensures the team understands the backlog items?",
    options: {
      A: "RTE",
      B: "Product Owner",
      C: "Architect",
      D: "System Team"
    },
    correct: "B"
  },
  {
    id: 26,
    question: "What does WSJF help determine?",
    options: {
      A: "Release dates for features",
      B: "Relative prioritization based on economic value",
      C: "Exact team capacity",
      D: "Iteration goals"
    },
    correct: "B"
  },
  {
    id: 27,
    question: "Which factor is part of Cost of Delay?",
    options: {
      A: "Story points",
      B: "Risk reduction or opportunity enablement",
      C: "Technical debt",
      D: "WIP limits"
    },
    correct: "B"
  },
  {
    id: 28,
    question: "Why are smaller batches preferred?",
    options: {
      A: "They reduce dependencies",
      B: "They improve feedback and speed of learning",
      C: "They remove architectural runway needs",
      D: "They eliminate team demos"
    },
    correct: "B"
  },
  {
    id: 29,
    question: "Who accepts Features once they are completed?",
    options: {
      A: "Product Owner",
      B: "Product Manager",
      C: "Architect",
      D: "Scrum Master"
    },
    correct: "B"
  },
  {
    id: 30,
    question: "Why are PI Objectives valuable for stakeholders?",
    options: {
      A: "They define exact implementation steps",
      B: "They communicate the business intent behind planned work",
      C: "They finalize team capacity",
      D: "They define the architectural roadmap"
    },
    correct: "B"
  },
  {
    id: 31,
    question: "What helps ensure teams stay aligned during PI execution?",
    options: {
      A: "Quarterly budgeting",
      B: "Regular PO and ART Syncs",
      C: "End-of-year reviews",
      D: "System testing only"
    },
    correct: "B"
  },
  {
    id: 32,
    question: "When should a story be split?",
    options: {
      A: "When it cannot be completed within one iteration",
      B: "When it has more than one acceptance criterion",
      C: "When the team is ahead of schedule",
      D: "When the Product Owner requests more documentation"
    },
    correct: "A"
  },
  {
    id: 33,
    question: "What is a key behavior of successful Product Owners?",
    options: {
      A: "Delegating backlog prioritization to the team",
      B: "Actively collaborating with stakeholders and the team",
      C: "Avoiding story refinement",
      D: "Managing all test planning"
    },
    correct: "B"
  },
  {
    id: 34,
    question: "What is one responsibility of the Product Manager?",
    options: {
      A: "Write all team-level user stories",
      B: "Understand customer needs and translate them into features",
      C: "Create iteration plans",
      D: "Lead retrospectives"
    },
    correct: "B"
  },
  {
    id: 35,
    question: "Which tool helps visualize feature progress across the ART?",
    options: {
      A: "Feature Kanban",
      B: "Burndown chart",
      C: "Iteration backlog",
      D: "Velocity chart"
    },
    correct: "A"
  },
  {
    id: 36,
    question: "Why should acceptance criteria be clear and testable?",
    options: {
      A: "To ensure the PO can reject completed work easily",
      B: "To provide alignment and confirm what the story must deliver",
      C: "To simplify PI Planning",
      D: "To shorten iteration length"
    },
    correct: "B"
  },
  {
    id: 37,
    question: "What is the purpose of user-centric design in SAFe?",
    options: {
      A: "Create more tasks",
      B: "Ensure solutions are usable and meet real needs",
      C: "Replace architectural work",
      D: "Define team WIP limits"
    },
    correct: "B"
  },
  {
    id: 38,
    question: "Why is customer feedback important during development?",
    options: {
      A: "It reduces the number of teams required",
      B: "It validates assumptions and improves solution fit",
      C: "It eliminates defects",
      D: "It finalizes PI budgets"
    },
    correct: "B"
  },
  {
    id: 39,
    question: "What is a sign that a story may need refinement?",
    options: {
      A: "The team completes it early",
      B: "It is too large or unclear",
      C: "It has too few acceptance criteria",
      D: "It includes UX design"
    },
    correct: "B"
  },
  {
    id: 40,
    question: "Who ensures that Features align with the ART vision?",
    options: {
      A: "Scrum Master",
      B: "Product Manager",
      C: "RTE",
      D: "QA Lead"
    },
    correct: "B"
  },
  {
    id: 41,
    question: "Why do Agile teams demo their work every iteration?",
    options: {
      A: "To validate the solution with stakeholders",
      B: "To finalize PI objectives",
      C: "To approve new budgets",
      D: "To avoid backlog refinement"
    },
    correct: "A"
  },
  {
    id: 42,
    question: "What is the benefit of cross-team collaboration during PI execution?",
    options: {
      A: "Fewer dependencies",
      B: "Better alignment and faster delivery",
      C: "More documentation",
      D: "Better test coverage"
    },
    correct: "B"
  },
  {
    id: 43,
    question: "Brand-new question: What should a Product Owner do when stakeholders disagree on priority?",
    options: {
      A: "Average the priorities together",
      B: "Use economic reasoning and WSJF to align on value",
      C: "Let the Scrum Master decide",
      D: "Split the backlog evenly"
    },
    correct: "B"
  },
  {
    id: 44,
    question: "Brand-new question: What is a useful indicator that a Feature may need to be split before PI Planning?",
    options: {
      A: "It includes UI work",
      B: "It cannot be completed within one PI",
      C: "It has both enablers and stories",
      D: "It requires demo preparation"
    },
    correct: "B"
  },
  {
    id: 45,
    question: "Brand-new question: What should the team consider when defining an Iteration Goal?",
    options: {
      A: "The business value behind the stories selected",
      B: "The technical tasks assigned by architects",
      C: "The estimated cost of each story",
      D: "The total number of defects in the backlog"
    },
    correct: "A"
  }
];

export default function ProductOwnerManagerPracticeExam() {
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
              SAFe Product Owner/Product Manager Practice Exam
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



