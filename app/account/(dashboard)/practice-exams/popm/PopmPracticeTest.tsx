'use client';

import { useState } from 'react';
import Link from 'next/link';
import { POPM_QUESTIONS } from './questions';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

type Props = {
  /** e.g. shared /popm-pro-temp link — avoid /account URLs that require login */
  backHref?: string;
  backLabel?: string;
};

export default function PopmPracticeTest({
  backHref = '/account/practice-exams',
  backLabel = 'Back to Practice Exams',
}: Props = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const question = POPM_QUESTIONS[currentIndex];
  const total = POPM_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  if (showResults) {
    const correct = POPM_QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / total) * 100);
    const passingScore = 73; // SAFe exam typically ~73% to pass

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practice Test Results</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className={`text-4xl font-bold ${score >= passingScore ? 'text-green-600' : 'text-amber-600'}`}>
              {score}%
            </div>
            <div>
              <p className="text-slate-600">
                You got {correct} out of {total} questions correct.
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {score >= passingScore
                  ? 'Great job! You\'re on track for the certification exam.'
                  : 'Review the questions below and try again when ready.'}
              </p>
            </div>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {POPM_QUESTIONS.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <p className="font-medium text-slate-900 mb-2">
                    {q.id}. {q.question}
                  </p>
                  <p className="text-sm">
                    Your answer: {userAnswer !== undefined ? OPTION_LETTERS[userAnswer] + '. ' + q.options[userAnswer] : '—'}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-green-700 mt-1">
                      Correct: {OPTION_LETTERS[q.correctIndex]}. {q.options[q.correctIndex]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-[#fa4a23] text-white rounded-lg font-medium hover:bg-[#e8431f] transition-colors"
            >
              Retake Test
            </button>
            <Link
              href={backHref}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Question {currentIndex + 1} of {total} • {answeredCount} answered
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === total - 1}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          {question.id}. {question.question}
        </h2>
        <ul className="space-y-3">
          {question.options.map((option, idx) => {
            const selected = answers[question.id] === idx;
            const hasAnswered = answers[question.id] !== undefined;
            const isCorrect = idx === question.correctIndex;
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors flex items-start gap-3 ${
                    selected
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-[#fa4a23] bg-orange-50 text-slate-900'
                      : hasAnswered && isCorrect
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="font-medium text-slate-500 flex-shrink-0 w-6">
                    {OPTION_LETTERS[idx]}.
                  </span>
                  <span className="flex-1">{option}</span>
                  {hasAnswered && isCorrect && (
                    <span className="text-green-600 font-bold flex-shrink-0" title="Correct answer">✔</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        {answers[question.id] !== undefined && (
          <p className={`mt-4 text-sm font-medium ${answers[question.id] === question.correctIndex ? 'text-green-600' : 'text-amber-600'}`}>
            {answers[question.id] === question.correctIndex ? '✓ Correct!' : `The correct answer is ${OPTION_LETTERS[question.correctIndex]}.`}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={backHref}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ← {backLabel}
        </Link>
        <button
          onClick={handleSubmit}
          disabled={answeredCount < total}
          className="px-6 py-2.5 bg-[#fa4a23] text-white rounded-lg font-medium hover:bg-[#e8431f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
