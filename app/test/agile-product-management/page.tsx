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
    question: "What is the primary responsibility of Agile Product Management in a SAFe organization?",
    options: {
      A: "Manage team-level tasks and daily workflows",
      B: "Define product strategy and deliver solutions customers value",
      C: "Supervise release engineering teams",
      D: "Approve all backlog items for every Agile team"
    },
    correct: "B"
  },
  {
    id: 2,
    question: "Which activity helps Product Managers deeply understand customer problems before defining solutions?",
    options: {
      A: "Iteration planning",
      B: "Market and user research",
      C: "System demo evaluations",
      D: "Team retrospectives"
    },
    correct: "B"
  },
  {
    id: 3,
    question: "Why is a vision important in Agile Product Management?",
    options: {
      A: "It assigns exact tasks for each iteration",
      B: "It aligns teams with the long-term direction and desired outcomes",
      C: "It determines technical architecture",
      D: "It eliminates the need for market research"
    },
    correct: "B"
  },
  {
    id: 4,
    question: "What is a key responsibility of Product Managers during PI Planning?",
    options: {
      A: "Run retrospectives",
      B: "Present vision and prioritize features",
      C: "Approve team-level stories",
      D: "Assign developers to capabilities"
    },
    correct: "B"
  },
  {
    id: 5,
    question: "Which practice helps Product Managers validate whether their solutions solve real customer problems?",
    options: {
      A: "Strict documentation reviews",
      B: "Continuous customer feedback loops",
      C: "Increasing batch sizes",
      D: "Eliminating demos"
    },
    correct: "B"
  },
  {
    id: 6,
    question: "What is the role of the Program Backlog in Agile Product Management?",
    options: {
      A: "Store iteration-specific stories",
      B: "Hold prioritized features that express product strategy",
      C: "Track technical debts",
      D: "Store architectural tasks"
    },
    correct: "B"
  },
  {
    id: 7,
    question: "Which statement describes design thinking in Agile Product Management?",
    options: {
      A: "Focusing on business metrics before understanding user needs",
      B: "Starting with empathy to understand users and build desirable products",
      C: "Creating highly detailed requirements upfront",
      D: "Prioritizing execution over problem discovery"
    },
    correct: "B"
  },
  {
    id: 8,
    question: "Why are prototypes useful in Agile product development?",
    options: {
      A: "They finalize technical architecture",
      B: "They enable fast learning through rapid customer feedback",
      C: "They eliminate the need for features",
      D: "They replace the system demo"
    },
    correct: "B"
  },
  {
    id: 9,
    question: "What is the primary purpose of a Feature's benefit hypothesis?",
    options: {
      A: "Confirm the technical implementation steps",
      B: "Clarify the expected value the Feature should deliver",
      C: "Define the iteration length",
      D: "Specify test coverage requirements"
    },
    correct: "B"
  },
  {
    id: 10,
    question: "Which role owns the product vision and roadmap?",
    options: {
      A: "Release Train Engineer",
      B: "Product Manager",
      C: "Product Owner",
      D: "System Architect"
    },
    correct: "B"
  },
  {
    id: 11,
    question: "What is an outcome of applying Lean User Experience (Lean UX)?",
    options: {
      A: "Detailed upfront design",
      B: "Short learning cycles to validate assumptions",
      C: "Longer release cycles",
      D: "More documentation requirements"
    },
    correct: "B"
  },
  {
    id: 12,
    question: "Why do Agile Product Managers conduct market segmentation?",
    options: {
      A: "To categorize development teams by skills",
      B: "To identify the customer groups most likely to benefit from the solution",
      C: "To determine system testing requirements",
      D: "To eliminate the need for business owners"
    },
    correct: "B"
  },
  {
    id: 13,
    question: "What is the purpose of a minimum viable product (MVP)?",
    options: {
      A: "Launch all planned features",
      B: "Test a hypothesis with minimal effort",
      C: "Replace ongoing development",
      D: "Document solution architecture"
    },
    correct: "B"
  },
  {
    id: 14,
    question: "Why are Innovation and Planning (IP) iterations valuable for Product Managers?",
    options: {
      A: "They are used to release to production",
      B: "They provide time for research, prototyping, and strategic work",
      C: "They replace team demos",
      D: "They eliminate dependencies"
    },
    correct: "B"
  },
  {
    id: 15,
    question: "Which metric helps determine whether a solution is actually delivering value?",
    options: {
      A: "Velocity",
      B: "Customer outcome metrics",
      C: "Architectural runway",
      D: "Iteration length"
    },
    correct: "B"
  },
  {
    id: 16,
    question: "What is the goal of solution roadmaps in Agile Product Management?",
    options: {
      A: "Define exact release dates for every feature",
      B: "Provide a forecast of how value will be delivered over time",
      C: "Identify system-level defects",
      D: "Document individual team tasks"
    },
    correct: "B"
  },
  {
    id: 17,
    question: "Why do Agile Product Managers use continuous exploration?",
    options: {
      A: "To perform capacity planning",
      B: "To discover customer needs and shape solution options",
      C: "To evaluate developer productivity",
      D: "To finalize system tests"
    },
    correct: "B"
  },
  {
    id: 18,
    question: "Which activity occurs in the 'Explore' phase of the continuous exploration pipeline?",
    options: {
      A: "Deploying the solution",
      B: "Understanding customer problems and generating solution ideas",
      C: "Training support teams",
      D: "Preparing release notes"
    },
    correct: "B"
  },
  {
    id: 19,
    question: "What is the purpose of the Program Kanban for Product Managers?",
    options: {
      A: "To track code commits",
      B: "To visualize Feature flow from concept to delivery",
      C: "To manage iteration stories",
      D: "To document architectural tasks"
    },
    correct: "B"
  },
  {
    id: 20,
    question: "Why is hypothesis-based development important?",
    options: {
      A: "It eliminates the need for acceptance criteria",
      B: "It encourages experimentation and validates assumptions with real data",
      C: "It reduces collaboration with customers",
      D: "It removes the need for prototypes"
    },
    correct: "B"
  },
  {
    id: 21,
    question: "Which of the following describes Lean Portfolio Management's connection to Product Management?",
    options: {
      A: "It assigns daily tasks to Agile teams",
      B: "It aligns funding and strategy with product vision",
      C: "It writes team-level user stories",
      D: "It conducts iteration demos"
    },
    correct: "B"
  },
  {
    id: 22,
    question: "What is the main purpose of a Feature in SAFe?",
    options: {
      A: "Describe user personas",
      B: "Deliver value that supports a capability or product objective",
      C: "Document architecture",
      D: "Outline system-wide test plans"
    },
    correct: "B"
  },
  {
    id: 23,
    question: "Who accepts completed Features?",
    options: {
      A: "Product Owner",
      B: "Product Manager",
      C: "Architect",
      D: "RTE"
    },
    correct: "B"
  },
  {
    id: 24,
    question: "Why are personas used in Agile Product Management?",
    options: {
      A: "To assign iteration tasks",
      B: "To guide solution design based on user needs and behavior",
      C: "To manage WIP limits",
      D: "To define architectural runway"
    },
    correct: "B"
  },
  {
    id: 25,
    question: "Which statement best describes the purpose of customer journeys?",
    options: {
      A: "Track team velocity",
      B: "Show end-to-end customer experiences and highlight pain points",
      C: "Define technical implementation",
      D: "Provide iteration goals"
    },
    correct: "B"
  },
  {
    id: 26,
    question: "Why is economic prioritization important?",
    options: {
      A: "It increases documentation quality",
      B: "It maximizes value delivery by sequencing work based on Cost of Delay",
      C: "It determines team velocity",
      D: "It ensures all work fits in one PI"
    },
    correct: "B"
  },
  {
    id: 27,
    question: "What is the purpose of weighted shortest job first (WSJF)?",
    options: {
      A: "Estimate story points",
      B: "Prioritize work by comparing cost of delay to job duration",
      C: "Determine solution architecture",
      D: "Assign team capacity"
    },
    correct: "B"
  },
  {
    id: 28,
    question: "Why do Product Managers use opportunity scoring?",
    options: {
      A: "Measure architecture quality",
      B: "Identify unmet customer needs and improvement opportunities",
      C: "Document acceptance criteria",
      D: "Generate technical spikes"
    },
    correct: "B"
  },
  {
    id: 29,
    question: "Which event provides an integrated view of value delivered across the ART?",
    options: {
      A: "Team iteration review",
      B: "System Demo",
      C: "PO Sync",
      D: "Inspect and Adapt"
    },
    correct: "B"
  },
  {
    id: 30,
    question: "What is the purpose of the Inspect and Adapt workshop?",
    options: {
      A: "Assign PI budgets",
      B: "Analyze results, identify root causes, and define improvement actions",
      C: "Create iteration stories",
      D: "Approve new value streams"
    },
    correct: "B"
  },
  {
    id: 31,
    question: "Which practice supports continuous value delivery?",
    options: {
      A: "Increasing batch sizes",
      B: "Reducing feedback loops",
      C: "Managing flow with Kanban systems",
      D: "Establishing long development cycles"
    },
    correct: "C"
  },
  {
    id: 32,
    question: "What does the 'Define' activity in Design Thinking focus on?",
    options: {
      A: "Implementing solution features",
      B: "Synthesizing research to define clear problem statements",
      C: "Designing the deployment pipeline",
      D: "Building the MVP"
    },
    correct: "B"
  },
  {
    id: 33,
    question: "Why do Agile Product Managers use solution intent?",
    options: {
      A: "To control all technical decisions",
      B: "To store knowledge about intended and actual solution behavior",
      C: "To replace acceptance criteria",
      D: "To restrict design options"
    },
    correct: "B"
  },
  {
    id: 34,
    question: "Which activity helps Product Managers ensure alignment with strategic themes?",
    options: {
      A: "Iteration planning",
      B: "Roadmap development",
      C: "Daily standups",
      D: "Test automation"
    },
    correct: "B"
  },
  {
    id: 35,
    question: "What do ability, desire, and viability represent in product development?",
    options: {
      A: "Requirements for team formation",
      B: "Elements of solution-economic fit",
      C: "Inputs for System Demo",
      D: "Backlog hierarchy"
    },
    correct: "B"
  },
  {
    id: 36,
    question: "Which practice enables faster learning and adaptation?",
    options: {
      A: "Delivering large, infrequent batches",
      B: "Running small experiments early",
      C: "Centralizing all decision-making",
      D: "Adding more compliance reviews"
    },
    correct: "B"
  },
  {
    id: 37,
    question: "What is a key characteristic of a customer-centric organization?",
    options: {
      A: "Internal metrics drive all decisions",
      B: "Customer needs strongly influence solution design",
      C: "IT dictates feature prioritization",
      D: "Teams avoid experimentation"
    },
    correct: "B"
  },
  {
    id: 38,
    question: "Why is empathy essential for Product Managers?",
    options: {
      A: "It ensures velocity increases",
      B: "It builds understanding of real user motivations and frustrations",
      C: "It reduces the need for Acceptance Criteria",
      D: "It establishes architectural runway"
    },
    correct: "B"
  },
  {
    id: 39,
    question: "Which activity supports adaptive roadmapping?",
    options: {
      A: "Documenting a fixed annual plan",
      B: "Incorporating continuous exploration insights",
      C: "Completing upfront design",
      D: "Forcing all work into the next PI"
    },
    correct: "B"
  },
  {
    id: 40,
    question: "What is one sign that a hypothesis is too vague?",
    options: {
      A: "It identifies target users clearly",
      B: "It provides no measurable success criteria",
      C: "It includes a test method",
      D: "It links to customer problems"
    },
    correct: "B"
  },
  {
    id: 41,
    question: "Which type of backlog item supports architecture, exploration, and compliance?",
    options: {
      A: "Enablers",
      B: "Stories",
      C: "Capabilities",
      D: "Tasks"
    },
    correct: "A"
  },
  {
    id: 42,
    question: "Why is it important for Product Managers to collaborate with System Architects?",
    options: {
      A: "To design iteration goals",
      B: "To align solution intent with architectural direction",
      C: "To assign tasks to developers",
      D: "To generate test data"
    },
    correct: "B"
  },
  {
    id: 43,
    question: "Which event ensures alignment between Product Management and Product Owners?",
    options: {
      A: "Daily standup",
      B: "PO Sync",
      C: "Iteration retrospective",
      D: "System testing"
    },
    correct: "B"
  },
  {
    id: 44,
    question: "Why are Option Pivot or Persevere decisions valuable?",
    options: {
      A: "They help finalize architecture",
      B: "They evaluate whether to continue, change, or stop a product direction",
      C: "They determine iteration length",
      D: "They define roles on the ART"
    },
    correct: "B"
  },
  {
    id: 45,
    question: "In Lean thinking, what is considered waste?",
    options: {
      A: "Activities that do not add value to the customer",
      B: "Any work done during an IP iteration",
      C: "System testing",
      D: "Backlog refinement"
    },
    correct: "A"
  },
  {
    id: 46,
    question: "Which statement describes relentless improvement?",
    options: {
      A: "Continuous evaluation and small incremental enhancements",
      B: "Increasing batch sizes to move faster",
      C: "Delivering only once a year",
      D: "Reducing time spent on feedback loops"
    },
    correct: "A"
  },
  {
    id: 47,
    question: "Which activity helps Product Managers measure whether a product direction is still valid?",
    options: {
      A: "System demo only",
      B: "Customer interviews and problem validation",
      C: "Iteration planning",
      D: "Architecture reviews"
    },
    correct: "B"
  },
  {
    id: 48,
    question: "Which is a benefit of decentralizing decision-making?",
    options: {
      A: "Speeds up decisions that require local context",
      B: "Eliminates the need for a roadmap",
      C: "Replaces alignment with autonomy",
      D: "Reduces Product Manager involvement"
    },
    correct: "A"
  },
  {
    id: 49,
    question: "Why is measuring actual outcomes critical in product development?",
    options: {
      A: "It determines story point accuracy",
      B: "It verifies whether the delivered value matches expectations",
      C: "It ensures compliance sign-off",
      D: "It creates additional documentation"
    },
    correct: "B"
  },
  {
    id: 50,
    question: "What does a good Feature split aim to achieve?",
    options: {
      A: "Reduce collaboration between teams",
      B: "Deliver incremental value sooner",
      C: "Delay customer feedback",
      D: "Increase job duration"
    },
    correct: "B"
  },
  {
    id: 51,
    question: "Which outcome indicates that the MVP succeeded?",
    options: {
      A: "Customers adopt the solution and validate the original hypothesis",
      B: "The team writes extensive documentation",
      C: "The architectural runway is complete",
      D: "Velocity increases dramatically"
    },
    correct: "A"
  },
  {
    id: 52,
    question: "Why is experimentation essential for Agile Product Managers?",
    options: {
      A: "It reduces team involvement",
      B: "It allows assumptions to be tested quickly with minimal investment",
      C: "It eliminates dependencies",
      D: "It replaces roadmapping"
    },
    correct: "B"
  },
  {
    id: 53,
    question: "Which activity supports strong alignment during PI execution?",
    options: {
      A: "Updating the feature backlog annually",
      B: "Regular sync meetings such as PO Sync and ART Sync",
      C: "Eliminating demos to save time",
      D: "Documenting tasks for each developer"
    },
    correct: "B"
  },
  {
    id: 54,
    question: "Why should Product Managers partner with UX designers?",
    options: {
      A: "To produce detailed UI documentation upfront",
      B: "To design delightful solutions that improve customer experience",
      C: "To eliminate the need for market research",
      D: "To assign story points"
    },
    correct: "B"
  },
  {
    id: 55,
    question: "What is the purpose of customer problem statements?",
    options: {
      A: "To identify root causes and frame the problem clearly before designing solutions",
      B: "To finalize architectural decisions",
      C: "To write test scripts",
      D: "To assign work to Agile teams"
    },
    correct: "A"
  }
];

export default function AgileProductManagementPracticeExam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const handleAnswerSelect = (option: string) => {
    if (currentQuestion) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: option
      });
    }
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

  // Show message if no questions are available
  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#f0f9ff]">
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
        <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              SAFe Agile Product Management Practice Exam
            </h1>
            <p className="text-gray-700 mb-6">
              Questions for this practice exam are being prepared. Please check back soon!
            </p>
            <Link
              href="/test"
              className="inline-block bg-[#01203d] hover:bg-[#023a6b] text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Back to Practice Tests
            </Link>
          </div>
        </section>
      </main>
    );
  }

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
              SAFe Agile Product Management Practice Exam
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
          {currentQuestion && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {currentQuestion.question}
                </h2>

              <div className="space-y-3">
                {currentQuestion && Object.entries(currentQuestion.options).map(([key, value]) => {
                  const isSelected = currentQuestion && answers[currentQuestion.id] === key;
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
          )}

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

