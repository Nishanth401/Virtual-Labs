import { useState } from 'react'
import { Token } from '@/components/visualizer/stack-applications/types'
import { isOperator } from '@/lib/stack-operations'

interface EvaluationStep {
  stack: number[]
  currentToken?: Token
  currentPosition: number
  message: string
  timestamp: number
}

export function usePostfixEvaluation() {
  const [steps, setSteps] = useState<EvaluationStep[]>([])
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const addStep = (
    stack: number[], 
    currentToken: Token | undefined,
    position: number,
    message: string
  ) => {
    setSteps(prev => [...prev, {
      stack: [...stack],
      currentToken,
      currentPosition: position,
      message,
      timestamp: Date.now()
    }])
  }

  const evaluate = async (tokens: Token[]) => {
    setIsEvaluating(true)
    setSteps([])
    setResult(null)

    try {
      const stack: number[] = []

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        await new Promise(resolve => setTimeout(resolve, 800))

        if (token.type === 'operand') {
          const num = Number(token.value)
          stack.push(num)
          addStep(stack, token, i, `Push operand ${token.value} to stack`)
        } else if (token.type === 'operator' && isOperator(token.value)) {
          if (stack.length < 2) {
            addStep(stack, token, i, 'Error: Insufficient operands for operator')
            return
          }

          const b = stack.pop()!
          const a = stack.pop()!
          let result: number

          switch (token.value) {
            case '+': result = a + b; break
            case '-': result = a - b; break
            case '*': result = a * b; break
            case '/':
              if (b === 0) {
                addStep(stack, token, i, 'Error: Division by zero')
                return
              }
              result = Math.trunc(a / b)
              break
            case '^': result = Math.pow(a, b); break
            default:
              addStep(stack, token, i, `Error: Unknown operator ${token.value}`)
              return
          }

          addStep(
            [a, b],
            token,
            i,
            `Pop ${b} and ${a}, compute ${a} ${token.value} ${b} = ${result}`
          )

          stack.push(result)
          addStep(stack, token, i, `Push result ${result} to stack`)
        }
      }

      if (stack.length !== 1) {
        addStep(stack, undefined, tokens.length, 'Error: Malformed postfix expression (leftover operands)')
        return
      }

      setResult(stack[0])
    } finally {
      setIsEvaluating(false)
    }
  }

  return {
    steps,
    isEvaluating,
    result,
    evaluate
  }
} 