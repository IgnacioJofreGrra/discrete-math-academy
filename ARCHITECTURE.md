# Discrete Math Academy - Arquitectura de Contenido y Modelo de Datos

## 1. Sitemap (Árbol de Navegación)

```
Discrete Math Academy
├── Home / Dashboard
│   ├── Progreso General
│   ├── Módulos Recomendados
│   └── Estadísticas de Aprendizaje
│
├── Módulo 0: Desde 0 (Divisibilidad y Cimientos)
│   ├── 0.1 Criterios de Divisibilidad
│   │   ├── Flashcards: Definiciones
│   │   ├── Step-by-Step: Algoritmo de divisibilidad
│   │   └── Desafíos: Problemas de divisibilidad
│   ├── 0.2 Factorización en Primos
│   │   ├── Flashcards: Teorema Fundamental de la Aritmética
│   │   ├── Step-by-Step: Algoritmo de factorización
│   │   └── Desafíos: Factorizar números
│   ├── 0.3 Fracciones Irreducibles
│   │   ├── Flashcards: Concepto de fracción irreducible
│   │   ├── Step-by-Step: Reducir fracciones
│   │   └── Desafíos: Simplificar fracciones
│   └── 0.4 Para qué sirve (Aplicaciones en CS)
│       └── Artículo: Criptografía y números primos
│
├── Módulo 1: Principio del Buen Orden (PBO)
│   ├── 1.1 Concepto Fundamental
│   │   ├── Flashcards: Definición del PBO
│   │   ├── Step-by-Step: Demostración del PBO
│   │   └── Desafíos: Identificar conjuntos bien ordenados
│   ├── 1.2 Pruebas por Absurdo
│   │   ├── Flashcards: Estructura de prueba por contradicción
│   │   ├── Step-by-Step: Ejemplo 2n+7 es impar
│   │   └── Desafíos: Construir pruebas por absurdo
│   ├── 1.3 Aplicaciones (Fracciones Irreducibles, Factorización)
│   │   ├── Step-by-Step: Demostración de fracciones irreducibles
│   │   ├── Step-by-Step: Factorización en primos
│   │   └── Desafíos: Aplicar PBO a problemas
│   └── 1.4 Para qué sirve (Terminación de Algoritmos)
│       └── Artículo: Cómo el PBO prueba que los algoritmos terminan
│
├── Módulo 2: Inducción Completa (PIC)
│   ├── 2.1 Inducción Simple
│   │   ├── Flashcards: Estructura de inducción
│   │   ├── Step-by-Step: Demostración de ∑i = n(n+1)/2
│   │   └── Desafíos: Pruebas por inducción simple
│   ├── 2.2 Inducción Fuerte (PIF)
│   │   ├── Flashcards: Diferencia entre inducción simple y fuerte
│   │   ├── Step-by-Step: Ejemplo con recurrencias
│   │   └── Desafíos: Pruebas por inducción fuerte
│   ├── 2.3 Relaciones de Recurrencia
│   │   ├── Step-by-Step: Resolver recurrencias lineales
│   │   ├── Step-by-Step: Fibonacci y aplicaciones
│   │   └── Desafíos: Modelar problemas con recurrencias
│   └── 2.4 Para qué sirve (Análisis de Complejidad)
│       └── Artículo: Inducción en análisis de algoritmos recursivos
│
├── Módulo 3: Conjuntos y Funciones
│   ├── 3.1 Teoría de Conjuntos Básica
│   │   ├── Flashcards: Operaciones con conjuntos
│   │   ├── Step-by-Step: Conjunto potencia
│   │   └── Desafíos: Problemas de conjuntos
│   ├── 3.2 Funciones (Inyectivas, Sobreyectivas, Biyectivas)
│   │   ├── Flashcards: Tipos de funciones
│   │   ├── Step-by-Step: Verificar propiedades de funciones
│   │   └── Desafíos: Clasificar funciones
│   └── 3.3 Para qué sirve (Estructuras de Datos)
│       └── Artículo: Funciones en programación y bases de datos
│
├── Módulo 4: Numerabilidad
│   ├── 4.1 Cardinalidad Finita e Infinita
│   │   ├── Flashcards: Concepto de cardinalidad
│   │   ├── Step-by-Step: Comparar cardinalidades
│   │   └── Desafíos: Determinar cardinalidades
│   ├── 4.2 Conjuntos Numerables
│   │   ├── Flashcards: Definición de numerable
│   │   ├── Step-by-Step: Demostración de numerabilidad
│   │   └── Desafíos: Probar que conjuntos son numerables
│   └── 4.3 Para qué sirve (Problema de la Parada de Turing)
│       └── Artículo: Numerabilidad y computabilidad
│
├── Módulo 5: Principio del Palomar
│   ├── 5.1 Concepto Fundamental
│   │   ├── Flashcards: Enunciado del principio
│   │   ├── Step-by-Step: Aplicaciones básicas
│   │   └── Desafíos: Problemas del palomar
│   └── 5.2 Para qué sirve (Teoría de Grafos y Combinatoria)
│       └── Artículo: Aplicaciones en ciencias de la computación
│
├── Módulo 6: Relaciones Binarias
│   ├── 6.1 Propiedades de Relaciones
│   │   ├── Flashcards: Reflexiva, simétrica, transitiva
│   │   ├── Step-by-Step: Verificar propiedades
│   │   └── Desafíos: Clasificar relaciones
│   ├── 6.2 Relaciones de Equivalencia
│   │   ├── Flashcards: Definición y ejemplos
│   │   ├── Step-by-Step: Encontrar clases de equivalencia
│   │   └── Desafíos: Trabajar con equivalencias
│   └── 6.3 Para qué sirve (Criptografía Diffie-Hellman)
│       └── Artículo: Relaciones de equivalencia en protocolos criptográficos
│
├── Módulo 7: Conteo e Inclusión-Exclusión
│   ├── 7.1 Principios Básicos de Conteo
│   │   ├── Flashcards: Regla del producto y suma
│   │   ├── Step-by-Step: Contar configuraciones
│   │   └── Desafíos: Problemas de conteo
│   ├── 7.2 Permutaciones y Combinaciones
│   │   ├── Flashcards: Fórmulas de P(n,k) y C(n,k)
│   │   ├── Step-by-Step: Aplicar fórmulas
│   │   └── Desafíos: Problemas de permutaciones
│   ├── 7.3 Principio de Inclusión-Exclusión
│   │   ├── Flashcards: Fórmula de PIE
│   │   ├── Step-by-Step: Resolver problemas con PIE
│   │   └── Desafíos: Aplicar PIE
│   └── 7.4 Para qué sirve (Análisis Combinatorio en Algoritmos)
│       └── Artículo: Conteo en análisis de complejidad
│
└── Prácticos (1-10)
    ├── Práctico 1: PBO y Pruebas
    ├── Práctico 2: Inducción Completa
    ├── Práctico 3: Conjuntos y Funciones
    ├── Práctico 4: Conteo Parte 1
    ├── Práctico 5: Conteo Parte 2
    ├── Práctico 6: Conteo Parte 3 (PIE)
    ├── Práctico 7: Principio del Palomar
    ├── Práctico 8: Sucesiones y Recurrencias
    ├── Práctico 9: Relaciones Parte 1
    └── Práctico 10: Relaciones Parte 2
```

