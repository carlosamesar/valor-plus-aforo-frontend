// Tipos para experiencia live del evento

export type QuestionStatus = 'pending' | 'answered' | 'featured';
export type PollStatus = 'active' | 'closed' | 'upcoming';
export type QuizStatus = 'waiting' | 'active' | 'finished';

// Pregunta Q&A
export interface Question {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  question: string;
  timestamp: string;
  upvotes: number;
  hasUpvoted: boolean;
  status: QuestionStatus;
  answer?: string;
  answeredAt?: string;
  answeredBy?: string;
}

// Poll (Votación)
export interface Poll {
  id: string;
  eventId: string;
  question: string;
  options: PollOption[];
  status: PollStatus;
  totalVotes: number;
  hasVoted: boolean;
  userVote?: string; // ID de la opción votada
  createdAt: string;
  closesAt?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

// Quiz (Juego)
export interface Quiz {
  id: string;
  eventId: string;
  status: QuizStatus;
  currentQuestion?: QuizQuestion;
  totalQuestions: number;
  currentQuestionNumber: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  timeLimit: number; // segundos
  points: number;
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpent: number; // segundos
  pointsEarned: number;
}

export interface QuizScore {
  userId: string;
  userName: string;
  userAvatar?: string;
  totalPoints: number;
  correctAnswers: number;
  rank: number;
}

// Chat en vivo
export interface ChatMessage {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  reactions?: ChatReaction[];
}

export interface ChatReaction {
  emoji: string;
  count: number;
  userIds: string[];
}

// Sesión live completa
export interface LiveSession {
  id: string;
  eventId: string;
  streamUrl: string;
  isLive: boolean;
  startedAt?: string;
  viewerCount: number;
  chat: {
    enabled: boolean;
    messages: ChatMessage[];
  };
  qa: {
    enabled: boolean;
    questions: Question[];
  };
  polls: {
    enabled: boolean;
    active: Poll[];
    upcoming: Poll[];
    closed: Poll[];
  };
  quiz: {
    enabled: boolean;
    current?: Quiz;
  };
}

// Usuario en sesión live
export interface LiveUser {
  id: string;
  name: string;
  avatar?: string;
  ticketId: string;
  joinedAt: string;
}
