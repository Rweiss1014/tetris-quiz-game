import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { FileText, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { type Question } from './questionBank';
import { soundEffects } from './soundEffects';

interface QuestionDialogProps {
  open: boolean;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onComplete: (isCorrect: boolean, timeElapsed: number) => void;
}

const TIME_LIMIT = 30;

export function QuestionDialog({ open, question, questionNumber, totalQuestions, onComplete }: QuestionDialogProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeRemaining(TIME_LIMIT);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = Math.max(0, TIME_LIMIT - elapsed);
        setTimeRemaining(remaining);
        if (remaining <= 10 && remaining > 5) soundEffects.timerTick();
        else if (remaining <= 5 && remaining > 0) soundEffects.urgentBeep();
        if (remaining === 0) { if (timerRef.current) clearInterval(timerRef.current); handleSubmitAnswer(null); }
      }, 100);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [open]);

  const handleSubmitAnswer = (answerIndex: number | null = selectedAnswer) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const finalTimeElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const isCorrect = answerIndex === question.correctAnswer;
    isCorrect ? soundEffects.correct() : soundEffects.wrong();
    setShowExplanation(true);
    setTimeout(() => onComplete(isCorrect, finalTimeElapsed), 2500);
  };

  const timeProgress = (timeRemaining / TIME_LIMIT) * 100;
  const isAnswerCorrect = selectedAnswer === question.correctAnswer;
  const getTimeColor = () => timeRemaining > 20 ? 'text-green-600' : timeRemaining > 10 ? 'text-yellow-600' : 'text-red-600';

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl bg-gray-50 border-gray-200 max-h-[92vh] overflow-y-auto p-4"
        onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="sr-only">Question {questionNumber} of {totalQuestions}</DialogTitle>
          <DialogDescription className="sr-only">Answer the question within {TIME_LIMIT} seconds.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 pb-3 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-cyan-700">Quick Question!</h2>
              <p className="text-xs text-gray-600 mt-0.5">Answer quickly for bonus points</p>
            </div>
            <div className="text-right space-y-0.5">
              <div className="text-xs text-gray-600">Question {questionNumber} of {totalQuestions}</div>
              <div className={`flex items-center gap-1 ${getTimeColor()} ${timeRemaining <= 5 && timeRemaining > 0 ? 'animate-pulse' : ''}`}>
                <Clock className={`w-3 h-3 ${timeRemaining <= 5 && timeRemaining > 0 ? 'animate-bounce' : ''}`} />
                <span className="font-mono">{timeRemaining}s</span>
              </div>
            </div>
          </div>
          <div>
            <Progress value={timeProgress} className={`h-1.5 ${timeRemaining > 20 ? 'bg-gray-200' : timeRemaining > 10 ? 'bg-yellow-100' : 'bg-red-100'}`} />
            {!showExplanation && timeRemaining <= 10 && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1"><Zap className="w-3 h-3" /> Hurry! Time is running out</p>
            )}
          </div>
        </div>
        <div className={`bg-white border rounded-lg shadow-sm p-4 space-y-3 transition-all ${timeRemaining <= 5 && !showExplanation ? 'border-2 border-red-500 shadow-red-200' : 'border border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <FileText className="w-3 h-3 text-cyan-600" />
            <span className="inline-block border border-cyan-200 bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full text-xs">{question.category}</span>
          </div>
          <div>
            <h3 className="text-sm text-gray-800 leading-relaxed">
              {question.scenario && <span className="block mb-2">{question.scenario}</span>}
              <span className="block font-semibold">{question.question}</span>
            </h3>
          </div>
          <div className="space-y-2 pt-1">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              let cardStyle = 'bg-white border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/30';
              if (showExplanation) {
                if (isCorrectOption) cardStyle = 'bg-green-50 border-2 border-green-400';
                else if (isSelected) cardStyle = 'bg-red-50 border-2 border-red-400';
                else cardStyle = 'bg-gray-50 border-2 border-gray-200 opacity-60';
              } else if (isSelected) cardStyle = 'bg-cyan-50 border-2 border-cyan-400';
              return (
                <button key={index} onClick={() => { if (!showExplanation) { soundEffects.click(); setSelectedAnswer(index); } }}
                  disabled={showExplanation}
                  className={`w-full p-3 rounded-lg text-left transition-all ${cardStyle} flex items-center justify-between`}>
                  <span className="text-xs text-gray-700 leading-relaxed">{option}</span>
                  {showExplanation && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />}
                  {showExplanation && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
        {showExplanation && question.explanation && (
          <div className={`border-2 rounded-lg p-3 ${isAnswerCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start gap-2">
              {isAnswerCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
              <div>
                <div className={`text-xs mb-0.5 ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>{isAnswerCorrect ? 'Correct!' : 'Incorrect'}</div>
                <div className="text-xs text-gray-700 leading-relaxed">{question.explanation}</div>
              </div>
            </div>
          </div>
        )}
        {!showExplanation && (
          <Button onClick={() => handleSubmitAnswer()} disabled={selectedAnswer === null}
            className="w-full h-10 bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-40">
            Submit Answer
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
