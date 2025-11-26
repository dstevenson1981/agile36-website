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
    question: "When evaluating improvement opportunities, which parts of the value stream should receive the most attention?",
    options: {
      A: "Steps with the least automation",
      B: "Stages that create the longest delays or bottlenecks",
      C: "Areas with the highest staffing levels",
      D: "Steps owned by external suppliers"
    },
    correct: "B"
  },
  {
    id: 2,
    question: "At what point does Continuous Integration officially begin in the Continuous Delivery Pipeline?",
    options: {
      A: "After features are deployed to production",
      B: "As soon as code is committed to the shared repository",
      C: "Once iteration goals are finalized",
      D: "After system-level testing is completed"
    },
    correct: "B"
  },
  {
    id: 3,
    question: "When should teams use root cause analysis during DevOps transformation?",
    options: {
      A: "Only after a production incident occurs",
      B: "Whenever recurring delivery challenges need deeper understanding",
      C: "At the end of each PI only",
      D: "During PI Planning exclusively"
    },
    correct: "B"
  },
  {
    id: 4,
    question: "What are the first two elements teams should identify during value stream mapping?",
    options: {
      A: "System architecture and technical debt",
      B: "Major work steps and the time required for each",
      C: "Team composition and backlog size",
      D: "Deployment frequency and release calendar"
    },
    correct: "B"
  },
  {
    id: 5,
    question: "What is the recommended method for prioritizing DevOps improvement items?",
    options: {
      A: "Choose based on ease of implementation",
      B: "Select improvements that deliver the greatest reduction in lead time",
      C: "Pick items that require the least collaboration",
      D: "Focus solely on automation opportunities"
    },
    correct: "B"
  },
  {
    id: 6,
    question: "Which work typically occurs during the Build activity of the Continuous Delivery Pipeline?",
    options: {
      A: "Defining use cases",
      B: "Compiling, packaging, and integrating code components",
      C: "Deploying features to customers",
      D: "Executing release approvals"
    },
    correct: "B"
  },
  {
    id: 7,
    question: "Why is forming hypotheses important when monitoring solution performance?",
    options: {
      A: "It ensures teams deploy less frequently",
      B: "It helps analyze data objectively and determine if outcomes meet expectations",
      C: "It removes the need for observability tools",
      D: "It simplifies compliance reporting"
    },
    correct: "B"
  },
  {
    id: 8,
    question: "Which groups must collaborate closely when addressing issues in production?",
    options: {
      A: "Marketing and finance",
      B: "Support, development, and operations teams",
      C: "Legal and HR",
      D: "Architecture and procurement"
    },
    correct: "B"
  },
  {
    id: 9,
    question: "Which scenario best illustrates a major bottleneck?",
    options: {
      A: "High customer demand for new features",
      B: "A single approval step that regularly delays releases",
      C: "Frequent standup meetings",
      D: "Teams working in the same time zone"
    },
    correct: "B"
  },
  {
    id: 10,
    question: "What is one possible result of the Verify activity?",
    options: {
      A: "A system rollback",
      B: "Automated quality checks confirming code readiness",
      C: "Deployment to customers",
      D: "Creation of the next PI roadmap"
    },
    correct: "B"
  },
  {
    id: 11,
    question: "Which two statements describe the intent of value stream mapping?",
    options: {
      A: "It identifies unnecessary documentation requirements",
      B: "It reveals delays and waste while fostering shared understanding of flow",
      C: "It prioritizes backlog items by WSJF",
      D: "It defines user personas"
    },
    correct: "B"
  },
  {
    id: 12,
    question: "What does the Boundaries and Limitations section of a DevOps Transformation Canvas clarify?",
    options: {
      A: "Business constraints that may restrict transformation efforts",
      B: "Architecture guidelines for future systems",
      C: "The daily workflow of each team",
      D: "The PI objectives for each Agile team"
    },
    correct: "A"
  },
  {
    id: 13,
    question: "What is weighted shortest job first (WSJF) used to determine?",
    options: {
      A: "The longest job duration",
      B: "Economic priority of backlog items",
      C: "Architectural runway readiness",
      D: "Compliance risk levels"
    },
    correct: "B"
  },
  {
    id: 14,
    question: "Continuous Exploration primarily supports which stakeholder concern?",
    options: {
      A: "Defining deploy-ready code",
      B: "Understanding customer needs and solution intent",
      C: "Finalizing release documentation",
      D: "Optimizing job duration"
    },
    correct: "B"
  },
  {
    id: 15,
    question: "Under the CALMR approach, what should be measured?",
    options: {
      A: "Developer hours",
      B: "Flow, quality, and reliability metrics",
      C: "Team certification count",
      D: "Budget spent per PI"
    },
    correct: "B"
  },
  {
    id: 16,
    question: "Which factor most slows down a DevOps transformation?",
    options: {
      A: "Limited office space",
      B: "Cultural resistance to change",
      C: "Frequent team celebrations",
      D: "Too many test cases"
    },
    correct: "B"
  },
  {
    id: 17,
    question: "Feature toggles are especially useful for which purpose?",
    options: {
      A: "Preventing code reuse",
      B: "Enabling incremental deployment without exposing functionality",
      C: "Replacing the need for testing",
      D: "Increasing batch size"
    },
    correct: "B"
  },
  {
    id: 18,
    question: "Which technical practice includes finding security issues during the build process?",
    options: {
      A: "DevSecOps scanning",
      B: "Manual code review",
      C: "Backlog prioritization",
      D: "Whole-system demos"
    },
    correct: "A"
  },
  {
    id: 19,
    question: "Which two areas are components of the Continuous Delivery Pipeline?",
    options: {
      A: "Portfolio governance and budgeting",
      B: "Continuous Exploration and Continuous Deployment",
      C: "Customer support and finance",
      D: "Scrum events and HR policy"
    },
    correct: "B"
  },
  {
    id: 20,
    question: "A canary release exposes a new solution version to which group?",
    options: {
      A: "All customers at once",
      B: "A small, targeted segment of users",
      C: "Only internal employees",
      D: "Third-party vendors"
    },
    correct: "B"
  },
  {
    id: 21,
    question: "What generally triggers the Release activity?",
    options: {
      A: "A fixed calendar date",
      B: "A business decision confirming that a solution is ready to reach customers",
      C: "Completion of all enabler stories",
      D: "PI Planning"
    },
    correct: "B"
  },
  {
    id: 22,
    question: "What does the activity ratio indicate in a value stream?",
    options: {
      A: "Proportion of productive time versus total lead time",
      B: "Number of people involved per activity",
      C: "Quality of user stories",
      D: "Cost of each step"
    },
    correct: "A"
  },
  {
    id: 23,
    question: "What does value stream mapping typically uncover in the delivery pipeline?",
    options: {
      A: "Balanced workloads",
      B: "Delays, handoffs, and rework hotspots",
      C: "Customer segmentation",
      D: "Architectural runway gaps"
    },
    correct: "B"
  },
  {
    id: 24,
    question: "What are two major benefits of mapping the current-state pipeline?",
    options: {
      A: "It identifies waste and clarifies improvement priorities",
      B: "It reduces WIP limits",
      C: "It finalizes code coverage requirements",
      D: "It improves marketing tasks"
    },
    correct: "A"
  },
  {
    id: 25,
    question: "Continuous Deployment supports which core objective?",
    options: {
      A: "Releasing annually",
      B: "Ensuring solutions are deployable at any time",
      C: "Eliminating the need for verification",
      D: "Centralizing testing"
    },
    correct: "B"
  },
  {
    id: 26,
    question: "What are two key benefits of DevOps?",
    options: {
      A: "Higher WIP and slower flow",
      B: "Better flow and improved solution quality",
      C: "More approvals and more documentation",
      D: "Fewer releases and lower automation"
    },
    correct: "B"
  },
  {
    id: 27,
    question: "What is a likely consequence of developers working in long-lived, isolated branches?",
    options: {
      A: "Fewer integration conflicts",
      B: "Delayed feedback and harder merges",
      C: "Faster deployments",
      D: "Higher code reuse"
    },
    correct: "B"
  },
  {
    id: 28,
    question: "Which two competencies belong to the Respond activity?",
    options: {
      A: "Marketing analysis and budgeting",
      B: "Incident response and problem management",
      C: "Backlog refinement and PI Planning",
      D: "UX design and prototyping"
    },
    correct: "B"
  },
  {
    id: 29,
    question: "What marks the start of the Continuous Delivery Pipeline?",
    options: {
      A: "Deployment to staging",
      B: "A customer problem or need being identified",
      C: "Completion of a PI",
      D: "Code release to production"
    },
    correct: "B"
  },
  {
    id: 30,
    question: "Gemba walks are most relevant to which aspect of the DevOps Health Radar?",
    options: {
      A: "Discover",
      B: "Learn",
      C: "Improve",
      D: "Respond"
    },
    correct: "C"
  },
  {
    id: 31,
    question: "In which activity are specific pipeline improvements identified?",
    options: {
      A: "Daily standups",
      B: "Inspect and Adapt problem-solving workshop",
      C: "Backlog refinement",
      D: "PO Sync"
    },
    correct: "B"
  },
  {
    id: 32,
    question: "What differentiates Deployment from Release?",
    options: {
      A: "Deployment always involves customer exposure",
      B: "Deployment moves code to production; Release exposes it to users",
      C: "Release happens first, Deployment second",
      D: "Deployment requires no automation"
    },
    correct: "B"
  },
  {
    id: 33,
    question: "What often occurs when development and operations fail to collaborate early?",
    options: {
      A: "Faster cycle times",
      B: "Late issues emerging during deployment",
      C: "Simpler integration",
      D: "Higher solution quality"
    },
    correct: "B"
  },
  {
    id: 34,
    question: "How is Lean UX practiced during Continuous Exploration?",
    options: {
      A: "Building complete UI designs upfront",
      B: "Running quick experiments to learn what customers value",
      C: "Replacing customer interviews with surveys",
      D: "Skipping prototyping"
    },
    correct: "B"
  },
  {
    id: 35,
    question: "What might result from the Release activity?",
    options: {
      A: "Customer feedback on newly delivered value",
      B: "Discontinuation of testing",
      C: "Reduction in automation",
      D: "Full removal of verification steps"
    },
    correct: "A"
  },
  {
    id: 36,
    question: "Which measure indicates the quality of output at each value stream step?",
    options: {
      A: "Iteration velocity",
      B: "Process time",
      C: "Percent complete and accurate",
      D: "WIP count"
    },
    correct: "C"
  },
  {
    id: 37,
    question: "Which practice helps developers confidently deploy their own code?",
    options: {
      A: "Manual change reviews",
      B: "Automated deployment pipelines",
      C: "Monthly release cycles",
      D: "Strict handoff procedures"
    },
    correct: "B"
  },
  {
    id: 38,
    question: "How should developers incorporate refactoring?",
    options: {
      A: "Avoid unless major defects occur",
      B: "Combine it as part of regular development flow",
      C: "Perform only during PI Planning",
      D: "Schedule once annually"
    },
    correct: "B"
  },
  {
    id: 39,
    question: "What major anti-pattern does DevOps aim to eliminate?",
    options: {
      A: "Frequent customer feedback",
      B: "Siloed development and operations groups",
      C: "Automated testing",
      D: "Documentation of solution intent"
    },
    correct: "B"
  },
  {
    id: 40,
    question: "Scanning application code for vulnerabilities occurs in which pipeline aspect?",
    options: {
      A: "Continuous Exploration",
      B: "Continuous Integration",
      C: "Continuous Deployment",
      D: "Release on Demand"
    },
    correct: "B"
  },
  {
    id: 41,
    question: "The DevOps Health Radar aligns pipeline aspects with which stakeholder concerns?",
    options: {
      A: "Value, quality, governance, and flow",
      B: "Cost, revenue, marketing, and HR",
      C: "Velocity, WIP, defects, and cost",
      D: "Legal, finance, staffing, and training"
    },
    correct: "A"
  },
  {
    id: 42,
    question: "Where do features usually go after the Continuous Exploration phase?",
    options: {
      A: "Deployment pipeline",
      B: "Program Backlog",
      C: "Completed PI objectives",
      D: "Release calendar"
    },
    correct: "B"
  },
  {
    id: 43,
    question: "What should teams be able to do after performing current-state mapping?",
    options: {
      A: "Release immediately to production",
      B: "Identify bottlenecks and define targeted improvements",
      C: "Double solution documentation",
      D: "Eliminate all manual steps"
    },
    correct: "B"
  },
  {
    id: 44,
    question: "New question: What is a key goal of increasing deployment frequency in a DevOps environment?",
    options: {
      A: "Reduce the number of feedback cycles",
      B: "Lower the need for automation",
      C: "Deliver smaller changes that reduce risk",
      D: "Increase handoff complexity"
    },
    correct: "C"
  },
  {
    id: 45,
    question: "New question: What is an early indicator that a DevOps transformation is progressing well?",
    options: {
      A: "An increase in manual approval steps",
      B: "Greater collaboration between development and operations",
      C: "Fewer automated tests",
      D: "Longer release cycles"
    },
    correct: "B"
  }
];

export default function DevOpsPracticeExam() {
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
              SAFe DevOps Practice Exam
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
              SAFe DevOps Practice Exam
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

