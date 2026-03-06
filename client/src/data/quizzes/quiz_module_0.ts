export const quizModule0 = {
  id: 'quiz_module_0',
  moduleId: 'module_0_divisibility',
  title: 'Quiz: Divisibilidad y Cimientos',
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: '¿Cuál es la definición de divisibilidad?',
      options: [
        {
          value: 'a',
          label: 'Un número $a$ divide a $b$ si existe un entero $k$ tal que $b = a \\times k$',
          correct: true,
          explanation: 'Correcto. Esta es la definición formal de divisibilidad.',
        },
        {
          value: 'b',
          label: 'Un número divide a otro si el resultado es siempre un número entero',
          correct: false,
          explanation: 'Incorrecto. Aunque suena similar, la definición formal requiere que exista un entero $k$.',
        },
        {
          value: 'c',
          label: 'Un número divide a otro si es más pequeño',
          correct: false,
          explanation: 'Incorrecto. El tamaño no determina la divisibilidad.',
        },
      ],
      difficulty: 'easy',
    },
    {
      id: 'q2',
      question: '¿Cuál es el criterio de divisibilidad por 3?',
      options: [
        {
          value: 'a',
          label: 'Un número es divisible por 3 si su última cifra es 0, 3, 6 o 9',
          correct: false,
          explanation: 'Incorrecto. Ese es el criterio para algunos números, pero no es el correcto para 3.',
        },
        {
          value: 'b',
          label: 'Un número es divisible por 3 si la suma de sus cifras es divisible por 3',
          correct: true,
          explanation: 'Correcto. Este es el criterio de divisibilidad por 3.',
        },
        {
          value: 'c',
          label: 'Un número es divisible por 3 si es impar',
          correct: false,
          explanation: 'Incorrecto. La paridad no está relacionada con la divisibilidad por 3.',
        },
      ],
      difficulty: 'easy',
    },
    {
      id: 'q3',
      question: '¿Cuál es la factorización en primos de 60?',
      options: [
        {
          value: 'a',
          label: '$2 \\times 3 \\times 5$',
          correct: false,
          explanation: 'Incorrecto. $2 \\times 3 \\times 5 = 30$, no 60.',
        },
        {
          value: 'b',
          label: '$2^2 \\times 3 \\times 5$',
          correct: true,
          explanation: 'Correcto. $2^2 \\times 3 \\times 5 = 4 \\times 3 \\times 5 = 60$.',
        },
        {
          value: 'c',
          label: '$2 \\times 3^2 \\times 5$',
          correct: false,
          explanation: 'Incorrecto. $2 \\times 3^2 \\times 5 = 2 \\times 9 \\times 5 = 90$, no 60.',
        },
      ],
      difficulty: 'medium',
    },
    {
      id: 'q4',
      question: '¿Cuál es el MCD de 24 y 36?',
      options: [
        {
          value: 'a',
          label: '6',
          correct: false,
          explanation: 'Incorrecto. 6 divide a ambos, pero no es el máximo.',
        },
        {
          value: 'b',
          label: '12',
          correct: true,
          explanation: 'Correcto. 12 es el mayor número que divide a ambos 24 y 36.',
        },
        {
          value: 'c',
          label: '24',
          correct: false,
          explanation: 'Incorrecto. 24 no divide a 36.',
        },
      ],
      difficulty: 'medium',
    },
    {
      id: 'q5',
      question: '¿Cuál es la fracción irreducible de $\\frac{48}{60}$?',
      options: [
        {
          value: 'a',
          label: '$\\frac{4}{5}$',
          correct: true,
          explanation: 'Correcto. MCD(48, 60) = 12, entonces $\\frac{48}{60} = \\frac{48÷12}{60÷12} = \\frac{4}{5}$.',
        },
        {
          value: 'b',
          label: '$\\frac{8}{10}$',
          correct: false,
          explanation: 'Incorrecto. Esta fracción aún se puede reducir más.',
        },
        {
          value: 'c',
          label: '$\\frac{2}{3}$',
          correct: false,
          explanation: 'Incorrecto. $\\frac{2}{3} \\neq \\frac{48}{60}$.',
        },
      ],
      difficulty: 'hard',
    },
    {
      id: 'q6',
      question: '¿Cuál de los siguientes números es primo?',
      options: [
        {
          value: 'a',
          label: '1',
          correct: false,
          explanation: 'Incorrecto. 1 no es considerado primo por definición.',
        },
        {
          value: 'b',
          label: '17',
          correct: true,
          explanation: 'Correcto. 17 solo es divisible por 1 y por sí mismo.',
        },
        {
          value: 'c',
          label: '21',
          correct: false,
          explanation: 'Incorrecto. 21 = 3 × 7, por lo que no es primo.',
        },
      ],
      difficulty: 'easy',
    },
  ],
};