---

## 2. Modelo de Datos JSON

### 2.1 Estructura General de un Módulo

```json
{
  "id": "module_0_divisibility",
  "title": "Módulo 0: Desde 0 (Divisibilidad y Cimientos)",
  "description": "Aprende los fundamentos de divisibilidad, factorización en primos y fracciones irreducibles.",
  "order": 0,
  "sections": [
    {
      "id": "section_0_1",
      "title": "Criterios de Divisibilidad",
      "description": "Entiende cómo funcionan los criterios de divisibilidad sin dar nada por sabido.",
      "order": 1,
      "content": {
        "theory": "...",
        "para_que_sirve": "...",
        "exercises": []
      }
    }
  ]
}
```

### 2.2 Módulo 0: Divisibilidad y Cimientos (Completo)

```json
{
  "id": "module_0_divisibility",
  "title": "Módulo 0: Desde 0 (Divisibilidad y Cimientos)",
  "description": "Aprende los fundamentos de divisibilidad, factorización en primos y fracciones irreducibles. Comenzamos desde cero, explicando cada concepto paso a paso.",
  "order": 0,
  "difficulty": "beginner",
  "estimatedHours": 8,
  "sections": [
    {
      "id": "section_0_1",
      "title": "Criterios de Divisibilidad",
      "description": "Entender qué significa que un número sea divisible por otro y cómo verificarlo.",
      "order": 1,
      "content": {
        "theory": {
          "definition": "Un número entero $a$ es divisible por un número entero $b \\neq 0$ si existe un número entero $k$ tal que $a = b \\cdot k$. Escribimos $b \\mid a$ (se lee '$b$ divide a $a$').",
          "examples": [
            {
              "text": "12 es divisible por 3 porque $12 = 3 \\cdot 4$. Escribimos $3 \\mid 12$.",
              "latex": "3 \\mid 12"
            },
            {
              "text": "15 no es divisible por 4 porque no existe un entero $k$ tal que $15 = 4k$. Escribimos $4 \\nmid 15$.",
              "latex": "4 \\nmid 15"
            }
          ],
          "criterios": [
            {
              "divisor": 2,
              "criterion": "Un número es divisible por 2 si su último dígito es par (0, 2, 4, 6, 8).",
              "example": "246 es divisible por 2 porque termina en 6.",
              "explanation": "Cualquier número se puede escribir como $10a + b$ donde $b$ es el último dígito. Como $10a = 2 \\cdot 5a$, el número es divisible por 2 si y solo si $b$ es divisible por 2."
            },
            {
              "divisor": 3,
              "criterion": "Un número es divisible por 3 si la suma de sus dígitos es divisible por 3.",
              "example": "123 es divisible por 3 porque $1+2+3=6$ y 6 es divisible por 3.",
              "explanation": "Un número $\\overline{d_n d_{n-1} \\ldots d_1 d_0}$ se puede escribir como $\\sum_{i=0}^{n} d_i \\cdot 10^i$. Como $10 \\equiv 1 \\pmod{3}$, tenemos $10^i \\equiv 1 \\pmod{3}$, por lo que el número es congruente a $\\sum d_i \\pmod{3}$."
            },
            {
              "divisor": 5,
              "criterion": "Un número es divisible por 5 si su último dígito es 0 o 5.",
              "example": "125 es divisible por 5 porque termina en 5.",
              "explanation": "Similar al criterio de 2: $10a + b$ es divisible por 5 si y solo si $b$ es divisible por 5."
            }
          ]
        },
        "para_que_sirve": {
          "title": "¿Para qué sirve esto?",
          "applications": [
            {
              "area": "Criptografía",
              "description": "En algoritmos de encriptación como RSA, necesitamos verificar si números son divisibles por ciertos valores primos para generar claves criptográficas seguras.",
              "example": "Para generar claves RSA, verificamos la divisibilidad de números enormes para encontrar factores primos."
            },
            {
              "area": "Algoritmos de Búsqueda",
              "description": "En hash tables y funciones de hash, usamos divisibilidad para distribuir elementos uniformemente.",
              "example": "Un hash function típica es $h(x) = x \\bmod m$, que usa divisibilidad para mapear valores a posiciones."
            },
            {
              "area": "Detección de Errores",
              "description": "Los códigos de barras y números de tarjeta de crédito usan criterios de divisibilidad para detectar errores de tipeo.",
              "example": "El algoritmo de Luhn verifica que el número de tarjeta sea divisible por 10 después de aplicar transformaciones."
            }
          ]
        },
        "exercises": [
          {
            "id": "exercise_0_1_1",
            "type": "flashcard",
            "question": "¿Qué significa que $a$ sea divisible por $b$?",
            "answer": "Significa que existe un entero $k$ tal que $a = b \\cdot k$. Escribimos $b \\mid a$.",
            "difficulty": "easy"
          },
          {
            "id": "exercise_0_1_2",
            "type": "flashcard",
            "question": "¿Cuál es el criterio de divisibilidad por 3?",
            "answer": "Un número es divisible por 3 si la suma de sus dígitos es divisible por 3.",
            "difficulty": "easy"
          },
          {
            "id": "exercise_0_1_3",
            "type": "step_by_step",
            "title": "Verificar si 456 es divisible por 3",
            "steps": [
              {
                "instruction": "Suma los dígitos del número 456.",
                "hint": "Suma: 4 + 5 + 6",
                "answer": "15"
              },
              {
                "instruction": "Verifica si 15 es divisible por 3.",
                "hint": "¿15 = 3k para algún entero k?",
                "answer": "Sí, porque 15 = 3 × 5"
              },
              {
                "instruction": "Conclusión: ¿Es 456 divisible por 3?",
                "hint": "Usa el criterio de divisibilidad por 3.",
                "answer": "Sí, 456 es divisible por 3 porque la suma de sus dígitos (15) es divisible por 3."
              }
            ],
            "difficulty": "easy"
          },
          {
            "id": "exercise_0_1_4",
            "type": "challenge",
            "title": "Problema de Divisibilidad",
            "problem": "¿Cuál de los siguientes números es divisible por 2, 3 y 5 simultáneamente?",
            "options": [
              { "value": "120", "correct": true, "explanation": "120 es divisible por 2 (termina en 0), por 3 (1+2+0=3), y por 5 (termina en 0)." },
              { "value": "125", "correct": false, "explanation": "125 no es divisible por 2 (termina en 5, que es impar) ni por 3 (1+2+5=8)." },
              { "value": "150", "correct": true, "explanation": "150 es divisible por 2 (termina en 0), por 3 (1+5+0=6), y por 5 (termina en 0)." },
              { "value": "105", "correct": false, "explanation": "105 no es divisible por 2 (termina en 5, que es impar)." }
            ],
            "difficulty": "medium"
          }
        ]
      }
    },
    {
      "id": "section_0_2",
      "title": "Factorización en Primos",
      "description": "Todo número entero mayor que 1 puede expresarse de forma única como producto de números primos.",
      "order": 2,
      "content": {
        "theory": {
          "definition": "Un número primo es un número entero mayor que 1 que tiene exactamente dos divisores positivos: 1 y él mismo.",
          "fundamental_theorem": "**Teorema Fundamental de la Aritmética**: Todo entero mayor que 1 se puede expresar de forma única (salvo el orden) como producto de números primos.",
          "examples": [
            {
              "text": "12 = 2² × 3",
              "latex": "12 = 2^2 \\times 3"
            },
            {
              "text": "60 = 2² × 3 × 5",
              "latex": "60 = 2^2 \\times 3 \\times 5"
            },
            {
              "text": "17 es primo (solo divisible por 1 y 17)",
              "latex": "17 \\text{ es primo}"
            }
          ],
          "algorithm": {
            "title": "Algoritmo de Factorización por Prueba de Divisibilidad",
            "steps": [
              "Comienza con el número $n$ a factorizar.",
              "Divide $n$ por el menor primo $p$ que lo divide.",
              "Reemplaza $n$ con $n/p$.",
              "Repite hasta que $n = 1$.",
              "El producto de todos los primos usados es la factorización."
            ]
          }
        },
        "para_que_sirve": {
          "title": "¿Para qué sirve esto?",
          "applications": [
            {
              "area": "Criptografía RSA",
              "description": "La seguridad de RSA depende de que es fácil multiplicar dos números primos grandes, pero muy difícil factorizar su producto.",
              "example": "Si $n = p \\times q$ donde $p$ y $q$ son primos de 1024 bits, factorizar $n$ es computacionalmente infactible con tecnología actual."
            },
            {
              "area": "Máximo Común Divisor (MCD)",
              "description": "La factorización en primos permite calcular el MCD de dos números de forma eficiente.",
              "example": "$\\gcd(12, 18) = 2 \\times 3 = 6$ (factores comunes con menor exponente)"
            },
            {
              "area": "Algoritmos de Optimización",
              "description": "En problemas de programación dinámica, factorizar números ayuda a identificar patrones y subestructuras óptimas.",
              "example": "En problemas de partición de números, la factorización revela divisores que pueden optimizar la solución."
            }
          ]
        },
        "exercises": [
          {
            "id": "exercise_0_2_1",
            "type": "flashcard",
            "question": "¿Qué es un número primo?",
            "answer": "Un número entero mayor que 1 que tiene exactamente dos divisores positivos: 1 y él mismo.",
            "difficulty": "easy"
          },
          {
            "id": "exercise_0_2_2",
            "type": "step_by_step",
            "title": "Factorizar 60",
            "steps": [
              {
                "instruction": "¿Cuál es el menor primo que divide a 60?",
                "hint": "Verifica: ¿60 es divisible por 2?",
                "answer": "2, porque 60 = 2 × 30"
              },
              {
                "instruction": "Ahora factoriza 30.",
                "hint": "¿30 es divisible por 2?",
                "answer": "30 = 2 × 15"
              },
              {
                "instruction": "Ahora factoriza 15.",
                "hint": "¿15 es divisible por 2? ¿Por 3?",
                "answer": "15 = 3 × 5"
              },
              {
                "instruction": "5 es primo. Escribe la factorización completa de 60.",
                "hint": "Multiplica todos los factores: 2 × 2 × 3 × 5",
                "answer": "$60 = 2^2 \\times 3 \\times 5$"
              }
            ],
            "difficulty": "medium"
          },
          {
            "id": "exercise_0_2_3",
            "type": "challenge",
            "title": "Factorización de 84",
            "problem": "Factoriza 84 en números primos.",
            "userInput": true,
            "expectedAnswer": "2^2 * 3 * 7",
            "difficulty": "medium"
          }
        ]
      }
    },
    {
      "id": "section_0_3",
      "title": "Fracciones Irreducibles",
      "description": "Toda fracción puede simplificarse a su forma irreducible.",
      "order": 3,
      "content": {
        "theory": {
          "definition": "Una fracción $\\frac{m}{n}$ está en forma irreducible si $\\gcd(m, n) = 1$, es decir, si $m$ y $n$ no tienen factores primos comunes.",
          "theorem": "**Teorema**: Para cualquier par de enteros positivos $m$ y $n$, la fracción $\\frac{m}{n}$ puede escribirse de forma irreducible como $\\frac{m'}{n'}$ donde $\\gcd(m', n') = 1$.",
          "algorithm": {
            "title": "Algoritmo de Euclides para encontrar MCD",
            "description": "El Algoritmo de Euclides es un método eficiente para encontrar el máximo común divisor de dos números.",
            "steps": [
              "Dados $a$ y $b$ con $a \\geq b$, calcula $r = a \\bmod b$.",
              "Si $r = 0$, entonces $\\gcd(a, b) = b$.",
              "Si $r \\neq 0$, reemplaza $(a, b)$ con $(b, r)$ y repite."
            ]
          }
        },
        "para_que_sirve": {
          "title": "¿Para qué sirve esto?",
          "applications": [
            {
              "area": "Simplificación de Expresiones",
              "description": "En álgebra y cálculo, simplificar fracciones es fundamental para resolver ecuaciones.",
              "example": "$\\frac{12}{18} = \\frac{2}{3}$ (forma irreducible)"
            },
            {
              "area": "Operaciones con Fracciones",
              "description": "Para sumar o restar fracciones, necesitamos encontrar el mínimo común múltiplo (MCM), que se calcula usando factorización en primos.",
              "example": "$\\frac{1}{6} + \\frac{1}{4} = \\frac{2}{12} + \\frac{3}{12} = \\frac{5}{12}$"
            }
          ]
        },
        "exercises": [
          {
            "id": "exercise_0_3_1",
            "type": "flashcard",
            "question": "¿Cuándo está una fracción en forma irreducible?",
            "answer": "Cuando el numerador y denominador no tienen factores primos comunes, es decir, cuando $\\gcd(m, n) = 1$.",
            "difficulty": "easy"
          },
          {
            "id": "exercise_0_3_2",
            "type": "step_by_step",
            "title": "Simplificar 24/36",
            "steps": [
              {
                "instruction": "Factoriza 24 en primos.",
                "hint": "24 = 2³ × 3",
                "answer": "$24 = 2^3 \\times 3$"
              },
              {
                "instruction": "Factoriza 36 en primos.",
                "hint": "36 = 2² × 3²",
                "answer": "$36 = 2^2 \\times 3^2$"
              },
              {
                "instruction": "Identifica los factores comunes.",
                "hint": "¿Qué factores aparecen en ambas factorizaciones?",
                "answer": "$2^2 \\times 3 = 12$ (factores comunes con menor exponente)"
              },
              {
                "instruction": "Divide numerador y denominador por el MCD.",
                "hint": "$\\frac{24}{36} = \\frac{24/12}{36/12}$",
                "answer": "$\\frac{24}{36} = \\frac{2}{3}$"
              }
            ],
            "difficulty": "medium"
          }
        ]
      }
    }
  ]
}
```

