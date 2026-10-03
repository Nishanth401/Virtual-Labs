import { useState, useCallback } from "react"
import { HeapNode, HeapType } from "@/components/visualizer/heap/types"

let nodeIdCounter = 1
const DEFAULT_HEAP = [90, 75, 80, 45, 60, 55, 70]

export function useHeap() {
  const [heapArray, setHeapArray] = useState<number[]>(DEFAULT_HEAP)
  const [heapType, setHeapType] = useState<HeapType>('max')
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])

  const arrayToTree = (array: number[], index: number = 0): HeapNode | null => {
    if (index >= array.length) return null

    return {
      id: `node-${nodeIdCounter++}`,
      value: array[index],
      left: arrayToTree(array, 2 * index + 1),
      right: arrayToTree(array, 2 * index + 2),
    }
  }

  const [heap, setHeap] = useState<HeapNode | null>(() => arrayToTree(DEFAULT_HEAP))

  const shouldSwap = (parent: number, child: number, type: HeapType): boolean => {
    if (type === 'max') {
      return parent < child
    }
    return parent > child
  }

  const heapifyUp = (array: number[], index: number, type: HeapType) => {
    const parentIndex = Math.floor((index - 1) / 2)
    
    if (parentIndex >= 0 && shouldSwap(array[parentIndex], array[index], type)) {
      [array[parentIndex], array[index]] = [array[index], array[parentIndex]]
      heapifyUp(array, parentIndex, type)
    }
  }

  const heapifyDown = (array: number[], index: number, type: HeapType) => {
    const length = array.length
    let target = index
    const left = 2 * index + 1
    const right = 2 * index + 2

    if (left < length && shouldSwap(array[target], array[left], type)) {
      target = left
    }

    if (right < length && shouldSwap(array[target], array[right], type)) {
      target = right
    }

    if (target !== index) {
      [array[index], array[target]] = [array[target], array[index]]
      heapifyDown(array, target, type)
    }
  }

  const insert = useCallback((value: number) => {
    setHeapArray(prev => {
      const newArray = [...prev, value]
      heapifyUp(newArray, newArray.length - 1, heapType)
      setHeap(arrayToTree(newArray))
      return newArray
    })
  }, [heapType])

  const insertMany = useCallback((values: string) => {
    const nums = values.split(',').map(v => parseInt(v.trim())).filter(n => !isNaN(n))
    if (nums.length === 0) return

    setHeapArray(prev => {
      const newArray = [...prev]
      nums.forEach(value => {
        newArray.push(value)
        heapifyUp(newArray, newArray.length - 1, heapType)
      })
      setHeap(arrayToTree(newArray))
      return newArray
    })
  }, [heapType])

  const toggleHeapType = useCallback(() => {
    const newType: HeapType = heapType === 'max' ? 'min' : 'max'
    setHeapType(newType)
    
    setHeapArray(prev => {
      const newArray = [...prev]
      for (let i = Math.floor(newArray.length / 2); i >= 0; i--) {
        heapifyDown(newArray, i, newType)
      }
      setHeap(arrayToTree(newArray))
      return newArray
    })
  }, [heapType])

  const clear = useCallback(() => {
    setHeap(null)
    setHeapArray([])
    setHighlightedNodes([])
    nodeIdCounter = 0
  }, [])

  return {
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  }
} 