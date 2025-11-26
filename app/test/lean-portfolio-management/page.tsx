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
    question: "Which LPM responsibility ensures that strategy is continuously translated into actionable investment decisions?",
    options: {
      A: "Setting iteration goals",
      B: "Managing individual team commitments",
      C: "Aligning portfolio focus with enterprise strategy",
      D: "Documenting feature acceptance tests"
    },
    correct: "C"
  },
  {
    id: 2,
    question: "What is the primary purpose of Lean Budgets in a SAFe portfolio?",
    options: {
      A: "Define fixed project cost estimates for each team",
      B: "Enable dynamic funding of value streams",
      C: "Track individual developer time",
      D: "Allocate budgets annually without adjustment"
    },
    correct: "B"
  },
  {
    id: 3,
    question: "What is a core reason for applying participatory budgeting?",
    options: {
      A: "To assign tasks to Agile teams",
      B: "To optimize portfolio spend through collaborative decision-making",
      C: "To generate architectural epics",
      D: "To finalize PI Objectives"
    },
    correct: "B"
  },
  {
    id: 4,
    question: "Which statement best describes the purpose of Portfolio Vision?",
    options: {
      A: "Defines stories for delivery teams",
      B: "Clarifies long-term direction for investments",
      C: "Describes test strategy",
      D: "Sets iteration capacity"
    },
    correct: "B"
  },
  {
    id: 5,
    question: "What does a Value Stream represent in Lean Portfolio Management?",
    options: {
      A: "A backlog of technical tasks",
      B: "The sequence of activities needed to deliver value to the customer",
      C: "A group of teams working in a functional department",
      D: "A single team's workflow"
    },
    correct: "B"
  },
  {
    id: 6,
    question: "Why does SAFe emphasize limiting the number of active Epics?",
    options: {
      A: "To reduce iterations",
      B: "To avoid overloading the Portfolio Kanban and improve flow",
      C: "To ensure architects are fully utilized",
      D: "To prevent system demos from becoming too large"
    },
    correct: "B"
  },
  {
    id: 7,
    question: "Which role is primarily accountable for guiding the implementation of Lean Portfolio Management?",
    options: {
      A: "Product Owner",
      B: "Lean Portfolio Management function",
      C: "System Team",
      D: "Scrum Master"
    },
    correct: "B"
  },
  {
    id: 8,
    question: "Which financial approach enables decentralized decision-making while maintaining proper governance?",
    options: {
      A: "Time and materials contracting",
      B: "Lean Guardrails",
      C: "Annual fixed project budgets",
      D: "Detailed cost tracking per story"
    },
    correct: "B"
  },
  {
    id: 9,
    question: "What is the main objective of the Portfolio Kanban?",
    options: {
      A: "Track story-level work in progress",
      B: "Visualize and manage the flow of Epics",
      C: "Record architectural decisions",
      D: "Assign user stories to teams"
    },
    correct: "B"
  },
  {
    id: 10,
    question: "What triggers an Epic to enter the analysis stage of the Portfolio Kanban?",
    options: {
      A: "Its cost has already been approved",
      B: "A hypothesis statement has been established and reviewed",
      C: "The PI Planning session is complete",
      D: "Teams have requested more work"
    },
    correct: "B"
  },
  {
    id: 11,
    question: "Which activity ensures that portfolio initiatives stay aligned with enterprise objectives?",
    options: {
      A: "Daily standups",
      B: "Investment review via Lean Budgets",
      C: "Iteration planning",
      D: "Scrum of Scrums"
    },
    correct: "B"
  },
  {
    id: 12,
    question: "Why does LPM promote decentralized decision-making?",
    options: {
      A: "To eliminate the need for portfolio governance",
      B: "To allow teams to approve their own budgets",
      C: "To reduce bottlenecks and increase decision speed",
      D: "To remove roles from the portfolio hierarchy"
    },
    correct: "C"
  },
  {
    id: 13,
    question: "Which LPM element helps ensure spending aligns with strategic priorities?",
    options: {
      A: "Iteration Review",
      B: "Lean Budget Guardrails",
      C: "Definition of Done",
      D: "System Demo"
    },
    correct: "B"
  },
  {
    id: 14,
    question: "What is the purpose of the Epic Hypothesis Statement?",
    options: {
      A: "To capture detailed user stories",
      B: "To describe the expected value and economic reasoning for an initiative",
      C: "To assign features to value streams",
      D: "To document technical specifications"
    },
    correct: "B"
  },
  {
    id: 15,
    question: "Which aspect of governance does LPM rely on instead of traditional project cost controls?",
    options: {
      A: "Iteration burndowns",
      B: "Fixed-scope roadmaps",
      C: "Lean Guardrails",
      D: "Architectural spike reviews"
    },
    correct: "C"
  },
  {
    id: 16,
    question: "Why is WSJF used when prioritizing epics?",
    options: {
      A: "To maximize developer utilization",
      B: "To avoid having to estimate work",
      C: "To ensure high-value work is delivered sooner",
      D: "To create detailed implementation plans"
    },
    correct: "C"
  },
  {
    id: 17,
    question: "Which strategic artifact describes how the portfolio intends to achieve its longer-term goals?",
    options: {
      A: "Portfolio Canvas",
      B: "Solution Intent",
      C: "Iteration Retrospective",
      D: "Team Charter"
    },
    correct: "A"
  },
  {
    id: 18,
    question: "What does LPM use to evaluate expected benefits versus investment levels?",
    options: {
      A: "Program Board",
      B: "Cost breakdown structure",
      C: "Epic Value Stream Mapping",
      D: "Epic economics analysis"
    },
    correct: "D"
  },
  {
    id: 19,
    question: "Who is responsible for ensuring that portfolio investments reflect enterprise strategy?",
    options: {
      A: "Scrum Master",
      B: "RTE",
      C: "Lean Portfolio Management",
      D: "Product Owner"
    },
    correct: "C"
  },
  {
    id: 20,
    question: "What does the Portfolio Backlog contain?",
    options: {
      A: "Stories for teams",
      B: "Features ready for prioritization",
      C: "Large initiatives that require analysis and approval",
      D: "Iteration outcomes"
    },
    correct: "C"
  },
  {
    id: 21,
    question: "Why are MVPs important in LPM?",
    options: {
      A: "They ensure projects are fully scoped before execution",
      B: "They validate assumptions with minimal investment",
      C: "They allow architects to finalize solution intent",
      D: "They lock in budgets early"
    },
    correct: "B"
  },
  {
    id: 22,
    question: "Which event provides stakeholders visibility into solution development across ARTs?",
    options: {
      A: "PI Planning",
      B: "Solution Demo",
      C: "Iteration Review",
      D: "Standup"
    },
    correct: "B"
  },
  {
    id: 23,
    question: "Which financial governance practice ensures spending aligns with value produced?",
    options: {
      A: "Static project budgeting",
      B: "Detailed timesheet tracking",
      C: "Continuous monitoring of guardrails",
      D: "Quarterly hiring freezes"
    },
    correct: "C"
  },
  {
    id: 24,
    question: "Why are guardrails essential within Lean Budgets?",
    options: {
      A: "To limit the amount of work teams can take on",
      B: "To ensure decentralized teams spend within strategic boundaries",
      C: "To define iteration length",
      D: "To assign technical tasks"
    },
    correct: "B"
  },
  {
    id: 25,
    question: "Why does LPM encourage adaptive roadmapping?",
    options: {
      A: "To maintain fixed scope for each PI",
      B: "To adjust investments based on learning and changing conditions",
      C: "To reduce the number of value streams",
      D: "To assign individual tasks to teams"
    },
    correct: "B"
  },
  {
    id: 26,
    question: "Which element helps leaders understand how value flows across the portfolio?",
    options: {
      A: "Portfolio Kanban",
      B: "Iteration Burndown",
      C: "Epic DoD",
      D: "System Architecture Map"
    },
    correct: "A"
  },
  {
    id: 27,
    question: "What does the term Enterprise Alignment represent in LPM?",
    options: {
      A: "Matching team goals to sprint plans",
      B: "Ensuring all portfolio work supports the organization's broader mission",
      C: "Coordinating daily stand-ups",
      D: "Prioritizing features during PI planning"
    },
    correct: "B"
  },
  {
    id: 28,
    question: "Which metric helps portfolios understand whether investment is producing intended results?",
    options: {
      A: "Velocity",
      B: "Predictability score",
      C: "Key Performance Indicators (KPIs)",
      D: "Story points"
    },
    correct: "C"
  },
  {
    id: 29,
    question: "Which element provides insight into portfolio execution health?",
    options: {
      A: "Test coverage reports",
      B: "Portfolio-level metrics dashboard",
      C: "Team retrospective notes",
      D: "Scrum Master weekly updates"
    },
    correct: "B"
  },
  {
    id: 30,
    question: "How does SAFe ensure the budgeting process supports agility?",
    options: {
      A: "Funding is fixed for 5 years",
      B: "Teams must seek financial approval for every story",
      C: "Funding flows to long-lived value streams rather than individual projects",
      D: "Only architects can request budget changes"
    },
    correct: "C"
  },
  {
    id: 31,
    question: "What differentiates Lean Budgets from traditional project budgets?",
    options: {
      A: "Lean Budgets require more upfront documentation",
      B: "Lean Budgets strictly limit spending flexibility",
      C: "Lean Budgets support faster and more adaptive funding changes",
      D: "Lean Budgets eliminate guardrails"
    },
    correct: "C"
  },
  {
    id: 32,
    question: "Which statement best captures why LPM focuses on value streams rather than projects?",
    options: {
      A: "Projects require fewer teams",
      B: "Value streams produce continuous flow of value",
      C: "Projects are easier to fund annually",
      D: "Value streams eliminate dependency management"
    },
    correct: "B"
  },
  {
    id: 33,
    question: "Which artifact helps leaders fund the right mix of strategic and operational work?",
    options: {
      A: "Team Backlog",
      B: "Iteration Plan",
      C: "Strategic Portfolio Roadmap",
      D: "Team Charter"
    },
    correct: "C"
  },
  {
    id: 34,
    question: "Why is cost transparency important for Lean Portfolio Management?",
    options: {
      A: "To enable detailed project accounting",
      B: "To allow informed decisions about investments",
      C: "To assign costs per story point",
      D: "To time-box financial reviews"
    },
    correct: "B"
  },
  {
    id: 35,
    question: "Which type of work typically requires involvement from Enterprise Architects?",
    options: {
      A: "Small enhancement features",
      B: "Epic-level solutions with wide technical implications",
      C: "Iteration planning tasks",
      D: "Team-level spikes"
    },
    correct: "B"
  },
  {
    id: 36,
    question: "Which factor helps determine whether an epic should proceed into implementation?",
    options: {
      A: "The epic is requested by a team",
      B: "The MVP demonstrates validated value",
      C: "The roadmap requires additional content",
      D: "The PI planning calendar is open"
    },
    correct: "B"
  },
  {
    id: 37,
    question: "Who helps ensure architectural runway aligns with future portfolio needs?",
    options: {
      A: "RTE",
      B: "Scrum Master",
      C: "Enterprise Architect",
      D: "Business Owners"
    },
    correct: "C"
  },
  {
    id: 38,
    question: "What is one outcome of effective Lean governance?",
    options: {
      A: "Increased approval steps for funding",
      B: "Reduced decision latency",
      C: "More detailed documentation",
      D: "Longer budgeting cycles"
    },
    correct: "B"
  },
  {
    id: 39,
    question: "When is the best time to adjust value stream budgets?",
    options: {
      A: "Only at the start of the year",
      B: "Whenever strategy or learning indicates a shift is needed",
      C: "Only after PI Planning",
      D: "During sprint reviews"
    },
    correct: "B"
  },
  {
    id: 40,
    question: "What helps ensure that new portfolio work fits within organizational capacity?",
    options: {
      A: "Team velocity metrics",
      B: "Epic WIP limits in the Portfolio Kanban",
      C: "Daily standups",
      D: "Parking lot items"
    },
    correct: "B"
  },
  {
    id: 41,
    question: "What is the purpose of the 'Ready' state in the Portfolio Kanban?",
    options: {
      A: "To allow teams to start planning iterations",
      B: "To confirm an epic has met criteria for potential implementation",
      C: "To finalize acceptance criteria",
      D: "To assign developers"
    },
    correct: "B"
  },
  {
    id: 42,
    question: "What is an expected behavior of leaders practicing Lean Portfolio Management?",
    options: {
      A: "Micromanage team workflow",
      B: "Delay decisions for more data",
      C: "Model Lean-Agile values and lead by example",
      D: "Approve each story before work starts"
    },
    correct: "C"
  },
  {
    id: 43,
    question: "Which portfolio-level meeting supports alignment and investment decisions?",
    options: {
      A: "Daily standup",
      B: "Portfolio Sync",
      C: "Iteration Review",
      D: "System Demo"
    },
    correct: "B"
  },
  {
    id: 44,
    question: "Why are KPIs important in portfolio management?",
    options: {
      A: "They define story-level work",
      B: "They measure actual outcomes against strategic goals",
      C: "They determine PI Objectives",
      D: "They set team velocity targets"
    },
    correct: "B"
  },
  {
    id: 45,
    question: "Which practice supports continuous adaptation of portfolio strategy?",
    options: {
      A: "Fixed project scope documentation",
      B: "Quarterly governance freezes",
      C: "Ongoing review of roadmap and investment mix",
      D: "Static annual planning"
    },
    correct: "C"
  }
];

export default function LeanPortfolioManagementPracticeExam() {
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
              Lean Portfolio Management Practice Exam
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