### 2.3 Módulo 1: Principio del Buen Orden (Estructura)

```json
{
  "id": "module_1_pbo",
  "title": "Módulo 1: Principio del Buen Orden (PBO)",
  "description": "Aprende uno de los principios fundamentales de la matemática discreta: el Principio del Buen Orden y sus aplicaciones en pruebas matemáticas.",
  "order": 1,
  "difficulty": "intermediate",
  "estimatedHours": 10,
  "sections": [
    {
      "id": "section_1_1",
      "title": "Concepto Fundamental del PBO",
      "order": 1,
      "content": {
        "theory": {
          "definition": "**Principio del Buen Orden (PBO)**: Todo conjunto no vacío de enteros no negativos tiene un elemento mínimo.",
          "mathematical_notation": "Si $C \\subset \\mathbb{N}$ y $C \\neq \\emptyset$, entonces $\\exists c_0 = \\min C$ tal que $c_0 \\leq c$ para todo $c \\in C$.",
          "why_it_matters": "Aunque parece obvio, el PBO es uno de los axiomas fundamentales de la matemática discreta y proporciona una herramienta poderosa para demostrar propiedades de números enteros.",
          "restrictions": [
            "Requiere que el conjunto NO sea vacío.",
            "Requiere que sean enteros NO NEGATIVOS.",
            "No funciona para enteros negativos.",
            "No funciona para algunos conjuntos de racionales no negativos."
          ]
        },
        "para_que_sirve": {
          "title": "¿Para qué sirve el PBO?",
          "applications": [
            {
              "area": "Pruebas por Contradicción",
              "description": "El PBO es la base para pruebas por absurdo en matemática discreta. Permite demostrar que una propiedad es verdadera para todos los números naturales.",
              "example": "Para probar que $P(n)$ es verdadera para todo $n \\in \\mathbb{N}$, asumimos que existe un contraejemplo y usamos el PBO para encontrar el mínimo contraejemplo, luego derivamos una contradicción."
            },
            {
              "area": "Terminación de Algoritmos",
              "description": "En ciencias de la computación, el PBO se usa para probar que un algoritmo termina. Se asigna un valor a cada paso del algoritmo, y si estos valores decrecen en un conjunto bien ordenado, el algoritmo debe terminar.",
              "example": "En el algoritmo de Euclides para calcular $\\gcd(a, b)$, los residuos forman una sucesión decreciente de enteros no negativos, por lo que el algoritmo debe terminar."
            },
            {
              "area": "Análisis de Complejidad",
              "description": "El PBO ayuda a demostrar propiedades sobre la complejidad de algoritmos recursivos.",
              "example": "Probar que la búsqueda binaria tiene complejidad $O(\\log n)$ usando el PBO sobre el tamaño del array."
            }
          ]
        },
        "exercises": [
          {
            "id": "exercise_1_1_1",
            "type": "flashcard",
            "question": "¿Cuál es el Principio del Buen Orden?",
            "answer": "Todo conjunto no vacío de enteros no negativos tiene un elemento mínimo.",
            "difficulty": "easy"
          },
          {
            "id": "exercise_1_1_2",
            "type": "flashcard",
            "question": "¿Por qué el PBO no funciona para enteros negativos?",
            "answer": "Porque el conjunto de enteros negativos no tiene un elemento mínimo (siempre hay un número más pequeño).",
            "difficulty": "medium"
          }
        ]
      }
    },
    {
      "id": "section_1_2",
      "title": "Pruebas por Absurdo con el PBO",
      "order": 2,
      "content": {
        "theory": {
          "definition": "Una **prueba por absurdo** (o por contradicción) consiste en asumir que la tesis es falsa y derivar una contradicción lógica.",
          "template": {
            "title": "Plantilla para Pruebas con el PBO",
            "steps": [
              "Definir el conjunto $C$ de contraejemplos: $C := \\{n \\in \\mathbb{N} \\mid \\neg P(n)\\}$",
              "Asumir, para probar por contradicción, que $C \\neq \\emptyset$.",
              "Por el PBO, $C$ tiene un elemento mínimo $n_0$.",
              "Llegar a una contradicción (mostrando que $P(n_0)$ es verdadera o que existe un contraejemplo más pequeño).",
              "Concluir que $C = \\emptyset$, es decir, que $P(n)$ es verdadera para todo $n$."
            ]
          }
        },
        "para_que_sirve": {
          "title": "¿Para qué sirve?",
          "applications": [
            {
              "area": "Demostraciones Rigurosas",
              "description": "Las pruebas por absurdo son una herramienta fundamental en matemática para demostrar teoremas de forma rigurosa.",
              "example": "Demostrar que $\\sqrt{2}$ es irracional usando prueba por absurdo."
            }
          ]
        },
        "exercises": [
          {
            "id": "exercise_1_2_1",
            "type": "step_by_step",
            "title": "Demostración: 2n+7 es impar para todo n ∈ ℕ",
            "steps": [
              {
                "instruction": "Define el conjunto de contraejemplos C.",
                "hint": "$C = \\{n \\in \\mathbb{N} \\mid 2n+7 \\text{ es par}\\}$",
                "answer": "$C = \\{n \\in \\mathbb{N} \\mid 2n+7 \\text{ es par}\\}$"
              },
              {
                "instruction": "Asume que C no es vacío. Por el PBO, C tiene un elemento mínimo $c_0$. ¿Cuál es el menor valor posible de $c_0$?",
                "hint": "Verifica: ¿2(0)+7 = 7 es par o impar?",
                "answer": "$c_0 \\geq 1$ porque $2(0)+7 = 7$ es impar, así que $0 \\notin C$."
              },
              {
                "instruction": "Como $c_0$ es el mínimo de C, $c_0-1 \\notin C$. ¿Qué significa esto?",
                "hint": "Si $c_0-1 \\notin C$, entonces $2(c_0-1)+7$ es...",
                "answer": "$2(c_0-1)+7$ es impar."
              },
              {
                "instruction": "Si $2(c_0-1)+7$ es impar, ¿qué es $2(c_0-1)+7+2 = 2c_0+7$?",
                "hint": "impar + par = ?",
                "answer": "impar + 2 = impar, así que $2c_0+7$ es impar."
              },
              {
                "instruction": "Pero esto significa que $c_0 \\notin C$. ¿Cuál es la contradicción?",
                "hint": "Asumimos que $c_0 \\in C$...",
                "answer": "Contradicción: asumimos que $c_0 \\in C$, pero probamos que $c_0 \\notin C$."
              },
              {
                "instruction": "Conclusión: ¿Qué podemos concluir?",
                "hint": "La contradicción vino de asumir que C no es vacío...",
                "answer": "$C = \\emptyset$, por lo que $2n+7$ es impar para todo $n \\in \\mathbb{N}$."
              }
            ],
            "difficulty": "hard"
          }
        ]
      }
    }
  ]
}
```

