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
    question: "A portfolio review identifies an Epic whose business case is complete. What normally happens before work begins?",
    options: {
      A: "It is automatically included in the next PI",
      B: "Lean Portfolio leaders decide whether it moves to the Ready state",
      C: "It stays in Analyzing until an ART opens capacity",
      D: "It is deferred to the following fiscal year"
    },
    correct: "B"
  },
  {
    id: 2,
    question: "Which activity best demonstrates cadence and synchronization?",
    options: {
      A: "Budget approval meetings",
      B: "Team iteration reviews",
      C: "Solution backlog refinement",
      D: "A coordinated PI Planning event"
    },
    correct: "D"
  },
  {
    id: 3,
    question: "Which element helps connect long-term direction to execution?",
    options: {
      A: "Portfolio Vision",
      B: "Strategic Themes",
      C: "Iteration Goals",
      D: "Guardrails"
    },
    correct: "B"
  },
  {
    id: 4,
    question: "Which SAFe construct outlines the automated steps needed to deliver value frequently?",
    options: {
      A: "Solution Intent",
      B: "PI Roadmap",
      C: "Portfolio Backlog",
      D: "The Continuous Delivery Pipeline"
    },
    correct: "D"
  },
  {
    id: 5,
    question: "Which mindset focuses on defining value from the customer viewpoint and eliminating waste?",
    options: {
      A: "Agile Manifesto",
      B: "Lean Thinking",
      C: "Design Thinking",
      D: "Systems Architecture"
    },
    correct: "B"
  },
  {
    id: 6,
    question: "Which structure enables an enterprise to innovate quickly while maintaining hierarchical stability?",
    options: {
      A: "Functional departments",
      B: "Shared services",
      C: "Customer councils",
      D: "Dual operating system"
    },
    correct: "D"
  },
  {
    id: 7,
    question: "Which decisions should remain centralized in SAFe?",
    options: {
      A: "Daily task assignment",
      B: "Sprint backlog ordering",
      C: "Work-in-progress limits",
      D: "Decisions with major economic or strategic impact"
    },
    correct: "D"
  },
  {
    id: 8,
    question: "Which approach promotes ongoing understanding of customer needs?",
    options: {
      A: "Portfolio Kanban review",
      B: "System demo",
      C: "IP iteration",
      D: "Design Thinking practices"
    },
    correct: "D"
  },
  {
    id: 9,
    question: "Delaying choices until more learning is available reflects which SAFe principle?",
    options: {
      A: "Build incrementally",
      B: "Assume variability; preserve options",
      C: "Visualize work",
      D: "Decentralize control"
    },
    correct: "B"
  },
  {
    id: 10,
    question: "Which tool helps teams understand user motivations and frustrations?",
    options: {
      A: "Story maps",
      B: "WSJF",
      C: "Value-stream maps",
      D: "Empathy maps"
    },
    correct: "D"
  },
  {
    id: 11,
    question: "Modeling continuous learning and leading through example reflects which leadership dimension?",
    options: {
      A: "Relentless improvement",
      B: "Emotional intelligence",
      C: "Mindset and principles",
      D: "Vision setting"
    },
    correct: "C"
  },
  {
    id: 12,
    question: "Which SAFe Core Value ensures teams share direction and priorities?",
    options: {
      A: "Built-in Quality",
      B: "Transparency",
      C: "Alignment",
      D: "Relentless Improvement"
    },
    correct: "C"
  },
  {
    id: 13,
    question: "Which Agile value emphasizes working directly with customers?",
    options: {
      A: "Working software over processes and tools",
      B: "Responding to change over following a plan",
      C: "Comprehensive documentation over delivery",
      D: "Customer collaboration over contract negotiation"
    },
    correct: "D"
  },
  {
    id: 14,
    question: "Which practice helps ensure consistent standards across teams?",
    options: {
      A: "Technical spikes",
      B: "Acceptance tests",
      C: "Collective ownership and shared standards",
      D: "Pair programming only"
    },
    correct: "C"
  },
  {
    id: 15,
    question: "A SAFe Portfolio is organized around what?",
    options: {
      A: "Teams",
      B: "Programs",
      C: "Development Value Streams",
      D: "Agile Release Trains"
    },
    correct: "C"
  },
  {
    id: 16,
    question: "Which board visualizes the feature-level plan created during PI Planning?",
    options: {
      A: "Team Kanban",
      B: "Program Kanban",
      C: "ART Planning Board",
      D: "System Team board"
    },
    correct: "C"
  },
  {
    id: 17,
    question: "Why should teams avoid large batch sizes?",
    options: {
      A: "They prevent architectural work",
      B: "They improve predictability",
      C: "They reduce queue length",
      D: "They increase variability and reduce feedback speed"
    },
    correct: "D"
  },
  {
    id: 18,
    question: "What is the primary goal SAFe aims to achieve?",
    options: {
      A: "Full automation",
      B: "Predictable delivery",
      C: "Business Agility",
      D: "Standardized workflows"
    },
    correct: "C"
  },
  {
    id: 19,
    question: "Who assigns Business Value to PI Objectives?",
    options: {
      A: "Scrum Masters",
      B: "Product Owners",
      C: "Product Managers",
      D: "Business Owners"
    },
    correct: "D"
  },
  {
    id: 20,
    question: "Leaders who demonstrate SAFe behavior by modeling it exhibit what kind of leadership?",
    options: {
      A: "Directive management",
      B: "Compliance leadership",
      C: "Coaching leadership",
      D: "Leading by example"
    },
    correct: "D"
  },
  {
    id: 21,
    question: "What does ROAM stand for when categorizing PI risks?",
    options: {
      A: "Reassign, Own, Align, Manage",
      B: "Resolve, Observe, Accept, Move",
      C: "Resolved, Owned, Accepted, Mitigated",
      D: "Report, Own, Act, Monitor"
    },
    correct: "C"
  },
  {
    id: 22,
    question: "After coaching the first ART, what is the next step on the SAFe Implementation Roadmap?",
    options: {
      A: "Improve governance",
      B: "Define KPIs",
      C: "Inspect and Adapt",
      D: "Launch more ARTs and Value Streams"
    },
    correct: "D"
  },
  {
    id: 23,
    question: "Business Value and Time Criticality are components of what calculation?",
    options: {
      A: "Iteration goal scoring",
      B: "Story estimation",
      C: "Team predictability",
      D: "Cost of Delay"
    },
    correct: "D"
  },
  {
    id: 24,
    question: "Unlocking intrinsic motivation of knowledge workers requires what key factor?",
    options: {
      A: "Higher pay",
      B: "More control by management",
      C: "Autonomy",
      D: "More documentation"
    },
    correct: "C"
  },
  {
    id: 25,
    question: "Which event demonstrates integrated progress across the entire Agile Release Train?",
    options: {
      A: "PO Sync",
      B: "Team Demo",
      C: "Iteration Review",
      D: "Solution Demo"
    },
    correct: "D"
  },
  {
    id: 26,
    question: "Which statement best describes uncommitted objectives?",
    options: {
      A: "They must be delivered during the PI",
      B: "They use WSJF for prioritization",
      C: "They count toward load exactly like committed items",
      D: "They generally receive lower Business Value scores"
    },
    correct: "D"
  },
  {
    id: 27,
    question: "Why do Business Owners assign Business Value during PI Planning?",
    options: {
      A: "To control team capacity",
      B: "To set iteration length",
      C: "To replace WSJF",
      D: "To guide economic decision-making for teams"
    },
    correct: "D"
  },
  {
    id: 28,
    question: "Which SAFe principle focuses on eliminating delays to ensure smooth value flow?",
    options: {
      A: "Apply systems thinking",
      B: "Unlock intrinsic motivation",
      C: "Optimize backlog refinement",
      D: "Make value flow without interruption"
    },
    correct: "D"
  },
  {
    id: 29,
    question: "Deploy, verify, monitor, and respond describes which DevOps practice?",
    options: {
      A: "Continuous Exploration",
      B: "Release on Demand",
      C: "Continuous Deployment",
      D: "Feature enablement"
    },
    correct: "C"
  },
  {
    id: 30,
    question: "Who oversees the Portfolio Kanban in SAFe?",
    options: {
      A: "Product Owners",
      B: "System Team",
      C: "Release Train Engineer",
      D: "Lean Portfolio Management"
    },
    correct: "D"
  },
  {
    id: 31,
    question: "What mindset allows customers to pull value when they need it?",
    options: {
      A: "Agile mindset",
      B: "Systems thinking",
      C: "Lean pull-based systems",
      D: "Waterfall mindset"
    },
    correct: "C"
  },
  {
    id: 32,
    question: "Why does SAFe evaluate lead time, cost, and value together?",
    options: {
      A: "To enforce documentation standards",
      B: "To justify sunk costs",
      C: "To improve code coverage",
      D: "To inform solution trade-offs"
    },
    correct: "D"
  },
  {
    id: 33,
    question: "How does SAFe use a second operating system in large enterprises?",
    options: {
      A: "Replace management with self-organizing teams",
      B: "Remove all hierarchical structure",
      C: "Create a flow-based network while keeping the hierarchy",
      D: "Force teams into a single functional structure"
    },
    correct: "C"
  },
  {
    id: 34,
    question: "Which description best fits a true cross-functional Agile team?",
    options: {
      A: "The team only does UX work",
      B: "The team only does backend development",
      C: "The team has all skills required to deliver customer value",
      D: "The team only tests software"
    },
    correct: "C"
  },
  {
    id: 35,
    question: "Which thinking model supports reducing waste and improving flow?",
    options: {
      A: "Predictive thinking",
      B: "Iterative thinking",
      C: "Agile thinking",
      D: "Lean thinking"
    },
    correct: "D"
  },
  {
    id: 36,
    question: "Which tool helps envision different future portfolio states?",
    options: {
      A: "Backlog refinement",
      B: "Pair programming",
      C: "SWOT and TOWS analysis",
      D: "Roadmap estimation"
    },
    correct: "C"
  },
  {
    id: 37,
    question: "When are major plan adjustments negotiated during PI Planning?",
    options: {
      A: "At the end of the PI",
      B: "During confidence voting",
      C: "During team breakouts",
      D: "During the management review and problem-solving session"
    },
    correct: "D"
  },
  {
    id: 38,
    question: "Who participates in the PI confidence vote?",
    options: {
      A: "Managers only",
      B: "Scrum Masters only",
      C: "Business Owners only",
      D: "All Agile Release Train participants and teams"
    },
    correct: "D"
  },
  {
    id: 39,
    question: "Which type of system allows customers to influence when value is delivered?",
    options: {
      A: "Time-boxed release system",
      B: "Customer support ticketing system",
      C: "Push-based scheduling system",
      D: "Pull-based value flow system"
    },
    correct: "D"
  },
  {
    id: 40,
    question: "What type of analysis evaluates the economic impact of different solution choices?",
    options: {
      A: "Iteration planning analysis",
      B: "Velocity forecasting",
      C: "Team WIP charting",
      D: "Economic trade-off analysis"
    },
    correct: "D"
  },
  {
    id: 41,
    question: "How does SAFe recommend structuring the organization so that value flows effectively?",
    options: {
      A: "Remove all management roles",
      B: "Force all teams into one structure",
      C: "Flatten the hierarchy completely",
      D: "Retain hierarchy but enable a value flow network"
    },
    correct: "D"
  },
  {
    id: 42,
    question: "Which practice allows teams to adjust quickly by managing workload levels?",
    options: {
      A: "Increase batch size",
      B: "Increase documentation",
      C: "Extend PI schedule",
      D: "Limit work in process"
    },
    correct: "D"
  },
  {
    id: 43,
    question: "Teams finish work early and pull new stories without alignment. Which principle should they revisit?",
    options: {
      A: "Decentralize decisions",
      B: "Optimize Agile Release Train roles",
      C: "Synchronize with a shared cadence",
      D: "Increase team size"
    },
    correct: "C"
  },
  {
    id: 44,
    question: "If teams focus on output instead of outcomes, what should the Release Train Engineer encourage?",
    options: {
      A: "Increase team velocity targets",
      B: "Add more features to each PI",
      C: "Increase estimation frequency",
      D: "Measure progress based on customer value and impact"
    },
    correct: "D"
  },
  {
    id: 45,
    question: "A Product Manager must choose between two features with different value and duration. What approach should they use?",
    options: {
      A: "Stakeholder vote",
      B: "Deliver the longest feature first",
      C: "Rotate features by schedule",
      D: "Economic trade-off analysis, such as Cost of Delay versus duration"
    },
    correct: "D"
  }
];

export default function LeadingSafePracticeExam() {
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
              Leading SAFe Practice Exam
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

