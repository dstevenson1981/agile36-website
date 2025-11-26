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
    question: "What activity typically kicks off the Inspect and Adapt event?",
    options: {
      A: "Reviewing team commitments",
      B: "Showing the current integrated system to stakeholders",
      C: "Agreeing on improvement actions",
      D: "Finalizing PI objectives",
    },
    correct: "B"
  },
  {
    id: 2,
    question: "What is the primary purpose of an Iteration Review?",
    options: {
      A: "Evaluate completed work with stakeholders and gather feedback",
      B: "Identify systemic bottlenecks",
      C: "Refine the Program Backlog",
      D: "Assess team morale",
    },
    correct: "A"
  },
  {
    id: 3,
    question: "Which three levels exist in SAFe's basic configuration?",
    options: {
      A: "Team, Program, Portfolio",
      B: "Essential, Large Solution, Portfolio",
      C: "Iteration, Release, Portfolio",
      D: "Team, Value Stream, Executive",
    },
    correct: "B"
  },
  {
    id: 4,
    question: "When is a specialized subsystem team most appropriate?",
    options: {
      A: "When the customer requires highly customized features",
      B: "When deep technical expertise is needed in one area of the Solution",
      C: "When the team must support multiple Agile Release Trains",
      D: "When teams rotate every PI",
    },
    correct: "B"
  },
  {
    id: 5,
    question: "What is one key responsibility of the System Architect/Engineer?",
    options: {
      A: "Approve all team-level Stories",
      B: "Define Enablers and support the Architectural Runway",
      C: "Manage dependencies between teams",
      D: "Write acceptance criteria",
    },
    correct: "B"
  },
  {
    id: 6,
    question: "What factor most influences a team's velocity over time?",
    options: {
      A: "Switching iteration goals frequently",
      B: "Changes in team composition or technical environment",
      C: "Adding more acceptance criteria mid-iteration",
      D: "Evolving Definition of Done",
    },
    correct: "B"
  },
  {
    id: 7,
    question: "Which activity is considered a Program-level event?",
    options: {
      A: "Daily Stand-Up",
      B: "Iteration Planning",
      C: "Scrum of Scrums",
      D: "Iteration Retrospective",
    },
    correct: "C"
  },
  {
    id: 8,
    question: "Which SAFe configuration includes four levels?",
    options: {
      A: "Essential SAFe",
      B: "Full SAFe",
      C: "Portfolio SAFe",
      D: "Team SAFe",
    },
    correct: "B"
  },
  {
    id: 9,
    question: "Who is the intended audience for the PI System Demo?",
    options: {
      A: "Product Owner only",
      B: "Team members",
      C: "Business Owners and stakeholders",
      D: "Release Train Engineer",
    },
    correct: "C"
  },
  {
    id: 10,
    question: "Which responsibility belongs to the Product Owner?",
    options: {
      A: "Coaching team members on Agile principles",
      B: "Managing the Team Backlog and representing customer needs",
      C: "Serving as the Scrum Master for the team",
      D: "Approving final system-wide releases",
    },
    correct: "B"
  },
  {
    id: 11,
    question: "How does a Product Owner contribute during team-level work?",
    options: {
      A: "By estimating Stories for the team",
      B: "By sequencing work items according to program priorities",
      C: "By drafting solution architecture",
      D: "By facilitating retrospectives",
    },
    correct: "B"
  },
  {
    id: 12,
    question: "Which set of numbers represents a modified Fibonacci sequence?",
    options: {
      A: "1, 2, 4, 6, 10",
      B: "3, 6, 9, 12",
      C: "1, 2, 3, 5, 8, 13",
      D: "10, 20, 40",
    },
    correct: "C"
  },
  {
    id: 13,
    question: "Which practices are core to Kanban for teams?",
    options: {
      A: "Building in quality and planning Iterations",
      B: "Visualizing flow, limiting WIP, improving throughput",
      C: "Increasing batch sizes across teams",
      D: "Managing release frequency",
    },
    correct: "B"
  },
  {
    id: 14,
    question: "Why do Lean-Agile leaders emphasize breaking down silos?",
    options: {
      A: "To reinforce functional reporting lines",
      B: "To align around the flow of value",
      C: "To increase documentation quality",
      D: "To support annual budgeting cycles",
    },
    correct: "B"
  },
  {
    id: 15,
    question: "Which practice strengthens built-in quality?",
    options: {
      A: "Iteration goal setting",
      B: "Test-driven development",
      C: "Releasing every two weeks",
      D: "Holding longer Iterations",
    },
    correct: "B"
  },
  {
    id: 16,
    question: "What best describes the Scrum Master's role?",
    options: {
      A: "Manage program-level Epics",
      B: "Help the team self-organize and remove impediments",
      C: "Approve Features for release",
      D: "Write Enablers for architectural work",
    },
    correct: "B"
  },
  {
    id: 17,
    question: "What is often included in the Definition of Done for a team increment?",
    options: {
      A: "Stories approved by Product Owner",
      B: "All bugs resolved across the system",
      C: "Portfolio-level approval",
      D: "Roadmap updated",
    },
    correct: "A"
  },
  {
    id: 18,
    question: "When do Agile Teams collect Iteration metrics?",
    options: {
      A: "During the qualitative portion of the retrospective",
      B: "During the quantitative portion of the retrospective",
      C: "During Iteration Planning",
      D: "During PI Planning",
    },
    correct: "B"
  },
  {
    id: 19,
    question: "Which statement about WIP limits is true?",
    options: {
      A: "Increasing WIP limits improves flow",
      B: "Lower WIP limits accelerate value delivery",
      C: "High WIP improves utilization",
      D: "Lower WIP reduces story completion",
    },
    correct: "B"
  },
  {
    id: 20,
    question: "What is the Release Train Engineer responsible for?",
    options: {
      A: "Acting as the content authority",
      B: "Serving as servant leader for the ART",
      C: "Approving design decisions",
      D: "Optimizing the Portfolio Kanban",
    },
    correct: "B"
  },
  {
    id: 21,
    question: "Iteration Planning and Iteration Review are examples of:",
    options: {
      A: "Team-level events",
      B: "Program ceremonies",
      C: "Sync events",
      D: "Portfolio alignment events",
    },
    correct: "A"
  },
  {
    id: 22,
    question: "The 3 Cs for writing user stories stand for:",
    options: {
      A: "Concept, Constraint, Confirmation",
      B: "Card, Conversation, Confirmation",
      C: "Content, Conversation, Completion",
      D: "Card, Clarification, Completion",
    },
    correct: "B"
  },
  {
    id: 23,
    question: "What replaces detailed requirements documents in SAFe?",
    options: {
      A: "Team task lists",
      B: "User Stories",
      C: "Iteration reports",
      D: "Capability maps",
    },
    correct: "B"
  },
  {
    id: 24,
    question: "The Agile Release Train aligns teams around a shared Vision and:",
    options: {
      A: "Team Backlogs",
      B: "Program Backlog",
      C: "Iteration Goals",
      D: "Release Guidelines",
    },
    correct: "B"
  },
  {
    id: 25,
    question: "Why are release elements separated from the Solution?",
    options: {
      A: "To allow components to be released independently",
      B: "To reduce the number of enablers required",
      C: "To slow down deployment frequency",
      D: "To enable teams to skip testing",
    },
    correct: "A"
  },
  {
    id: 26,
    question: "A core CALMR principle in DevOps is:",
    options: {
      A: "Centralizing decision-making",
      B: "Keeping everything under version control",
      C: "Avoiding automation",
      D: "Increasing handoffs",
    },
    correct: "B"
  },
  {
    id: 27,
    question: "Which practices appear in Inspect and Adapt?",
    options: {
      A: "Problem solving and identifying improvement items",
      B: "Roadmap creation",
      C: "Developing new Features",
      D: "Conducting performance reviews",
    },
    correct: "A"
  },
  {
    id: 28,
    question: "What visibility should Scrum Masters give during ART Sync?",
    options: {
      A: "Status of single design decisions",
      B: "Progress updates and team-level impediments",
      C: "Financial budgets",
      D: "Staffing plans",
    },
    correct: "B"
  },
  {
    id: 29,
    question: "What helps unlock intrinsic motivation among knowledge workers?",
    options: {
      A: "Autonomy in how they execute work",
      B: "Strict performance bonuses",
      C: "Frequent handoffs",
      D: "Fixed project plans",
    },
    correct: "A"
  },
  {
    id: 30,
    question: "What is one key benefit of Agile vs. waterfall?",
    options: {
      A: "Faster delivery and increased adaptability",
      B: "Heavier upfront documentation",
      C: "Better control through phase gating",
      D: "More approvals required",
    },
    correct: "A"
  },
  {
    id: 31,
    question: "Which team size is recommended in SAFe?",
    options: {
      A: "1–3 people",
      B: "5–11 people",
      C: "12–20 people",
      D: "20+ people",
    },
    correct: "B"
  },
  {
    id: 32,
    question: "Which backlog belongs to the Product Manager?",
    options: {
      A: "Team Backlog",
      B: "Iteration Backlog",
      C: "Program Backlog",
      D: "Story Backlog",
    },
    correct: "C"
  },
  {
    id: 33,
    question: "Which statement describes a Feature?",
    options: {
      A: "A small unit of work that can be completed in a few hours",
      B: "A service that delivers value and includes acceptance criteria",
      C: "A portfolio-level artifact",
      D: "A system-wide user journey",
    },
    correct: "B"
  },
  {
    id: 34,
    question: "What is a Capability?",
    options: {
      A: "A large-scale solution behavior spanning multiple ARTs",
      B: "A team-level requirement",
      C: "A user interface design",
      D: "A risk mitigation item",
    },
    correct: "A"
  },
  {
    id: 35,
    question: "Which event helps teams align on progress during the PI?",
    options: {
      A: "Backlog Refinement",
      B: "Scrum of Scrums",
      C: "Portfolio Sync",
      D: "Architectural Review",
    },
    correct: "B"
  },
  {
    id: 36,
    question: "What is a primary purpose of PI Planning?",
    options: {
      A: "Approve budget allocations",
      B: "Align teams to common objectives and commitments",
      C: "Perform system testing",
      D: "Complete Stories for the next iteration",
    },
    correct: "B"
  },
  {
    id: 37,
    question: "Which factor enables faster flow?",
    options: {
      A: "Large batch sizes",
      B: "Lowering WIP and improving focus",
      C: "Adding more approvers",
      D: "Increasing work handoffs",
    },
    correct: "B"
  },
  {
    id: 38,
    question: "Who prioritizes Features in the Program Backlog?",
    options: {
      A: "Scrum Master",
      B: "Release Train Engineer",
      C: "Product Manager",
      D: "Team Members",
    },
    correct: "C"
  },
  {
    id: 39,
    question: "What is an Enabler used for?",
    options: {
      A: "To track individual team performance",
      B: "To support architecture, exploration, or compliance",
      C: "To optimize team capacity",
      D: "To update release documentation",
    },
    correct: "B"
  },
  {
    id: 40,
    question: "Why is built-in quality essential in SAFe?",
    options: {
      A: "To minimize the number of ceremonies",
      B: "To ensure that each increment is potentially shippable",
      C: "To reduce the role of Product Owners",
      D: "To allow skipping integration",
    },
    correct: "B"
  },
  {
    id: 41,
    question: "What is a purpose of the Program Kanban?",
    options: {
      A: "Track Portfolio outcomes",
      B: "Visualize flow of Features",
      C: "Assign team-level Stories",
      D: "Manage iteration boundaries",
    },
    correct: "B"
  },
  {
    id: 42,
    question: "Which statement is true about Agile Teams?",
    options: {
      A: "They should multitask across multiple ARTs",
      B: "They are cross-functional and deliver value every iteration",
      C: "They rely heavily on sequential approvals",
      D: "They specialize in one phase only",
    },
    correct: "B"
  },
  {
    id: 43,
    question: "Which role ensures alignment to business objectives in the ART?",
    options: {
      A: "Scrum Master",
      B: "Architecture Owner",
      C: "Business Owner",
      D: "RTE",
    },
    correct: "C"
  },
  {
    id: 44,
    question: "What does relentless improvement encourage teams to do?",
    options: {
      A: "Wait for system-wide instructions",
      B: "Continuously inspect work and optimize processes",
      C: "Avoid taking risks",
      D: "Increase WIP limits",
    },
    correct: "B"
  },
  {
    id: 45,
    question: "What is the purpose of the Team Backlog?",
    options: {
      A: "Capture program-level work",
      B: "Store Stories the team will implement",
      C: "Document solution intent",
      D: "Record risks and ROAM decisions",
    },
    correct: "B"
  },
];

export default function SafeForTeamsTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const handleAnswerSelect = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const getIncorrectAnswers = () => {
    return questions.filter((q) => answers[q.id] !== q.correct);
  };

  if (showResults) {
    const score = calculateScore();
    const incorrectAnswers = getIncorrectAnswers();

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
              {incorrectAnswers.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Questions You Got Wrong ({incorrectAnswers.length})
                  </h2>
                  <div className="space-y-6">
                    {incorrectAnswers.map((question) => {
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
              SAFe for Teams Practice Exam
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

