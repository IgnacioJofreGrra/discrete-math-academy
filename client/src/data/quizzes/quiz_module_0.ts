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
      question: '¿Cuál es el criterio de divisibilidad por 4?',
      options: [
        {
          value: 'a',
          label: 'Un número es divisible por 4 si termina en 0 o 5',
          correct: false,
          explanation: 'Incorrecto. Ese criterio corresponde al 5.',
        },
        {
          value: 'b',
          label: 'Un número es divisible por 4 si sus dos últimas cifras son 00 o múltiplo de 4',
          correct: true,
          explanation: 'Correcto. Solo se revisan las dos últimas cifras.',
        },
        {
          value: 'c',
          label: 'Un número es divisible por 4 si la suma de sus cifras es múltiplo de 4',
          correct: false,
          explanation: 'Incorrecto. La suma de cifras no es el criterio del 4.',
        },
      ],
      difficulty: 'easy',
    },
    {
      id: 'q4',
      question: '¿Cuál condición garantiza divisibilidad por 6?',
      options: [
        {
          value: 'a',
          label: 'Ser divisible por 2 y por 3 al mismo tiempo',
          correct: true,
          explanation: 'Correcto. Ese es exactamente el criterio de 6.',
        },
        {
          value: 'b',
          label: 'Terminar en 0 o 5',
          correct: false,
          explanation: 'Incorrecto. Ese criterio corresponde al 5.',
        },
        {
          value: 'c',
          label: 'Que la suma de cifras sea par',
          correct: false,
          explanation: 'Incorrecto. No es un criterio válido para 6.',
        },
      ],
      difficulty: 'easy',
    },
    {
      id: 'q5',
      question: 'Aplicando la regla de 7, ¿203 es divisible por 7?',
      options: [
        {
          value: 'a',
          label: 'Sí, porque 20 - 2(3) = 14, y 14 es múltiplo de 7',
          correct: true,
          explanation: 'Correcto. La transformación da un múltiplo de 7.',
        },
        {
          value: 'b',
          label: 'No, porque termina en 3',
          correct: false,
          explanation: 'Incorrecto. La última cifra no determina divisibilidad por 7.',
        },
        {
          value: 'c',
          label: 'No, porque 203 es impar',
          correct: false,
          explanation: 'Incorrecto. Ser impar no impide ser divisible por 7.',
        },
      ],
      difficulty: 'medium',
    },
    {
      id: 'q6',
      question: '¿Cuál de estos números es divisible por 8?',
      options: [
        {
          value: 'a',
          label: '712 (porque 712 es múltiplo de 8)',
          correct: true,
          explanation: 'Correcto. Las tres últimas cifras 712 forman un múltiplo de 8.',
        },
        {
          value: 'b',
          label: '734',
          correct: false,
          explanation: 'Incorrecto. 734 no es múltiplo de 8.',
        },
        {
          value: 'c',
          label: '726',
          correct: false,
          explanation: 'Incorrecto. 726 no es múltiplo de 8.',
        },
      ],
      difficulty: 'medium',
    },
    {
      id: 'q7',
      question: '¿Cuál de los siguientes números es divisible por 9?',
      options: [
        {
          value: 'a',
          label: '441 (4 + 4 + 1 = 9)',
          correct: true,
          explanation: 'Correcto. La suma de cifras es 9, múltiplo de 9.',
        },
        {
          value: 'b',
          label: '452 (4 + 5 + 2 = 11)',
          correct: false,
          explanation: 'Incorrecto. 11 no es múltiplo de 9.',
        },
        {
          value: 'c',
          label: '631 (6 + 3 + 1 = 10)',
          correct: false,
          explanation: 'Incorrecto. 10 no es múltiplo de 9.',
        },
      ],
      difficulty: 'easy',
    },
    {
      id: 'q8',
      question: '¿Cuál es el criterio de divisibilidad por 10?',
      options: [
        {
          value: 'a',
          label: 'Terminar en cifra par',
          correct: false,
          explanation: 'Incorrecto. Ese criterio corresponde al 2.',
        },
        {
          value: 'b',
          label: 'Terminar en 0',
          correct: true,
          explanation: 'Correcto. Todo múltiplo de 10 termina en 0.',
        },
        {
          value: 'c',
          label: 'Que la suma de cifras sea 10',
          correct: false,
          explanation: 'Incorrecto. La suma de cifras no define divisibilidad por 10.',
        },
      ],
      difficulty: 'easy',
    },
    {
      id: 'q9',
      question: '¿Cuál de estos números es divisible por 11 usando la diferencia de sumas?',
      options: [
        {
          value: 'a',
          label: '121, porque (1 + 1) - 2 = 0',
          correct: true,
          explanation: 'Correcto. La diferencia es 0, por lo que es divisible por 11.',
        },
        {
          value: 'b',
          label: '123, porque 1 + 2 + 3 = 6',
          correct: false,
          explanation: 'Incorrecto. Ese cálculo no corresponde al criterio de 11.',
        },
        {
          value: 'c',
          label: '124, porque termina en 4',
          correct: false,
          explanation: 'Incorrecto. La última cifra no define divisibilidad por 11.',
        },
      ],
      difficulty: 'medium',
    },
  ],
};