---

## 3. Componentes React Recomendados

### 3.1 Componentes Principales

```typescript
// 1. FlashcardComponent
// Props: question, answer, difficulty, onNext, onPrevious
// Muestra una tarjeta interactiva con pregunta y respuesta

// 2. StepByStepComponent
// Props: steps, onComplete, onStepChange
// Guía al usuario a través de pasos de una demostración

// 3. ChallengeComponent
// Props: problem, options, expectedAnswer, onSubmit
// Presenta un problema para que el usuario lo resuelva

// 4. MathRenderer
// Props: latex, inline
// Renderiza fórmulas LaTeX usando KaTeX

// 5. ModuleCard
// Props: module, onClick, progress
// Tarjeta que representa un módulo en el dashboard

// 6. ProgressTracker
// Props: moduleId, sectionId, completedExercises
// Muestra el progreso del usuario en un módulo

// 7. InteractiveProof
// Props: theorem, steps, onStepValidate
// Componente para validar demostraciones paso a paso

// 8. CodeEditor (opcional)
// Props: language, initialCode, onSubmit
// Editor de código para ejercicios de programación
```

### 3.2 Estructura de Carpetas

```
client/src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── Flashcard.tsx
│   ├── StepByStep.tsx
│   ├── Challenge.tsx
│   ├── MathRenderer.tsx
│   ├── ModuleCard.tsx
│   ├── ProgressTracker.tsx
│   ├── InteractiveProof.tsx
│   └── Navigation.tsx
├── pages/
│   ├── Home.tsx              # Dashboard
│   ├── Module.tsx            # Página de módulo
│   ├── Section.tsx           # Página de sección
│   ├── Exercise.tsx          # Página de ejercicio
│   └── Practice.tsx          # Página de prácticos
├── contexts/
│   ├── ProgressContext.tsx   # Contexto para rastrear progreso
│   └── ThemeContext.tsx
├── hooks/
│   ├── useProgress.ts        # Hook para progreso del usuario
│   ├── useMathRenderer.ts    # Hook para renderizar LaTeX
│   └── useExerciseValidation.ts
├── lib/
│   ├── courseData.ts         # Datos de los módulos (JSON)
│   ├── mathUtils.ts          # Utilidades para matemática
│   └── exerciseValidator.ts  # Validación de respuestas
├── data/
│   ├── modules/
│   │   ├── module_0.json
│   │   ├── module_1.json
│   │   └── ...
│   └── practices/
│       ├── practice_1.json
│       └── ...
├── App.tsx
├── main.tsx
└── index.css
```

