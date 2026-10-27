import type {
  Question,
  Poll,
  Quiz,
  QuizQuestion,
  ChatMessage,
  LiveSession,
  QuizScore
} from '@/types/live';

// Preguntas Q&A mock
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    eventId: '1',
    userId: 'user1',
    userName: 'María García',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    question: '¿Cuál es la mejor práctica para implementar microservicios en producción?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    upvotes: 24,
    hasUpvoted: false,
    status: 'pending'
  },
  {
    id: 'q2',
    eventId: '1',
    userId: 'user2',
    userName: 'Carlos Rodríguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    question: '¿Qué herramientas recomiendas para CI/CD con Kubernetes?',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    upvotes: 18,
    hasUpvoted: true,
    status: 'pending'
  },
  {
    id: 'q3',
    eventId: '1',
    userId: 'user3',
    userName: 'Ana Martínez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    question: '¿Cómo manejan la observabilidad en aplicaciones distribuidas?',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    upvotes: 31,
    hasUpvoted: false,
    status: 'answered',
    answer: 'Usamos una combinación de Prometheus para métricas, Jaeger para tracing distribuido y ELK stack para logs centralizados. La clave es tener buenos dashboards en Grafana.',
    answeredAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    answeredBy: 'Ponente Principal'
  },
  {
    id: 'q4',
    eventId: '1',
    userId: 'user4',
    userName: 'Luis Fernández',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    question: '¿Cuál es el costo aproximado de migrar a la nube?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    upvotes: 12,
    hasUpvoted: false,
    status: 'pending'
  },
  {
    id: 'q5',
    eventId: '1',
    userId: 'user5',
    userName: 'Diana López',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    question: '¿Qué estrategia usan para el rollback de deployments?',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    upvotes: 9,
    hasUpvoted: false,
    status: 'featured'
  }
];

// Polls mock
export const mockPolls: Poll[] = [
  {
    id: 'poll1',
    eventId: '1',
    question: '¿Cuál es tu lenguaje de programación favorito para backend?',
    options: [
      { id: 'opt1', text: 'Node.js / JavaScript', votes: 145, percentage: 42 },
      { id: 'opt2', text: 'Python', votes: 98, percentage: 28 },
      { id: 'opt3', text: 'Java', votes: 67, percentage: 19 },
      { id: 'opt4', text: 'Go', votes: 38, percentage: 11 }
    ],
    status: 'active',
    totalVotes: 348,
    hasVoted: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'poll2',
    eventId: '1',
    question: '¿Usas contenedores en producción?',
    options: [
      { id: 'opt1', text: 'Sí, Docker', votes: 187, percentage: 54 },
      { id: 'opt2', text: 'Sí, con Kubernetes', votes: 112, percentage: 32 },
      { id: 'opt3', text: 'No, VMs tradicionales', votes: 35, percentage: 10 },
      { id: 'opt4', text: 'Serverless', votes: 14, percentage: 4 }
    ],
    status: 'closed',
    totalVotes: 348,
    hasVoted: true,
    userVote: 'opt2',
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  }
];

// Quiz questions mock
const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-q1',
    question: '¿Qué significa "CI/CD"?',
    options: [
      { id: 'opt1', text: 'Continuous Integration / Continuous Deployment' },
      { id: 'opt2', text: 'Cloud Infrastructure / Cloud Delivery' },
      { id: 'opt3', text: 'Code Integration / Code Development' },
      { id: 'opt4', text: 'Container Interface / Container Distribution' }
    ],
    correctOptionId: 'opt1',
    timeLimit: 30,
    points: 100,
    explanation: 'CI/CD significa Integración Continua y Despliegue Continuo, prácticas fundamentales en DevOps.'
  },
  {
    id: 'quiz-q2',
    question: '¿Cuál NO es un patrón de diseño de microservicios?',
    options: [
      { id: 'opt1', text: 'API Gateway' },
      { id: 'opt2', text: 'Circuit Breaker' },
      { id: 'opt3', text: 'Monolithic Database' },
      { id: 'opt4', text: 'Service Discovery' }
    ],
    correctOptionId: 'opt3',
    timeLimit: 30,
    points: 100,
    explanation: 'Monolithic Database es un anti-patrón en microservicios. Cada servicio debe tener su propia base de datos.'
  },
  {
    id: 'quiz-q3',
    question: '¿Qué herramienta se usa para orquestar contenedores?',
    options: [
      { id: 'opt1', text: 'Docker' },
      { id: 'opt2', text: 'Kubernetes' },
      { id: 'opt3', text: 'Git' },
      { id: 'opt4', text: 'Jenkins' }
    ],
    correctOptionId: 'opt2',
    timeLimit: 25,
    points: 100,
    explanation: 'Kubernetes es el estándar de facto para orquestación de contenedores en producción.'
  }
];

