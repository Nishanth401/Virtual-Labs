import { useState, useEffect } from 'react'
import { ListType, ListNode, LinkedList, ListOperation, AnimationState } from '@/components/visualizer/linked-list/types'

let nodeIdCounter = 1

const createNode = (value: number): ListNode => ({
  id: `node-${nodeIdCounter++}`,
  value: value.toString(),
  next: null,
  prev: null,
})

export function buildInitialList(type: ListType, initialValues: number[] = [10, 20, 30, 40]): LinkedList {
  const nodes = new Map<string, ListNode>()
  if (initialValues.length === 0) {
    return { type, head: null, tail: null, nodes }
  }

  const ids = initialValues.map((val) => {
    const node: ListNode = {
      id: `node-${nodeIdCounter++}`,
      value: val.toString(),
      next: null,
      prev: null,
    }
    nodes.set(node.id, node)
    return node.id
  })

  for (let i = 0; i < ids.length; i++) {
    const curr = nodes.get(ids[i])!
    if (i < ids.length - 1) {
      curr.next = ids[i + 1]
    }
    if ((type === 'DLL' || type === 'CDLL') && i > 0) {
      curr.prev = ids[i - 1]
    }
  }

  const headId = ids[0]
  const tailId = ids[ids.length - 1]

  if (type === 'CSLL' || type === 'CDLL') {
    nodes.get(tailId)!.next = headId
    if (type === 'CDLL') {
      nodes.get(headId)!.prev = tailId
    }
  }

  return {
    type,
    head: headId,
    tail: tailId,
    nodes,
  }
}