---

## 4. Estrategia de Integración de KaTeX

```typescript
// En index.html, agregar:
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css">

// En MathRenderer.tsx:
import katex from 'katex';

export function MathRenderer({ latex, inline = false }) {
  const html = katex.renderToString(latex, { throwOnError: false });
  return (
    <span 
      className={inline ? "inline-math" : "block-math"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

---

## 5. Flujo de Datos

```
User Navigation
    ↓
Module Selection
    ↓
Load Module JSON from data/modules/
    ↓
Render Sections & Exercises
    ↓
User Completes Exercise
    ↓
Validate Answer (exerciseValidator.ts)
    ↓
Update Progress (ProgressContext)
    ↓
Save to localStorage
    ↓
Display Feedback & Next Steps
```

---

## 6. Próximos Pasos de Implementación

1. **Crear estructura de carpetas y archivos base**
2. **Implementar MathRenderer con KaTeX**
3. **Crear componentes de ejercicios (Flashcard, StepByStep, Challenge)**
4. **Cargar datos de módulos desde JSON**
5. **Implementar sistema de progreso y persistencia**
6. **Diseñar UI/UX con Tailwind y shadcn/ui**
7. **Agregar navegación entre módulos**
8. **Implementar validación de respuestas**
9. **Agregar estadísticas y dashboard**
10. **Pulir y optimizar rendimiento**