// Quiz actual
export const mockQuiz: Quiz = {
  id: 'quiz1',
  eventId: '1',
  status: 'waiting',
  totalQuestions: mockQuizQuestions.length,
  currentQuestionNumber: 0
};

// Leaderboard mock
export const mockLeaderboard: QuizScore[] = [
  {
    userId: 'user1',
    userName: 'María García',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    totalPoints: 280,
    correctAnswers: 3,
    rank: 1
  },
  {
    userId: 'user2',
    userName: 'Carlos Rodríguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    totalPoints: 250,
    correctAnswers: 3,
    rank: 2
  },
  {
    userId: 'user3',
    userName: 'Ana Martínez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    totalPoints: 180,
    correctAnswers: 2,
    rank: 3
  },
  {
    userId: 'user4',
    userName: 'Luis Fernández',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    totalPoints: 150,
    correctAnswers: 2,
    rank: 4
  },
  {
    userId: 'user5',
    userName: 'Diana López',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    totalPoints: 100,
    correctAnswers: 1,
    rank: 5
  }
];

// Mensajes de chat mock
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    eventId: '1',
    userId: 'user1',
    userName: 'María García',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    message: '¡Excelente presentación! 🎉',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    reactions: [
      { emoji: '👍', count: 5, userIds: ['user2', 'user3', 'user4', 'user5', 'user6'] },
      { emoji: '🔥', count: 2, userIds: ['user7', 'user8'] }
    ]
  },
  {
    id: 'msg2',
    eventId: '1',
    userId: 'user2',
    userName: 'Carlos Rodríguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    message: '¿Alguien tiene el link de las slides?',
    timestamp: new Date(Date.now() - 90 * 1000).toISOString()
  },
  {
    id: 'msg3',
    eventId: '1',
    userId: 'user3',
    userName: 'Ana Martínez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    message: 'Súper interesante el tema de Kubernetes',
    timestamp: new Date(Date.now() - 60 * 1000).toISOString(),
    reactions: [{ emoji: '💯', count: 3, userIds: ['user4', 'user5', 'user6'] }]
  },
  {
    id: 'msg4',
    eventId: '1',
    userId: 'user4',
    userName: 'Luis Fernández',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    message: 'Gracias por compartir las mejores prácticas 🙌',
    timestamp: new Date(Date.now() - 30 * 1000).toISOString()
  },
  {
    id: 'msg5',
    eventId: '1',
    userId: 'user5',
    userName: 'Diana López',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    message: 'Esto lo voy a aplicar en mi trabajo',
    timestamp: new Date(Date.now() - 10 * 1000).toISOString()
  }
];

// Sesión live completa mock
export const mockLiveSession: LiveSession = {
  id: 'live1',
  eventId: '1',
  streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // Stream de prueba público
  isLive: true,
  startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  viewerCount: 342,
  chat: {
    enabled: true,
    messages: mockChatMessages
  },
  qa: {
    enabled: true,
    questions: mockQuestions
  },
  polls: {
    enabled: true,
    active: [mockPolls[0]],
    upcoming: [],
    closed: [mockPolls[1]]
  },
  quiz: {
    enabled: true,
    current: mockQuiz
  }
};

// Helper: Obtener pregunta actual del quiz
export function getCurrentQuizQuestion(quiz: Quiz): QuizQuestion | null {
  if (quiz.status === 'waiting' || quiz.currentQuestionNumber === 0) {
    return null;
  }
  return mockQuizQuestions[quiz.currentQuestionNumber - 1] || null;
}

// Helper: Obtener siguiente pregunta del quiz
export function getNextQuizQuestion(quiz: Quiz): QuizQuestion | null {
  const nextIndex = quiz.currentQuestionNumber;
  return mockQuizQuestions[nextIndex] || null;
}