export function useLinkedList(type: ListType) {
  const [list, setList] = useState<LinkedList>(() => buildInitialList(type, [10, 20, 30, 40]))
  const [operations, setOperations] = useState<ListOperation[]>([])
  const [animationState, setAnimationState] = useState<AnimationState>({
    highlightedNodes: [],
    message: 'Linked List ready. Use controls to manipulate nodes.',
  })
  const [isAnimating, setIsAnimating] = useState(false)

  // Re-initialize if list type changes
  useEffect(() => {
    setList(buildInitialList(type, [10, 20, 30, 40]))
    setAnimationState({
      highlightedNodes: [],
      message: `Switched to ${type} mode. Loaded initial sample nodes.`,
    })
  }, [type])

  const addOperation = (operation: Omit<ListOperation, 'timestamp'>) => {
    setOperations(prev => [...prev, { ...operation, timestamp: Date.now() }])
  }

  const setHighlight = (nodeIds: string[], message: string) => {
    setAnimationState({ highlightedNodes: nodeIds, message })
  }

  const loadSample = () => {
    if (isAnimating) return
    const sample = buildInitialList(type, [10, 20, 30, 40])
    setList(sample)
    addOperation({ type: 'sample' })
    setHighlight([], 'Loaded default sample nodes [10 → 20 → 30 → 40]')
    setTimeout(() => setHighlight([], ''), 1200)
  }

  const clear = () => {
    if (isAnimating) return
    setList({
      type,
      head: null,
      tail: null,
      nodes: new Map(),
    })
    addOperation({ type: 'clear' })
    setHighlight([], 'List cleared. Currently empty.')
    setTimeout(() => setHighlight([], ''), 1200)
  }

  const insertFront = async (value: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    addOperation({ type: 'insert-front', value })

    const newNode = createNode(value)
    const nodes = new Map(list.nodes)
    nodes.set(newNode.id, newNode)

    if (!list.head) {
      if (type === 'CSLL' || type === 'CDLL') {
        newNode.next = newNode.id
        if (type === 'CDLL') newNode.prev = newNode.id
      }
      setList({ ...list, head: newNode.id, tail: newNode.id, nodes })
      setHighlight([newNode.id], `Created first node (${value}) as HEAD`)
      await new Promise(r => setTimeout(r, 600))
    } else {
      const oldHead = nodes.get(list.head)!
      newNode.next = list.head
      
      if (type === 'DLL' || type === 'CDLL') {
        oldHead.prev = newNode.id
      }
      
      if (type === 'CSLL' || type === 'CDLL') {
        const tail = nodes.get(list.tail!)!
        tail.next = newNode.id
        if (type === 'CDLL') newNode.prev = list.tail
      }

      setList({ ...list, head: newNode.id, nodes })
      setHighlight([newNode.id, list.head], `Inserted new node (${value}) at HEAD, updated pointers`)
      await new Promise(r => setTimeout(r, 700))
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const insertBack = async (value: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    addOperation({ type: 'insert-back', value })

    const newNode = createNode(value)
    const nodes = new Map(list.nodes)
    nodes.set(newNode.id, newNode)

    if (!list.tail) {
      if (type === 'CSLL' || type === 'CDLL') {
        newNode.next = newNode.id
        if (type === 'CDLL') newNode.prev = newNode.id
      }
      setList({ ...list, head: newNode.id, tail: newNode.id, nodes })
      setHighlight([newNode.id], `Created first node (${value}) as HEAD & TAIL`)
      await new Promise(r => setTimeout(r, 600))
    } else {
      const oldTail = nodes.get(list.tail)!
      oldTail.next = newNode.id
      
      if (type === 'DLL' || type === 'CDLL') {
        newNode.prev = list.tail
      }
      
      if (type === 'CSLL' || type === 'CDLL') {
        newNode.next = list.head
      }

      setList({ ...list, tail: newNode.id, nodes })
      setHighlight([list.tail, newNode.id], `Appended new node (${value}) at TAIL`)
      await new Promise(r => setTimeout(r, 700))
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const deleteFront = async () => {
    if (isAnimating || !list.head) return
    setIsAnimating(true)
    addOperation({ type: 'delete-front' })

    const nodes = new Map(list.nodes)
    const oldHead = nodes.get(list.head)!
    
    setHighlight([list.head], `Removing HEAD node (${oldHead.value})...`)
    await new Promise(r => setTimeout(r, 500))

    if (list.head === list.tail) {
      // Last node
      setList({ ...list, head: null, tail: null, nodes: new Map() })
    } else {
      const newHead = oldHead.next!
      const newHeadNode = nodes.get(newHead)!
      
      if (type === 'DLL' || type === 'CDLL') {
        newHeadNode.prev = type === 'CDLL' ? list.tail : null
      }
      
      if (type === 'CSLL' || type === 'CDLL') {
        const tail = nodes.get(list.tail!)!
        tail.next = newHead
      }

      nodes.delete(list.head)
      setList({ ...list, head: newHead, nodes })
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const deleteBack = async () => {
    if (isAnimating || !list.tail) return
    setIsAnimating(true)
    addOperation({ type: 'delete-back' })

    const nodes = new Map(list.nodes)
    const oldTail = nodes.get(list.tail)!
    
    setHighlight([list.tail], `Removing TAIL node (${oldTail?.value})...`)
    await new Promise(r => setTimeout(r, 500))

    if (list.head === list.tail) {
      // Last node
      setList({ ...list, head: null, tail: null, nodes: new Map() })
    } else {
      let newTail: string | null = list.head
      let current: string | null = list.head
      
      while (current !== null) {
        const currentNode = nodes.get(current)
        if (!currentNode) break
        if (currentNode.next === list.tail) {
          newTail = current
          break
        }
        current = currentNode.next
      }

      if (newTail) {
        const newTailNode = nodes.get(newTail)
        if (newTailNode) {
          newTailNode.next = type === 'CSLL' || type === 'CDLL' ? list.head : null
          
          if (type === 'CDLL' && list.head) {
            const headNode = nodes.get(list.head)
            if (headNode) {
              headNode.prev = newTail
            }
          }

          nodes.delete(list.tail)
          setList({ ...list, tail: newTail, nodes })
        }
      }
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const search = async (value: number): Promise<boolean> => {
    if (isAnimating || !list.head) return false
    setIsAnimating(true)
    addOperation({ type: 'search', value })

    let curr: string | null = list.head
    let found = false
    let step = 0
    const visited = new Set<string>()

    while (curr) {
      if (visited.has(curr)) break
      visited.add(curr)
      
      const node = list.nodes.get(curr)
      if (!node) break

      setHighlight([curr], `Step ${step + 1}: Checking Node at address ${curr} (value = ${node.value})...`)
      await new Promise(r => setTimeout(r, 600))

      if (Number(node.value) === value) {
        setHighlight([curr], `Target ${value} found at index ${step}!`)
        found = true
        await new Promise(r => setTimeout(r, 1200))
        break
      }

      if (curr === list.tail) break
      curr = node.next
      step++
    }

    if (!found) {
      setHighlight([], `Target ${value} was not found in the list.`)
      await new Promise(r => setTimeout(r, 1200))
    }

    setHighlight([], '')
    setIsAnimating(false)
    return found
  }

  const reverse = async () => {
    if (isAnimating || !list.head || list.head === list.tail) return
    setIsAnimating(true)
    addOperation({ type: 'reverse' })

    const nodes = new Map(list.nodes)
    let curr: string | null = list.head
    let prev: string | null = null
    let next: string | null = null
    const originalTail = list.tail
    const originalHead = list.head

    while (curr) {
      const currentNode = nodes.get(curr)
      if (!currentNode) break

      next = currentNode.next

      setHighlight([curr], `Reversing pointer of node ${currentNode.value}`)
      await new Promise(r => setTimeout(r, 500))

      // Reverse current node's pointer
      currentNode.next = prev
      
      if (type === 'DLL' || type === 'CDLL') {
        if (prev) {
          const prevNode = nodes.get(prev)
          if (prevNode) {
            prevNode.prev = curr
          }
        }
        currentNode.prev = next
      }

      prev = curr
      if (curr === originalTail) {
        break
      }
      curr = next
    }

    // Update circular links if needed
    if (type === 'CSLL' || type === 'CDLL') {
      if (originalHead && originalTail) {
        const newTailNode = nodes.get(originalHead)
        if (newTailNode) {
          newTailNode.next = originalTail
          if (type === 'CDLL') {
            const newHeadNode = nodes.get(originalTail)
            if (newHeadNode) {
              newHeadNode.prev = originalHead
            }
          }
        }
      }
    }

    setList({
      ...list,
      head: originalTail,
      tail: originalHead,
      nodes,
    })

    setHighlight([], 'List reversal complete!')
    await new Promise(r => setTimeout(r, 800))
    setHighlight([], '')
    setIsAnimating(false)
  }

  return {
    list,
    operations,
    animationState,
    isAnimating,
    insertFront,
    insertBack,
    deleteFront,
    deleteBack,
    reverse,
    search,
    clear,
    loadSample,
  }
}